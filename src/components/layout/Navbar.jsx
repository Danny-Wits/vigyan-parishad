import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Group,
  TextInput,
  ActionIcon,
  Burger,
  Drawer,
  Stack,
  Text,
  Box,
  Container,
  Menu,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconSearch,
  IconGridDots,
  IconExternalLink,
  IconCalendarEvent,
  IconBook,
  IconAward,
  IconCertificate,
  IconUsers,
} from '@tabler/icons-react';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Events', path: '/events' },
  { label: 'Publications', path: '/publications' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Membership', path: '/membership' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
      close();
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      component="header"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Container size="xl" py={12}>
        <Group justify="space-between" wrap="nowrap" gap="md">
          {/* Logo & Brand text */}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexShrink: 0,
            }}
          >
            <img
              src="/logo.png"
              alt="Vigyan Parishad J&K Logo"
              style={{ height: 46, width: 'auto', objectFit: 'contain' }}
            />
            <Box>
              <Text
                component="div"
                fw={800}
                style={{
                  fontSize: '1.28rem',
                  lineHeight: 1.15,
                  color: '#0B2545',
                  letterSpacing: '-0.02em',
                }}
              >
                Vigyan Parishad{' '}
                <Text
                  component="span"
                  inherit
                  style={{
                    color: '#2563EB',
                    fontWeight: 800,
                  }}
                >
                  J&K
                </Text>
              </Text>
              <Text
                component="div"
                style={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  color: '#475569',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginTop: 2,
                }}
              >
                Science For Society
              </Text>
            </Box>
          </Link>

          {/* Desktop Nav Pills */}
          <Group gap={6} visibleFrom="lg" wrap="nowrap">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={active ? 'nav-pill-active' : 'nav-pill-inactive'}
                  style={{
                    textDecoration: 'none',
                    fontSize: '0.925rem',
                    display: 'inline-block',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </Group>

          {/* Right Section: Search & App Launcher */}
          <Group gap={10} wrap="nowrap">
            <TextInput
              placeholder="Search for news, publications, events..."
              leftSection={<IconSearch size={16} stroke={1.8} color="#64748B" />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.currentTarget.value)}
              onKeyDown={handleSearchSubmit}
              radius="xl"
              visibleFrom="md"
              styles={{
                root: { width: 280 },
                input: {
                  backgroundColor: '#F1F5F9',
                  borderColor: 'transparent',
                  fontSize: '0.85rem',
                  '&:focus': {
                    borderColor: '#2563EB',
                    backgroundColor: '#FFFFFF',
                  },
                },
              }}
            />

            {/* Quick Portals Grid Menu */}
            <Menu shadow="lg" width={280} position="bottom-end" radius="md">
              <Menu.Target>
                <ActionIcon
                  size={42}
                  radius="md"
                  aria-label="Portals & Quick Links"
                  style={{
                    background: 'linear-gradient(135deg, #F04336 0%, #2563EB 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <IconGridDots size={20} stroke={2.2} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown p="xs">
                <Menu.Label fw={700} c="navy.9">
                  PORTALS & QUICK ACCESS
                </Menu.Label>
                <Menu.Item
                  leftSection={<IconCalendarEvent size={16} color="#2563EB" />}
                  component={Link}
                  to="/events"
                >
                  National Science Seminar 2026
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconAward size={16} color="#F04336" />}
                  component={Link}
                  to="/membership"
                >
                  Young Scientist Awards
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconBook size={16} color="#059669" />}
                  component={Link}
                  to="/publications"
                >
                  Research Papers & Bulletins
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconCertificate size={16} color="#D97706" />}
                  component={Link}
                  to="/membership"
                >
                  Join Vigyan Parishad
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  leftSection={<IconExternalLink size={16} />}
                  component="a"
                  href="https://vibhaindia.org"
                  target="_blank"
                  rel="noreferrer"
                >
                  Vijnana Bharati (VIBHA)
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            {/* Mobile Hamburger Burger */}
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="lg"
              size="sm"
              aria-label="Toggle navigation"
            />
          </Group>
        </Group>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="md"
        padding="md"
        title={
          <Group gap={8}>
            <img src="/logo.png" alt="Logo" style={{ height: 32 }} />
            <Text fw={700} c="#0B2545">
              Vigyan Parishad J&K
            </Text>
          </Group>
        }
      >
        <Stack gap="md" mt="sm">
          <TextInput
            placeholder="Search events, publications..."
            leftSection={<IconSearch size={16} />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            onKeyDown={handleSearchSubmit}
            radius="xl"
          />

          <Stack gap={6}>
            {NAV_LINKS.map((item) => {
              const active = isActive(item.path);
              return (
                <UnstyledButton
                  key={item.path}
                  component={Link}
                  to={item.path}
                  onClick={close}
                  className={active ? 'nav-pill-active' : 'nav-pill-inactive'}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '1rem',
                  }}
                >
                  {item.label}
                </UnstyledButton>
              );
            })}
          </Stack>

          <Box mt="md" p="sm" bg="#F8FAFC" style={{ borderRadius: 12 }}>
            <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb={8}>
              State Chapter
            </Text>
            <Text size="sm" c="#0B2545" fw={600}>
              Vigyan Parishad Jammu & Kashmir
            </Text>
            <Text size="xs" c="dimmed">
              Jammu • Srinagar • Leh
            </Text>
          </Box>
        </Stack>
      </Drawer>
    </Box>
  );
}
