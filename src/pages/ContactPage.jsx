import React, { useState } from 'react';
import {
  Container,
  Box,
  Title,
  Text,
  Grid,
  Card,
  Image,
  Stack,
  TextInput,
  Textarea,
  Select,
  Button,
  ThemeIcon,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMessage,
  IconMapPin,
  IconUsers,
  IconArrowRight,
  IconCheck,
} from '@tabler/icons-react';
import { useContact } from '../hooks/useContact';

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Membership Query',
  'National Science Seminar',
  'Research Publication / Submission',
  'School STEM Program Collaboration',
  'Other',
];

export function ContactPage() {
  const contactMutation = useContact();
  const submitting = contactMutation.isPending;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    subject: null,
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      notifications.show({
        title: 'Missing information',
        message: 'Please provide your name, email and message.',
        color: 'red',
      });
      return;
    }

    try {
      await contactMutation.mutateAsync({
        fullName: formData.fullName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        subject: formData.subject || 'General Inquiry',
        message: formData.message,
      });

      setFormData({
        fullName: '',
        email: '',
        contactNumber: '',
        subject: null,
        message: '',
      });
    } catch (err) {
      // Error notification handled by mutation hook
    }
  };

  return (
    <Box>
      {/* Hero Banner matching 07 mockup */}
      <Container size="xl" mt="md" mb={40}>
        <Box
          className="hero-wavy-bg"
          p={{ base: 'lg', md: 'xl', lg: 36 }}
          style={{ position: 'relative', minHeight: 320 }}
        >
          <Grid align="center" gutter={{ base: 24, md: 36 }}>
            <Grid.Col span={{ base: 12, md: 6.5 }}>
              <Stack gap="xs" style={{ position: 'relative', zIndex: 1 }}>
                <Box>
                  <span className="section-tag-dash">CONTACT</span>
                </Box>

                <Title
                  order={1}
                  style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3.25rem)',
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                  }}
                >
                  <Text component="span" c="#0B2545" inherit>
                    Let's{' '}
                  </Text>
                  <Text component="span" c="#2563EB" inherit>
                    Connect
                  </Text>
                </Title>

                <Text
                  size="md"
                  c="#475569"
                  style={{
                    fontSize: '1.05rem',
                    maxWidth: 480,
                    lineHeight: 1.5,
                  }}
                >
                  We are always happy to hear from you. Reach out for any information related to our
                  events, programs, membership or general queries.
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5.5 }}>
              <Box
                style={{
                  borderRadius: 18,
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(11, 37, 69, 0.1)',
                  border: '3px solid #FFFFFF',
                  maxHeight: 240,
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                  alt="Vigyan Parishad Headquarters"
                  height={240}
                  fit="cover"
                  style={{ width: '100%' }}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>

      {/* Main Section: Form + Contact Cards matching 07 mockup */}
      <Container size="xl" mb={60}>
        <Grid gutter={36} align="flex-start">
          {/* Left Column: Send Us a Message */}
          <Grid.Col span={{ base: 12, md: 6.5 }}>
            <Card
              padding="xl"
              radius="lg"
              withBorder
              bg="#FFFFFF"
              style={{
                borderRadius: 20,
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              }}
            >
              <Box mb="xs">
                <span className="section-tag-dash">Send Us a Message</span>
              </Box>
              <Text size="sm" c="#64748B" mb="xl">
                Fill out the form below and we'll get back to you soon.
              </Text>

              <form onSubmit={handleSubmit}>
                <Grid gutter="md">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      required
                      label="Full Name *"
                      placeholder="Enter your full name"
                      leftSection={<IconUser size={16} color="#64748B" />}
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      required
                      type="email"
                      label="Email Address *"
                      placeholder="Enter your email address"
                      leftSection={<IconMail size={16} color="#64748B" />}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Contact Number *"
                      placeholder="Enter your contact number"
                      leftSection={<IconPhone size={16} color="#64748B" />}
                      value={formData.contactNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, contactNumber: e.target.value })
                      }
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Subject *"
                      placeholder="Select a subject"
                      data={SUBJECT_OPTIONS}
                      value={formData.subject}
                      onChange={(val) =>
                        setFormData({ ...formData, subject: val })
                      }
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <Textarea
                      required
                      label="Your Message *"
                      placeholder="Write your message here..."
                      minRows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      radius="md"
                    />
                  </Grid.Col>
                </Grid>

                <Button
                  type="submit"
                  className="brand-gradient-btn"
                  size="md"
                  radius="xl"
                  loading={submitting}
                  mt="xl"
                  rightSection={<IconArrowRight size={16} stroke={2.5} />}
                  style={{ minWidth: 180 }}
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </Grid.Col>

          {/* Right Column: Contact Information (4 cards in 2x2 grid) */}
          <Grid.Col span={{ base: 12, md: 5.5 }}>
            <Box mb="md">
              <span className="section-tag-dash">Contact Information</span>
            </Box>

            <Grid gutter="md">
              {/* Card 1: Office Address (Light Blue) */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card
                  padding="lg"
                  radius="lg"
                  withBorder
                  style={{
                    backgroundColor: '#F0F7FF',
                    borderColor: '#DBEAFE',
                    borderRadius: 16,
                    minHeight: 180,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <ThemeIcon
                    size={46}
                    radius="xl"
                    color="blue"
                    variant="filled"
                    mb="sm"
                    style={{ backgroundColor: '#2563EB' }}
                  >
                    <IconMapPin size={24} color="#FFFFFF" />
                  </ThemeIcon>

                  <Text fw={700} size="sm" c="#0B2545" mb={4}>
                    Office Address
                  </Text>
                  <Text size="xs" c="#64748B" style={{ lineHeight: 1.5 }}>
                    Vigyan Parishad J&K<br />
                    Jammu, Jammu & Kashmir<br />
                    India
                  </Text>
                </Card>
              </Grid.Col>

              {/* Card 2: Phone (Light Peach) */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card
                  padding="lg"
                  radius="lg"
                  withBorder
                  style={{
                    backgroundColor: '#FFF7ED',
                    borderColor: '#FFEDD5',
                    borderRadius: 16,
                    minHeight: 180,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <ThemeIcon
                    size={46}
                    radius="xl"
                    color="orange"
                    variant="filled"
                    mb="sm"
                    style={{ backgroundColor: '#EA580C' }}
                  >
                    <IconPhone size={24} color="#FFFFFF" />
                  </ThemeIcon>

                  <Text fw={700} size="sm" c="#0B2545" mb={4}>
                    Phone
                  </Text>
                  <Text size="xs" c="#64748B" style={{ lineHeight: 1.5 }}>
                    +91 191 243 5678<br />
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                      (Mon – Fri, 10:00 AM – 5:00 PM)
                    </span>
                  </Text>
                </Card>
              </Grid.Col>

              {/* Card 3: Email (Light Mint/Teal) */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card
                  padding="lg"
                  radius="lg"
                  withBorder
                  style={{
                    backgroundColor: '#F0FDF4',
                    borderColor: '#DCFCE7',
                    borderRadius: 16,
                    minHeight: 180,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <ThemeIcon
                    size={46}
                    radius="xl"
                    color="teal"
                    variant="filled"
                    mb="sm"
                    style={{ backgroundColor: '#16A34A' }}
                  >
                    <IconMail size={24} color="#FFFFFF" />
                  </ThemeIcon>

                  <Text fw={700} size="sm" c="#0B2545" mb={4}>
                    Email
                  </Text>
                  <Text size="xs" c="#2563EB" fw={600} style={{ wordBreak: 'break-all' }}>
                    info@vigyanparishadjk.org
                  </Text>
                </Card>
              </Grid.Col>

              {/* Card 4: General Enquiries (Light Lavender/Purple) */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Card
                  padding="lg"
                  radius="lg"
                  withBorder
                  style={{
                    backgroundColor: '#FAF5FF',
                    borderColor: '#F3E8FF',
                    borderRadius: 16,
                    minHeight: 180,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <ThemeIcon
                    size={46}
                    radius="xl"
                    color="grape"
                    variant="filled"
                    mb="sm"
                    style={{ backgroundColor: '#9333EA' }}
                  >
                    <IconUsers size={24} color="#FFFFFF" />
                  </ThemeIcon>

                  <Text fw={700} size="sm" c="#0B2545" mb={4}>
                    General Enquiries
                  </Text>
                  <Text size="xs" c="#64748B" style={{ lineHeight: 1.5 }}>
                    For events, programs membership and other queries.
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
