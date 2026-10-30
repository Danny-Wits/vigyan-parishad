import React from 'react';
import { Outlet, NavLink as RouterNavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppShell,
  Group,
  Burger,
  Text,
  UnstyledButton,
  Button,
  Box,
  Badge,
  Menu,
  ActionIcon,
  Avatar,
  Stack,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDashboard,
  IconCalendar,
  IconBook,
  IconSpeakerphone,
  IconPhoto,
  IconUsers,
  IconUserCheck,
  IconMail,
  IconLogout,
  IconExternalLink,
  IconShieldLock,
  IconChevronRight,
} from '@tabler/icons-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { notifications } from '@mantine/notifications';

const NAV_ITEMS = [
  { label: 'Overview', path: '/admin', icon: IconDashboard, exact: true },
  { label: 'Events', path: '/admin/events', icon: IconCalendar },
  { label: 'Publications', path: '/admin/publications', icon: IconBook },
  { label: 'Live Ticker', path: '/admin/announcements', icon: IconSpeakerphone },
  { label: 'Gallery & Media', path: '/admin/gallery', icon: IconPhoto },
  { label: 'Council & Members', path: '/admin/members', icon: IconUsers },
  { label: 'Applications', path: '/admin/applications', icon: IconUserCheck },
  { label: 'Contact Messages', path: '/admin/inquiries', icon: IconMail },
];

export function AdminLayout() {
  const [opened, { toggle, close }] = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
    notifications.show({
      title: 'Logged Out',
      message: 'You have been safely signed out of the management portal.',
      color: 'blue',
    });
    navigate('/admin/login');
  };

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      styles={{
        root: {
          backgroundColor: '#F8FAFC',
          minHeight: '100vh',
        },
        main: {
          backgroundColor: '#F8FAFC',
          paddingTop: 80,
          paddingBottom: 60,
        },
      }}
    >
      {/* Top Header */}
      <AppShell.Header
        style={{
          borderBottom: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          zIndex: 100,
        }}
      >
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Box
              component={RouterNavLink}
              to="/admin"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                textDecoration: 'none',
              }}
            >
              <img
                src="/logo.png"
                alt="Logo"
                style={{ height: 38, width: 'auto', objectFit: 'contain' }}
              />
              <Box>
                <Group gap={6} align="center">
                  <Text fw={800} size="sm" c="#0B2545" style={{ lineHeight: 1.2 }}>
                    Vigyan Parishad
                  </Text>
                  <Badge size="xs" variant="gradient" gradient={{ from: 'red', to: 'blue' }}>
                    ADMIN
                  </Badge>
                </Group>
                <Text size="xs" c="#64748B" style={{ lineHeight: 1.2 }}>
                  Management Portal
                </Text>
              </Box>
            </Box>
          </Group>

          <Group gap="md">
            <Button
              component="a"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              variant="subtle"
              color="gray"
              size="xs"
              radius="xl"
              leftSection={<IconExternalLink size={14} />}
              visibleFrom="xs"
            >
              View Live Website
            </Button>

            <Divider orientation="vertical" visibleFrom="xs" />

            <Menu shadow="md" width={220} position="bottom-end">
              <Menu.Target>
                <UnstyledButton
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '4px 8px',
                    borderRadius: 999,
                    backgroundColor: '#F1F5F9',
                  }}
                >
                  <Avatar size={30} radius="xl" color="blue">
                    {user?.email?.charAt(0).toUpperCase() || 'A'}
                  </Avatar>
                  <Box visibleFrom="sm" style={{ textAlign: 'left' }}>
                    <Text size="xs" fw={700} c="#0B2545" lineClamp={1}>
                      {user?.email || 'Manager'}
                    </Text>
                    <Text size="10px" c="#64748B">
                      Administrator
                    </Text>
                  </Box>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Session</Menu.Label>
                <Menu.Item
                  leftSection={<IconShieldLock size={15} color="#2563EB" />}
                  disabled
                >
                  <Text size="xs" fw={600} c="#0B2545" lineClamp={1}>
                    {user?.email}
                  </Text>
                  <Text size="10px" c="#64748B">
                    Active Authenticated Role
                  </Text>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout size={15} />}
                  onClick={handleLogout}
                >
                  Sign Out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      {/* Sidebar Navigation */}
      <AppShell.Navbar
        p="md"
        style={{
          borderRight: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Stack gap={6} style={{ flex: 1 }}>
          <Text size="xs" fw={700} c="#94A3B8" tt="uppercase" px="xs" mb={4}>
            Main Menu
          </Text>

          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <UnstyledButton
                key={item.path}
                component={RouterNavLink}
                to={item.path}
                onClick={close}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 12,
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#2563EB' : '#475569',
                  backgroundColor: active ? '#EFF6FF' : 'transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={18} stroke={active ? 2.5 : 1.8} color={active ? '#2563EB' : '#64748B'} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {active && <IconChevronRight size={14} color="#2563EB" />}
              </UnstyledButton>
            );
          })}
        </Stack>

        {/* Footer in Sidebar */}
        <Box pt="md" style={{ borderTop: '1px solid #E2E8F0' }}>
          <Button
            variant="light"
            color="red"
            fullWidth
            radius="xl"
            size="sm"
            leftSection={<IconLogout size={16} />}
            onClick={handleLogout}
          >
            Sign Out
          </Button>
          <Text size="11px" c="#94A3B8" ta="center" mt="sm">
            VPJK System v1.0.0
          </Text>
        </Box>
      </AppShell.Navbar>

      {/* Main Content Area */}
      <AppShell.Main>
        <Box style={{ maxWidth: 1560, margin: '0 auto', width: '100%' }}>
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
