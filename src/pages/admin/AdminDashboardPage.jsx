import React from 'react';
import { Link } from 'react-router-dom';
import {
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  Stack,
  Button,
  Badge,
  Box,
  ThemeIcon,
  Table,
  Loader,
  Center,
} from '@mantine/core';
import {
  IconCalendar,
  IconBook,
  IconSpeakerphone,
  IconPhoto,
  IconUsers,
  IconUserCheck,
  IconMail,
  IconPlus,
  IconArrowRight,
  IconCheck,
  IconClock,
} from '@tabler/icons-react';
import {
  useAllEvents,
  useAllPublications,
  useAllAnnouncements,
  useAllAlbums,
  useAllMembers,
  useAllApplications,
  useAllInquiries,
} from '../../hooks/useAdminData';

export function AdminDashboardPage() {
  const { data: events = [], isLoading: loadingEvents } = useAllEvents();
  const { data: publications = [], isLoading: loadingPubs } = useAllPublications();
  const { data: announcements = [] } = useAllAnnouncements();
  const { data: albums = [] } = useAllAlbums();
  const { data: members = [] } = useAllMembers();
  const { data: applications = [] } = useAllApplications();
  const { data: inquiries = [] } = useAllInquiries();

  const activeAnnouncements = announcements.filter((a) => a.is_active);
  const pendingApps = applications.filter((a) => a.status === 'pending');
  const unreadInquiries = inquiries.filter((i) => i.status === 'unread');

  const STATS = [
    {
      label: 'Published Events',
      value: events.length,
      icon: IconCalendar,
      color: 'blue',
      link: '/admin/events',
      desc: 'Workshops, Seminars & Talks',
    },
    {
      label: 'Publications',
      value: publications.length,
      icon: IconBook,
      color: 'indigo',
      link: '/admin/publications',
      desc: 'Reports, Papers & Proceedings',
    },
    {
      label: 'Live Ticker Items',
      value: activeAnnouncements.length,
      icon: IconSpeakerphone,
      color: 'orange',
      link: '/admin/announcements',
      desc: `${announcements.length} total alerts`,
    },
    {
      label: 'Photo Albums',
      value: albums.length,
      icon: IconPhoto,
      color: 'cyan',
      link: '/admin/gallery',
      desc: 'Event galleries & media',
    },
    {
      label: 'Active Council Members',
      value: members.length,
      icon: IconUsers,
      color: 'teal',
      link: '/admin/members',
      desc: 'Executive & Academic heads',
    },
    {
      label: 'Pending Applications',
      value: pendingApps.length,
      icon: IconUserCheck,
      color: pendingApps.length > 0 ? 'red' : 'green',
      link: '/admin/applications',
      desc: `${applications.length} total received`,
      highlight: pendingApps.length > 0,
    },
    {
      label: 'Unread Inquiries',
      value: unreadInquiries.length,
      icon: IconMail,
      color: unreadInquiries.length > 0 ? 'red' : 'green',
      link: '/admin/inquiries',
      desc: `${inquiries.length} total messages`,
      highlight: unreadInquiries.length > 0,
    },
  ];

  return (
    <Box>
      {/* Welcome Banner */}
      <Card
        p="xl"
        radius="lg"
        withBorder
        mb="xl"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E2E8F0',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F7FF 100%)',
        }}
      >
        <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
          <Stack gap={4}>
            <Group gap="xs">
              <span className="section-tag-dash">MANAGEMENT DASHBOARD</span>
            </Group>
            <Title order={2} fw={800} c="#0B2545" style={{ fontSize: '1.75rem' }}>
              Welcome to the Vigyan Parishad Portal
            </Title>
            <Text c="#64748B" size="sm" style={{ maxWidth: 650 }}>
              Easily publish events, manage publications, update the live marquee ticker, review membership applications, and answer inquiries with real-time database sync.
            </Text>
          </Stack>

          <Group gap="xs">
            <Button
              component={Link}
              to="/admin/events"
              className="brand-gradient-btn"
              radius="xl"
              size="sm"
              leftSection={<IconPlus size={16} />}
            >
              Post New Event
            </Button>
            <Button
              component={Link}
              to="/admin/publications"
              variant="outline"
              color="blue"
              radius="xl"
              size="sm"
              leftSection={<IconPlus size={16} />}
            >
              Add Publication
            </Button>
          </Group>
        </Group>
      </Card>

      {/* Stats Cards Grid */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" mb="xl">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              p="lg"
              radius="lg"
              withBorder
              className="hover-lift"
              bg="#FFFFFF"
              style={{
                borderColor: stat.highlight ? '#FECACA' : '#E2E8F0',
                backgroundColor: stat.highlight ? '#FEF2F2' : '#FFFFFF',
              }}
            >
              <Group justify="space-between" mb="xs">
                <Text size="xs" fw={700} c="#64748B" tt="uppercase">
                  {stat.label}
                </Text>
                <ThemeIcon size={36} radius="md" color={stat.color} variant="light">
                  <Icon size={20} />
                </ThemeIcon>
              </Group>

              <Group align="flex-end" justify="space-between" mt="sm">
                <Box>
                  <Text fw={800} size="1.8rem" c="#0B2545" style={{ lineHeight: 1 }}>
                    {stat.value}
                  </Text>
                  <Text size="xs" c="#64748B" mt={4}>
                    {stat.desc}
                  </Text>
                </Box>
                <Button
                  component={Link}
                  to={stat.link}
                  variant="subtle"
                  size="compact-xs"
                  color="blue"
                  rightSection={<IconArrowRight size={12} />}
                >
                  Manage
                </Button>
              </Group>
            </Card>
          );
        })}
      </SimpleGrid>

      {/* Recent Events & Inquiries Quick View */}
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
        {/* Recent Events Card */}
        <Card p="lg" radius="lg" withBorder bg="#FFFFFF">
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <ThemeIcon size={32} radius="md" color="blue" variant="light">
                <IconCalendar size={18} />
              </ThemeIcon>
              <Title order={4} fw={700} c="#0B2545">
                Upcoming & Recent Events
              </Title>
            </Group>
            <Button
              component={Link}
              to="/admin/events"
              variant="subtle"
              size="xs"
              rightSection={<IconArrowRight size={14} />}
            >
              All Events
            </Button>
          </Group>

          {loadingEvents ? (
            <Center p="xl">
              <Loader size="sm" />
            </Center>
          ) : events.length === 0 ? (
            <Text size="sm" c="#64748B" p="md">
              No events recorded yet. Click "Post New Event" to add one.
            </Text>
          ) : (
            <Table highlightOnHover verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Category</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {events.slice(0, 4).map((ev) => (
                  <Table.Tr key={ev.id}>
                    <Table.Td>
                      <Text size="sm" fw={600} c="#0B2545" lineClamp={1}>
                        {ev.title}
                      </Text>
                      <Text size="xs" c="#64748B" lineClamp={1}>
                        {ev.venue}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="outline" color="blue" size="sm">
                        {ev.date_display || ev.event_date}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="light" color="cyan" size="sm">
                        {ev.category}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </Card>

        {/* Pending Actions / Inquiries */}
        <Card p="lg" radius="lg" withBorder bg="#FFFFFF">
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <ThemeIcon size={32} radius="md" color="red" variant="light">
                <IconMail size={18} />
              </ThemeIcon>
              <Title order={4} fw={700} c="#0B2545">
                Recent Public Inquiries
              </Title>
            </Group>
            <Button
              component={Link}
              to="/admin/inquiries"
              variant="subtle"
              size="xs"
              rightSection={<IconArrowRight size={14} />}
            >
              View Inquiries
            </Button>
          </Group>

          {inquiries.length === 0 ? (
            <Box p="xl" style={{ textAlign: 'center' }}>
              <ThemeIcon size={40} radius="xl" color="green" variant="light" mx="auto" mb="xs">
                <IconCheck size={20} />
              </ThemeIcon>
              <Text size="sm" fw={600} c="#0B2545">
                Inbox is clean!
              </Text>
              <Text size="xs" c="#64748B">
                No pending inquiries waiting for review.
              </Text>
            </Box>
          ) : (
            <Table highlightOnHover verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Sender</Table.Th>
                  <Table.Th>Subject</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {inquiries.slice(0, 4).map((inq) => (
                  <Table.Tr key={inq.id}>
                    <Table.Td>
                      <Text size="sm" fw={600} c="#0B2545">
                        {inq.full_name}
                      </Text>
                      <Text size="xs" c="#64748B">
                        {inq.email}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" c="#1E293B" lineClamp={1}>
                        {inq.subject}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        size="sm"
                        color={inq.status === 'unread' ? 'red' : 'green'}
                        variant={inq.status === 'unread' ? 'filled' : 'light'}
                      >
                        {inq.status}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </Card>
      </SimpleGrid>
    </Box>
  );
}
