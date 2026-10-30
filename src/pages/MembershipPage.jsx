import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  TextInput,
  Select,
  Button,
  ThemeIcon,
  CopyButton,
  ActionIcon,
  Alert,
  Avatar,
  Badge,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconUsers,
  IconBulb,
  IconChartBar,
  IconArrowRight,
  IconCopy,
  IconCheck,
  IconInfoCircle,
  IconChevronLeft,
  IconChevronRight,
  IconQrcode,
} from '@tabler/icons-react';
import { useMembers } from '../hooks/useMembers';
import { useMembershipApplication } from '../hooks/useMembershipApplication';

const PROFESSION_OPTIONS = [
  'Student / Scholar',
  'Faculty / Professor',
  'Scientist / Researcher',
  'School Teacher / Educator',
  'Science Enthusiast / Professional',
];

export function MembershipPage() {
  const formRef = useRef(null);
  const { data: members = [] } = useMembers();
  const membershipMutation = useMembershipApplication();
  const submitting = membershipMutation.isPending;
  const [memberSlideIndex, setMemberSlideIndex] = useState(0);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    profession: null,
    areaOfInterest: '',
    motivation: '',
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.contactNumber || !formData.profession) {
      notifications.show({
        title: 'Required Fields Missing',
        message: 'Please fill in your Full Name, Email, Contact Number, and Profession.',
        color: 'red',
      });
      return;
    }

    try {
      await membershipMutation.mutateAsync({
        fullName: formData.fullName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        profession: formData.profession,
        areaOfInterest: formData.areaOfInterest,
        motivation: formData.motivation,
      });

      setFormData({
        fullName: '',
        email: '',
        contactNumber: '',
        profession: null,
        areaOfInterest: '',
        motivation: '',
      });
    } catch (err) {
      // Error notification handled by mutation hook
    }
  };

  const handlePrevMember = () => {
    setMemberSlideIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNextMember = () => {
    setMemberSlideIndex((prev) => (prev < members.length - 1 ? prev + 1 : prev));
  };

  return (
    <Box>
      {/* Hero Banner matching 06 mockup */}
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
                  <span className="section-tag-dash">MEMBERSHIP</span>
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
                    Be a Part of a{' '}
                  </Text>
                  <Text component="span" c="#2563EB" inherit>
                    Bigger Purpose
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
                  Join Vigyan Parishad J&K and contribute to a scientifically aware and progressive
                  society.
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
                  alt="Membership Banner"
                  height={240}
                  fit="cover"
                  style={{ width: '100%' }}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>

      {/* 3 Value Cards */}
      <Container size="xl" mb={40}>
        <Grid gutter="lg">
          {/* Card 1 */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card
              padding="lg"
              radius="lg"
              withBorder
              className="hover-lift"
              bg="#FFFFFF"
              style={{ borderRadius: 16 }}
            >
              <Group gap="md" align="center">
                <ThemeIcon
                  size={50}
                  radius="xl"
                  color="red"
                  variant="light"
                  style={{ backgroundColor: '#FFF1F2' }}
                >
                  <IconUsers size={26} color="#E11D48" />
                </ThemeIcon>
                <Box>
                  <Text fw={700} size="sm" c="#0B2545">
                    Join a
                  </Text>
                  <Text fw={800} size="md" c="#0B2545">
                    Scientific Community
                  </Text>
                  <Box
                    mt={4}
                    style={{
                      width: 24,
                      height: 3,
                      borderRadius: 999,
                      backgroundColor: '#E11D48',
                    }}
                  />
                </Box>
              </Group>
            </Card>
          </Grid.Col>

          {/* Card 2 */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card
              padding="lg"
              radius="lg"
              withBorder
              className="hover-lift"
              bg="#FFFFFF"
              style={{ borderRadius: 16 }}
            >
              <Group gap="md" align="center">
                <ThemeIcon
                  size={50}
                  radius="xl"
                  color="blue"
                  variant="light"
                  style={{ backgroundColor: '#EFF6FF' }}
                >
                  <IconBulb size={26} color="#2563EB" />
                </ThemeIcon>
                <Box>
                  <Text fw={700} size="sm" c="#0B2545">
                    Support Research
                  </Text>
                  <Text fw={800} size="md" c="#0B2545">
                    and Innovation
                  </Text>
                  <Box
                    mt={4}
                    style={{
                      width: 24,
                      height: 3,
                      borderRadius: 999,
                      backgroundColor: '#2563EB',
                    }}
                  />
                </Box>
              </Group>
            </Card>
          </Grid.Col>

          {/* Card 3 */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card
              padding="lg"
              radius="lg"
              withBorder
              className="hover-lift"
              bg="#FFFFFF"
              style={{ borderRadius: 16 }}
            >
              <Group gap="md" align="center">
                <ThemeIcon
                  size={50}
                  radius="xl"
                  color="orange"
                  variant="light"
                  style={{ backgroundColor: '#FFF7ED' }}
                >
                  <IconChartBar size={26} color="#EA580C" />
                </ThemeIcon>
                <Box>
                  <Text fw={700} size="sm" c="#0B2545">
                    Contribute to
                  </Text>
                  <Text fw={800} size="md" c="#0B2545">
                    Science for Society
                  </Text>
                  <Box
                    mt={4}
                    style={{
                      width: 24,
                      height: 3,
                      borderRadius: 999,
                      backgroundColor: '#EA580C',
                    }}
                  />
                </Box>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>

      {/* "Become a Member" Banner Card with Plant & Sprout Image */}
      <Container size="xl" mb={48}>
        <Box
          p={{ base: 'lg', md: 36 }}
          style={{
            backgroundColor: '#F0F6FF',
            borderRadius: 24,
            border: '1px solid #DBEAFE',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Grid align="center" gutter={32}>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Title order={2} c="#0B2545" fw={800} style={{ fontSize: '2rem' }}>
                Become a Member
              </Title>
              <Text size="md" c="#475569" mt="xs" mb="lg">
                Be part of initiatives, events and programs that create real impact.
              </Text>
              <Button
                className="brand-gradient-btn"
                size="md"
                radius="xl"
                rightSection={<IconArrowRight size={16} stroke={2.5} />}
                onClick={scrollToForm}
              >
                Apply for Membership
              </Button>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
              <Box
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  maxHeight: 200,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                  alt="Hands holding green sprout"
                  height={200}
                  fit="cover"
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>

      {/* Application Form + UPI QR Code Card matching 06 mockup */}
      <Container size="xl" mb={60} ref={formRef}>
        <Grid gutter={36} align="flex-start">
          {/* Left: Application Form */}
          <Grid.Col span={{ base: 12, md: 7.5 }}>
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
                <span className="section-tag-dash">Membership Application</span>
              </Box>
              <Text size="sm" c="#64748B" mb="xl">
                Fill in the details below to become a member of Vigyan Parishad J&K.
              </Text>

              <form onSubmit={handleSubmit}>
                <Grid gutter="md">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      required
                      label="Full Name *"
                      placeholder="Enter your full name"
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
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      required
                      label="Contact Number *"
                      placeholder="Enter your contact number"
                      value={formData.contactNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, contactNumber: e.target.value })
                      }
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      required
                      label="Profession / Student / Organization *"
                      placeholder="Select"
                      data={PROFESSION_OPTIONS}
                      value={formData.profession}
                      onChange={(val) =>
                        setFormData({ ...formData, profession: val })
                      }
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Area of Interest (Optional)"
                      placeholder="e.g. Research, Education, Outreach"
                      value={formData.areaOfInterest}
                      onChange={(e) =>
                        setFormData({ ...formData, areaOfInterest: e.target.value })
                      }
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Short Motivation (Optional)"
                      placeholder="Why do you want to join?"
                      value={formData.motivation}
                      onChange={(e) =>
                        setFormData({ ...formData, motivation: e.target.value })
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
                  fullWidth
                  mt="xl"
                  rightSection={<IconArrowRight size={16} stroke={2.5} />}
                >
                  Submit Application
                </Button>
              </form>
            </Card>
          </Grid.Col>

          {/* Right: Membership Fee & UPI QR Code */}
          <Grid.Col span={{ base: 12, md: 4.5 }}>
            <Card
              padding="xl"
              radius="lg"
              withBorder
              bg="#FFFFFF"
              style={{
                borderRadius: 20,
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                textAlign: 'center',
              }}
            >
              <Box mb="xs" style={{ textAlign: 'left' }}>
                <span className="section-tag-dash">Membership Fee</span>
              </Box>
              <Text size="sm" c="#64748B" mb="lg" style={{ textAlign: 'left' }}>
                Scan the QR code to make the payment.
              </Text>

              {/* QR Code Container */}
              <Box
                p="md"
                bg="#FFFFFF"
                style={{
                  border: '2px solid #E2E8F0',
                  borderRadius: 16,
                  display: 'inline-block',
                  position: 'relative',
                  margin: '0 auto',
                  maxWidth: 220,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                }}
              >
                {/* Generated SVG QR Code representation */}
                <svg
                  viewBox="0 0 200 200"
                  width="180"
                  height="180"
                  style={{ display: 'block' }}
                >
                  {/* Top-left position marker */}
                  <rect x="10" y="10" width="50" height="50" fill="#0B2545" rx="6" />
                  <rect x="20" y="20" width="30" height="30" fill="#FFFFFF" rx="4" />
                  <rect x="28" y="28" width="14" height="14" fill="#0B2545" rx="2" />

                  {/* Top-right position marker */}
                  <rect x="140" y="10" width="50" height="50" fill="#0B2545" rx="6" />
                  <rect x="150" y="20" width="30" height="30" fill="#FFFFFF" rx="4" />
                  <rect x="158" y="28" width="14" height="14" fill="#0B2545" rx="2" />

                  {/* Bottom-left position marker */}
                  <rect x="10" y="140" width="50" height="50" fill="#0B2545" rx="6" />
                  <rect x="20" y="150" width="30" height="30" fill="#FFFFFF" rx="4" />
                  <rect x="28" y="158" width="14" height="14" fill="#0B2545" rx="2" />

                  {/* Matrix dots simulating UPI QR code */}
                  <rect x="70" y="15" width="10" height="10" fill="#0B2545" rx="2" />
                  <rect x="90" y="15" width="10" height="10" fill="#0B2545" rx="2" />
                  <rect x="110" y="25" width="10" height="10" fill="#0B2545" rx="2" />
                  <rect x="70" y="35" width="15" height="10" fill="#0B2545" rx="2" />
                  <rect x="95" y="45" width="15" height="10" fill="#0B2545" rx="2" />
                  <rect x="120" y="45" width="10" height="10" fill="#0B2545" rx="2" />
                  
                  <rect x="15" y="70" width="10" height="15" fill="#0B2545" rx="2" />
                  <rect x="35" y="80" width="15" height="10" fill="#0B2545" rx="2" />
                  <rect x="55" y="70" width="10" height="10" fill="#0B2545" rx="2" />
                  <rect x="70" y="70" width="10" height="10" fill="#0B2545" rx="2" />
                  
                  <rect x="140" y="70" width="15" height="10" fill="#0B2545" rx="2" />
                  <rect x="165" y="80" width="10" height="15" fill="#0B2545" rx="2" />
                  <rect x="145" y="100" width="15" height="10" fill="#0B2545" rx="2" />
                  <rect x="170" y="115" width="10" height="10" fill="#0B2545" rx="2" />

                  <rect x="70" y="140" width="15" height="10" fill="#0B2545" rx="2" />
                  <rect x="95" y="145" width="10" height="15" fill="#0B2545" rx="2" />
                  <rect x="115" y="135" width="15" height="10" fill="#0B2545" rx="2" />
                  <rect x="80" y="165" width="10" height="15" fill="#0B2545" rx="2" />
                  <rect x="100" y="170" width="15" height="10" fill="#0B2545" rx="2" />
                  <rect x="140" y="145" width="15" height="15" fill="#0B2545" rx="2" />
                  <rect x="165" y="140" width="10" height="10" fill="#0B2545" rx="2" />
                  <rect x="150" y="170" width="20" height="10" fill="#0B2545" rx="2" />
                </svg>

                {/* Central Emblem */}
                <Box
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 10,
                    padding: 4,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <img src="/logo.png" alt="Logo" style={{ height: 28, width: 28, objectFit: 'contain' }} />
                </Box>
              </Box>

              {/* UPI ID Bar with One-Click Copy */}
              <Box
                p="xs"
                mt="md"
                bg="#F8FAFC"
                style={{
                  borderRadius: 12,
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text size="xs" fw={700} c="#0B2545" pl={4}>
                  UPI ID: vigyanparishad@upi
                </Text>

                <CopyButton value="vigyanparishad@upi">
                  {({ copied, copy }) => (
                    <ActionIcon
                      color={copied ? 'teal' : 'blue'}
                      variant="subtle"
                      radius="xl"
                      onClick={() => {
                        copy();
                        notifications.show({
                          title: 'UPI ID Copied!',
                          message: 'vigyanparishad@upi copied to clipboard.',
                          color: 'teal',
                          icon: <IconCheck size={16} />,
                        });
                      }}
                      aria-label="Copy UPI ID"
                    >
                      {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    </ActionIcon>
                  )}
                </CopyButton>
              </Box>

              {/* Info Notice */}
              <Alert
                icon={<IconInfoCircle size={18} />}
                color="blue"
                variant="light"
                radius="md"
                mt="md"
                styles={{
                  message: { fontSize: '0.8rem', lineHeight: 1.4, textAlign: 'left' },
                }}
              >
                After payment, please fill the form and keep the payment screenshot for reference.
              </Alert>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Our Members Carousel Section */}
      <Container size="xl" mb={60}>
        <Group justify="space-between" align="center" mb="xl">
          <Box>
            <span className="section-tag-dash">Our Members</span>
          </Box>
          <Group gap="xs">
            <Text
              component={Link}
              to="/about"
              size="sm"
              fw={700}
              c="#2563EB"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              View All <IconArrowRight size={14} />
            </Text>
            <ActionIcon
              variant="default"
              radius="xl"
              size="sm"
              onClick={handlePrevMember}
              disabled={memberSlideIndex === 0}
              aria-label="Previous"
            >
              <IconChevronLeft size={16} />
            </ActionIcon>
            <ActionIcon
              variant="default"
              radius="xl"
              size="sm"
              onClick={handleNextMember}
              disabled={memberSlideIndex >= members.length - 4}
              aria-label="Next"
            >
              <IconChevronRight size={16} />
            </ActionIcon>
          </Group>
        </Group>

        <Grid gutter="lg">
          {members.map((member) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={member.id}>
              <Card
                padding="lg"
                radius="lg"
                withBorder
                className="hover-lift"
                bg="#FFFFFF"
                style={{ textAlign: 'center', borderRadius: 16 }}
              >
                <Avatar
                  src={member.photo_url}
                  size={84}
                  radius="100%"
                  mx="auto"
                  mb="sm"
                  style={{
                    border: '3px solid #BFDBFE',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)',
                  }}
                />
                <Text fw={700} size="sm" c="#0B2545">
                  {member.name}
                </Text>
                <Text size="xs" c="#64748B" mt={2}>
                  {member.role}
                </Text>

                <Box
                  mt="md"
                  mx="auto"
                  style={{
                    width: 24,
                    height: 3,
                    borderRadius: 999,
                    backgroundColor: member.display_order % 2 === 0 ? '#EF4444' : '#2563EB',
                  }}
                />
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
