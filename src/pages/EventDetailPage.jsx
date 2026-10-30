import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Title,
  Text,
  Grid,
  Card,
  Image,
  Group,
  Stack,
  Button,
  ThemeIcon,
  Modal,
  TextInput,
  Select,
  SimpleGrid,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCalendar,
  IconClock,
  IconMapPin,
  IconUsers,
  IconSearch,
  IconBulb,
  IconSchool,
  IconArrowRight,
  IconCheck,
  IconShare,
  IconBuildingArch,
} from '@tabler/icons-react';
import { BreadcrumbsNav } from '../components/common/BreadcrumbsNav';
import { useEventDetail } from '../hooks/useEvents';

export function EventDetailPage() {
  const { slug } = useParams();
  const { data: event, isLoading } = useEventDetail(slug);
  const [opened, { open, close }] = useDisclosure(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    participantType: 'Student',
  });

  if (!event && !isLoading) {
    return (
      <Container size="xl" py={60} style={{ textAlign: 'center' }}>
        <Title order={2} c="#0B2545">Event Not Found</Title>
        <Text size="sm" c="#64748B" mt="sm">The event you are looking for does not exist or has been moved.</Text>
        <Button component={Link} to="/events" mt="md" radius="xl" className="brand-gradient-btn">
          Back to Events
        </Button>
      </Container>
    );
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      notifications.show({
        title: 'Missing information',
        message: 'Please provide at least your full name and email.',
        color: 'red',
      });
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      close();
      notifications.show({
        title: 'Registration Confirmed!',
        message: `Thank you ${formData.name}. Your registration pass has been confirmed for ${event?.title || 'this event'}. Check your email.`,
        color: 'teal',
        icon: <IconCheck size={18} />,
        autoClose: 5000,
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        institution: '',
        participantType: 'Student',
      });
    }, 600);
  };

  return (
    <Box>
      <Container size="xl" pt="xs" pb="sm">
        <BreadcrumbsNav
          items={[
            { title: 'Events', href: '/events' },
            { title: event?.title || 'Event Detail' },
          ]}
        />
      </Container>

      {/* Hero Banner with Dark Presentation & Audience Image matching right mockup */}
      <Container size="xl" mb={24}>
        <Box
          style={{
            position: 'relative',
            borderRadius: 24,
            overflow: 'hidden',
            minHeight: 380,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#07182D',
          }}
        >
          {/* Background image overlay */}
          <Box
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${event?.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.38,
            }}
          />

          <Box
            p={{ base: 'xl', md: 48 }}
            style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}
          >
            {/* Floating Date Badge */}
            <Box
              style={{
                display: 'inline-block',
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                padding: '6px 14px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                textAlign: 'center',
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              <Text fw={800} size="md" c="#0B2545">
                {event?.day_month ? event.day_month.split(' ')[0] : '22'}
              </Text>
              <Text fw={700} size="xs" c="#2563EB" tt="uppercase">
                {event?.day_month ? event.day_month.split(' ')[1] : 'NOV'}
              </Text>
              <Text size="10px" c="#64748B">
                {event?.year || '2026'}
              </Text>
            </Box>

            <Box mb={6}>
              <Text
                size="xs"
                fw={700}
                c="#FCA5A5"
                tt="uppercase"
                style={{ letterSpacing: '0.12em' }}
              >
                — {event?.category || 'SEMINAR'}
              </Text>
            </Box>

            <Title
              order={1}
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: 12,
              }}
            >
              {event?.title}
            </Title>

            <Text size="lg" c="#E2E8F0" style={{ maxWidth: 640, lineHeight: 1.5 }}>
              {event?.subtitle || event?.description}
            </Text>
          </Box>
        </Box>
      </Container>

      {/* Info Ribbon Bar */}
      <Container size="xl" mb={40}>
        <Box
          p="md"
          bg="#FFFFFF"
          style={{
            borderRadius: 20,
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          }}
        >
          <Group justify="space-between" align="center" wrap="wrap" gap="md">
            <Group gap="xl" wrap="wrap">
              <Group gap={8}>
                <IconCalendar size={20} color="#2563EB" />
                <Text size="sm" fw={600} c="#0B2545">
                  {event?.date_display || '22 November 2026'}
                </Text>
              </Group>

              <Group gap={8}>
                <IconClock size={20} color="#2563EB" />
                <Text size="sm" fw={600} c="#0B2545">
                  {event?.time || '10:00 AM - 5:00 PM'}
                </Text>
              </Group>

              <Group gap={8}>
                <IconMapPin size={20} color="#EF4444" />
                <Text size="sm" fw={600} c="#0B2545">
                  {event?.venue || 'University of Jammu, J&K'}
                </Text>
              </Group>
            </Group>

            <Button
              className="brand-gradient-btn"
              size="md"
              radius="xl"
              rightSection={<IconArrowRight size={16} stroke={2.5} />}
              onClick={open}
            >
              Register Now
            </Button>
          </Group>
        </Box>
      </Container>

      {/* Main Content & Sidebar */}
      <Container size="xl" mb={60}>
        <Grid gutter={36}>
          {/* Left Column: About & Key Highlights */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap={36}>
              {/* About the Event */}
              <Box>
                <span className="section-tag-dash">About the Event</span>
                <Text size="md" c="#334155" mt="md" style={{ lineHeight: 1.7 }}>
                  {event?.description}
                </Text>
                <Text size="sm" c="#64748B" mt="sm" style={{ lineHeight: 1.6 }}>
                  Distinguished luminaries, scientific innovators, researchers from regional universities
                  (University of Jammu, University of Kashmir, SKUAST, NIT Srinagar, CSIR-IIIM, IIT Jammu)
                  gather to deliberate on contemporary advancements in mountain ecology, renewable green
                  energies, computer science and educational frameworks.
                </Text>
              </Box>

              {/* Key Highlights (4 cards in a row) */}
              <Box>
                <span className="section-tag-dash">Key Highlights</span>

                <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" mt="md">
                  <Card
                    padding="md"
                    radius="lg"
                    withBorder
                    style={{ textAlign: 'center', backgroundColor: '#FFF5F5', borderColor: '#FEE2E2' }}
                  >
                    <ThemeIcon size={46} radius="xl" color="red" variant="light" mx="auto" mb="sm">
                      <IconUsers size={24} color="#EF4444" />
                    </ThemeIcon>
                    <Text fw={700} size="sm" c="#0B2545">
                      Expert Talks
                    </Text>
                    <Text size="xs" c="#64748B" mt={4}>
                      Keynotes from senior scientists.
                    </Text>
                  </Card>

                  <Card
                    padding="md"
                    radius="lg"
                    withBorder
                    style={{ textAlign: 'center', backgroundColor: '#F0F9FF', borderColor: '#E0F2FE' }}
                  >
                    <ThemeIcon size={46} radius="xl" color="blue" variant="light" mx="auto" mb="sm">
                      <IconSearch size={24} color="#0284C7" />
                    </ThemeIcon>
                    <Text fw={700} size="sm" c="#0B2545">
                      Research Presentations
                    </Text>
                    <Text size="xs" c="#64748B" mt={4}>
                      Oral & poster sessions.
                    </Text>
                  </Card>

                  <Card
                    padding="md"
                    radius="lg"
                    withBorder
                    style={{ textAlign: 'center', backgroundColor: '#EFF6FF', borderColor: '#DBEAFE' }}
                  >
                    <ThemeIcon size={46} radius="xl" color="blue" variant="light" mx="auto" mb="sm">
                      <IconSchool size={24} color="#2563EB" />
                    </ThemeIcon>
                    <Text fw={700} size="sm" c="#0B2545">
                      Student Participation
                    </Text>
                    <Text size="xs" c="#64748B" mt={4}>
                      Youth innovator forum.
                    </Text>
                  </Card>

                  <Card
                    padding="md"
                    radius="lg"
                    withBorder
                    style={{ textAlign: 'center', backgroundColor: '#FFF7ED', borderColor: '#FFEDD5' }}
                  >
                    <ThemeIcon size={46} radius="xl" color="orange" variant="light" mx="auto" mb="sm">
                      <IconBulb size={24} color="#EA580C" />
                    </ThemeIcon>
                    <Text fw={700} size="sm" c="#0B2545">
                      Networking Opportunities
                    </Text>
                    <Text size="xs" c="#64748B" mt={4}>
                      Cross-institute synergy.
                    </Text>
                  </Card>
                </SimpleGrid>
              </Box>
            </Stack>
          </Grid.Col>

          {/* Right Column: Event Details Sidebar */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card
              padding="xl"
              radius="lg"
              withBorder
              bg="#FFFFFF"
              style={{
                borderRadius: 20,
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
              }}
            >
              <Box mb="lg">
                <span className="section-tag-dash">Event Details</span>
              </Box>

              <Stack gap="lg">
                <Group gap="md" align="flex-start" wrap="nowrap">
                  <ThemeIcon size={38} radius="xl" color="blue" variant="light">
                    <IconCalendar size={20} color="#2563EB" />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" c="#64748B">Date</Text>
                    <Text fw={700} size="sm" c="#0B2545">
                      {event?.date_display || '22 November 2026'}
                    </Text>
                  </Box>
                </Group>

                <Group gap="md" align="flex-start" wrap="nowrap">
                  <ThemeIcon size={38} radius="xl" color="blue" variant="light">
                    <IconClock size={20} color="#2563EB" />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" c="#64748B">Time</Text>
                    <Text fw={700} size="sm" c="#0B2545">
                      {event?.time || '10:00 AM - 5:00 PM'}
                    </Text>
                  </Box>
                </Group>

                <Group gap="md" align="flex-start" wrap="nowrap">
                  <ThemeIcon size={38} radius="xl" color="blue" variant="light">
                    <IconMapPin size={20} color="#2563EB" />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" c="#64748B">Venue</Text>
                    <Text fw={700} size="sm" c="#0B2545">
                      {event?.venue || 'University of Jammu, J&K'}
                    </Text>
                  </Box>
                </Group>

                <Group gap="md" align="flex-start" wrap="nowrap">
                  <ThemeIcon size={38} radius="xl" color="blue" variant="light">
                    <IconBuildingArch size={20} color="#2563EB" />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" c="#64748B">Organized By</Text>
                    <Text fw={700} size="sm" c="#0B2545">
                      {event?.organized_by || 'Vigyan Parishad J&K'}
                    </Text>
                  </Box>
                </Group>

                <Group gap="md" align="flex-start" wrap="nowrap">
                  <ThemeIcon size={38} radius="xl" color="blue" variant="light">
                    <IconUsers size={20} color="#2563EB" />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" c="#64748B">Expected Attendance</Text>
                    <Text fw={700} size="sm" c="#0B2545">
                      {event?.participants || '120+ Participants'}
                    </Text>
                  </Box>
                </Group>
              </Stack>

              <Button
                mt="xl"
                fullWidth
                className="brand-gradient-btn"
                radius="xl"
                size="md"
                onClick={open}
              >
                Register For This Event
              </Button>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Registration Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Text fw={700} c="#0B2545">
            Event Registration • {event?.title}
          </Text>
        }
        radius="lg"
        centered
      >
        <form onSubmit={handleRegister}>
          <Stack gap="md">
            <TextInput
              required
              label="Full Name"
              placeholder="e.g. Dr. Aryan Kaul"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextInput
              required
              type="email"
              label="Email Address"
              placeholder="aryan.kaul@university.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextInput
              label="Contact Number"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <TextInput
              label="Institution / Department"
              placeholder="University of Jammu / SKUAST / School"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            />
            <Select
              label="Participant Category"
              data={['Student / Research Scholar', 'Faculty / Scientist', 'School Teacher', 'General Public']}
              value={formData.participantType}
              onChange={(val) => setFormData({ ...formData, participantType: val || 'Student' })}
            />
            <Button
              type="submit"
              className="brand-gradient-btn"
              radius="xl"
              loading={submitting}
              fullWidth
              mt="sm"
            >
              Complete Free Registration
            </Button>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}
