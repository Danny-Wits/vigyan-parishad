import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Stack,
  Group,
  Text,
  Box,
  Divider,
  ActionIcon,
} from '@mantine/core';
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconMapPin,
  IconMail,
  IconPhone,
  IconExternalLink,
} from '@tabler/icons-react';

export function Footer() {
  return (
    <Box
      component="footer"
      style={{
        backgroundColor: '#07182D',
        color: '#E2E8F0',
        marginTop: 'auto',
        borderTop: '3px solid #2563EB',
      }}
    >
      <Container size="xl" pt={48} pb={24}>
        <Grid gutter={40}>
          {/* Col 1: Identity & Mission */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Group gap={12} wrap="nowrap">
                <Box
                  p={4}
                  bg="#FFFFFF"
                  style={{ borderRadius: 10, display: 'inline-flex' }}
                >
                  <img
                    src="/logo.png"
                    alt="Vigyan Parishad J&K Logo"
                    style={{ height: 42, width: 'auto' }}
                  />
                </Box>
                <Box>
                  <Text fw={800} size="lg" c="#FFFFFF">
                    Vigyan Parishad{' '}
                    <Text component="span" c="#60A5FA" inherit>
                      J&K
                    </Text>
                  </Text>
                  <Text
                    size="xs"
                    c="#94A3B8"
                    fw={700}
                    style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
                  >
                    Science For Society
                  </Text>
                </Box>
              </Group>

              <Text size="sm" c="#94A3B8" style={{ lineHeight: 1.6 }}>
                A premier scientific society devoted to nurturing scientific temper,
                indigenous innovations, Himalayan ecological research, and experiential STEM
                learning across Jammu, Kashmir, and Ladakh.
              </Text>

              <Group gap="xs" mt="xs">
                <ActionIcon
                  size="lg"
                  radius="xl"
                  variant="subtle"
                  color="blue"
                  component="a"
                  href="https://twitter.com"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <IconBrandTwitter size={18} />
                </ActionIcon>
                <ActionIcon
                  size="lg"
                  radius="xl"
                  variant="subtle"
                  color="blue"
                  component="a"
                  href="https://facebook.com"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <IconBrandFacebook size={18} />
                </ActionIcon>
                <ActionIcon
                  size="lg"
                  radius="xl"
                  variant="subtle"
                  color="red"
                  component="a"
                  href="https://youtube.com"
                  target="_blank"
                  aria-label="YouTube"
                >
                  <IconBrandYoutube size={18} />
                </ActionIcon>
                <ActionIcon
                  size="lg"
                  radius="xl"
                  variant="subtle"
                  color="blue"
                  component="a"
                  href="https://linkedin.com"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <IconBrandLinkedin size={18} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Col 2: Quick Links */}
          <Grid.Col span={{ base: 6, sm: 6, md: 2 }}>
            <Text fw={700} size="sm" c="#FFFFFF" mb="md" tt="uppercase" style={{ letterSpacing: '0.08em' }}>
              Quick Navigation
            </Text>
            <Stack gap="xs">
              <Text component={Link} to="/" size="sm" c="#94A3B8" style={{ textDecoration: 'none' }}>
                Home
              </Text>
              <Text component={Link} to="/about" size="sm" c="#94A3B8" style={{ textDecoration: 'none' }}>
                About Parishad
              </Text>
              <Text component={Link} to="/events" size="sm" c="#94A3B8" style={{ textDecoration: 'none' }}>
                Conferences & Events
              </Text>
              <Text component={Link} to="/publications" size="sm" c="#94A3B8" style={{ textDecoration: 'none' }}>
                Publications & Papers
              </Text>
              <Text component={Link} to="/gallery" size="sm" c="#94A3B8" style={{ textDecoration: 'none' }}>
                Photo Gallery
              </Text>
              <Text component={Link} to="/membership" size="sm" c="#94A3B8" style={{ textDecoration: 'none' }}>
                Membership Application
              </Text>
              <Text component={Link} to="/contact" size="sm" c="#94A3B8" style={{ textDecoration: 'none' }}>
                Contact & Support
              </Text>
            </Stack>
          </Grid.Col>

          {/* Col 3: Key Initiatives */}
          <Grid.Col span={{ base: 6, sm: 6, md: 3 }}>
            <Text fw={700} size="sm" c="#FFFFFF" mb="md" tt="uppercase" style={{ letterSpacing: '0.08em' }}>
              Key Initiatives
            </Text>
            <Stack gap="xs">
              <Text component={Link} to="/events/national-science-seminar-2026" size="sm" c="#94A3B8" style={{ textDecoration: 'none' }}>
                National Science Seminar 2026
              </Text>
              <Text component={Link} to="/events/ai-for-young-minds" size="sm" c="#94A3B8" style={{ textDecoration: 'none' }}>
                AI for Young Minds
              </Text>
              <Text component={Link} to="/events" size="sm" c="#94A3B8" style={{ textDecoration: 'none' }}>
                Children Science Congress
              </Text>
              <Text component={Link} to="/publications" size="sm" c="#94A3B8" style={{ textDecoration: 'none' }}>
                Himalayan Ecology Studies
              </Text>
              <Text
                component="a"
                href="https://vibhaindia.org"
                target="_blank"
                rel="noreferrer"
                size="sm"
                c="#94A3B8"
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                Vijnana Bharati National <IconExternalLink size={12} />
              </Text>
            </Stack>
          </Grid.Col>

          {/* Col 4: Contact & Secretariat */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Text fw={700} size="sm" c="#FFFFFF" mb="md" tt="uppercase" style={{ letterSpacing: '0.08em' }}>
              Secretariat
            </Text>
            <Stack gap="sm">
              <Group gap="xs" wrap="nowrap" align="flex-start">
                <IconMapPin size={18} color="#60A5FA" style={{ flexShrink: 0, marginTop: 2 }} />
                <Text size="sm" c="#94A3B8">
                  Vigyan Parishad J&K, University of Jammu Campus, Jammu, J&K – 180006
                </Text>
              </Group>

              <Group gap="xs" wrap="nowrap">
                <IconPhone size={18} color="#60A5FA" style={{ flexShrink: 0 }} />
                <Text size="sm" c="#94A3B8">
                  +91 191 243 5678
                </Text>
              </Group>

              <Group gap="xs" wrap="nowrap">
                <IconMail size={18} color="#60A5FA" style={{ flexShrink: 0 }} />
                <Text size="sm" c="#94A3B8">
                  info@vigyanparishadjk.org
                </Text>
              </Group>

              <Box
                p="xs"
                mt="xs"
                style={{
                  borderRadius: 8,
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  border: '1px solid rgba(37, 99, 235, 0.25)',
                }}
              >
                <Text size="xs" c="#BFDBFE">
                  UPI ID for Memberships & Donations:
                </Text>
                <Text size="xs" fw={700} c="#FFFFFF">
                  vigyanparishad@upi
                </Text>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="xl" color="#1E293B" />

        <Group justify="space-between" wrap="wrap" gap="md">
          <Text size="xs" c="#64748B">
            © {new Date().getFullYear()} Vigyan Parishad Jammu & Kashmir. All Rights Reserved.
          </Text>
          <Group gap="md">
            <Text component={Link} to="/about" size="xs" c="#64748B" style={{ textDecoration: 'none' }}>
              Terms of Use
            </Text>
            <Text component={Link} to="/about" size="xs" c="#64748B" style={{ textDecoration: 'none' }}>
              Privacy Policy
            </Text>
            <Text component={Link} to="/contact" size="xs" c="#64748B" style={{ textDecoration: 'none' }}>
              Help Desk
            </Text>
            <Text component={Link} to="/admin" size="xs" c="#3B82F6" fw={600} style={{ textDecoration: 'none' }}>
              Manager Portal
            </Text>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
