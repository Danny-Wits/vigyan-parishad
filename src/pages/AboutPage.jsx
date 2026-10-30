import React from 'react';
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
  ThemeIcon,
  SimpleGrid,
  Avatar,
  Badge,
  Button,
} from '@mantine/core';
import {
  IconEye,
  IconTarget,
  IconBulb,
  IconArrowRight,
  IconUsers,
  IconCertificate,
  IconBuildingCommunity,
  IconCompass,
} from '@tabler/icons-react';
import { useMembers } from '../hooks/useMembers';

export function AboutPage() {
  const { data: members = [] } = useMembers();

  return (
    <Box>
      {/* Hero Banner matching 02-about-page.jpg */}
      <Container size="xl" mt="md" mb={48}>
        <Box
          className="hero-wavy-bg"
          p={{ base: 'lg', md: 'xl', lg: 40 }}
          style={{ position: 'relative', minHeight: 420 }}
        >
          <Grid align="center" gutter={{ base: 24, md: 40 }}>
            <Grid.Col span={{ base: 12, md: 6.5 }}>
              <Stack gap="md" style={{ position: 'relative', zIndex: 1 }}>
                <Box>
                  <span className="section-tag-dash">ABOUT</span>
                </Box>

                <Title
                  order={1}
                  style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)',
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: '-0.025em',
                  }}
                >
                  <Text component="span" c="#0B2545" inherit>
                    Vigyan Parishad{' '}
                  </Text>
                  <Text component="span" c="#2563EB" inherit>
                    J&K
                  </Text>
                </Title>

                <Text
                  component="div"
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    color: '#0B2545',
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                  }}
                >
                  S C I E N C E &nbsp; F O R &nbsp; S O C I E T Y
                </Text>

                <Text
                  size="lg"
                  c="#475569"
                  style={{
                    fontSize: '1.125rem',
                    maxWidth: 520,
                    lineHeight: 1.6,
                  }}
                >
                  Vigyan Parishad J&K is a leading science organization promoting scientific temper,
                  supporting research, and creating opportunities for innovation across Jammu &
                  Kashmir.
                </Text>

                <Group gap="md" pt="xs">
                  <Button
                    component={Link}
                    to="/membership"
                    className="brand-gradient-btn"
                    size="md"
                    radius="xl"
                    rightSection={<IconArrowRight size={16} stroke={2.5} />}
                  >
                    Join Our Mission
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5.5 }}>
              <Box
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 16px 36px rgba(11, 37, 69, 0.12)',
                  border: '4px solid #FFFFFF',
                  maxHeight: 380,
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                  alt="Vigyan Parishad Campus"
                  height={360}
                  fit="cover"
                  style={{ width: '100%' }}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>

      {/* Purpose Cards: What We Are, Our Vision, Our Mission */}
      <Container size="xl" mb={60}>
        <Grid gutter="xl">
          {/* Card 1: What We Are */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card
              padding="xl"
              radius="lg"
              withBorder
              className="hover-lift"
              style={{
                height: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
              }}
            >
              <Box mb="md">
                <span className="section-tag-dash">OUR PURPOSE</span>
              </Box>
              <Title order={2} c="#0B2545" fw={800} mb="md" style={{ fontSize: '1.85rem' }}>
                What We Are
              </Title>
              <Text size="md" c="#475569" style={{ lineHeight: 1.65 }}>
                A platform bringing together scientists, educators, students and the community to
                advance science and its positive impact on society.
              </Text>
            </Card>
          </Grid.Col>

          {/* Card 2: Our Vision */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card
              padding="xl"
              radius="lg"
              withBorder
              className="hover-lift"
              style={{
                height: '100%',
                backgroundColor: '#F0F7FF',
                borderRadius: 20,
                borderColor: '#BFDBFE',
              }}
            >
              <ThemeIcon
                size={54}
                radius="xl"
                color="blue"
                variant="filled"
                mb="lg"
                style={{
                  backgroundColor: '#2563EB',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                }}
              >
                <IconEye size={30} stroke={2} color="#FFFFFF" />
              </ThemeIcon>

              <Box mb="sm">
                <span className="section-tag-dash">OUR VISION</span>
              </Box>

              <Text
                size="lg"
                fw={700}
                c="#0B2545"
                style={{ lineHeight: 1.5, fontSize: '1.25rem' }}
              >
                A scientifically aware and progressive Jammu & Kashmir.
              </Text>

              <Text size="sm" c="#64748B" mt="sm" style={{ lineHeight: 1.6 }}>
                Envisioning a self-reliant region where modern scientific methodology harmonizes
                with high-altitude ecological conservation and traditional wisdom.
              </Text>
            </Card>
          </Grid.Col>

          {/* Card 3: Our Mission */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card
              padding="xl"
              radius="lg"
              withBorder
              className="hover-lift"
              style={{
                height: '100%',
                backgroundColor: '#FFF5F5',
                borderRadius: 20,
                borderColor: '#FECACA',
              }}
            >
              <ThemeIcon
                size={54}
                radius="xl"
                color="red"
                variant="filled"
                mb="lg"
                style={{
                  backgroundColor: '#EF4444',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
                }}
              >
                <IconTarget size={30} stroke={2} color="#FFFFFF" />
              </ThemeIcon>

              <Box mb="sm">
                <span className="section-tag-dash">OUR MISSION</span>
              </Box>

              <Text
                size="lg"
                fw={700}
                c="#0B2545"
                style={{ lineHeight: 1.5, fontSize: '1.25rem' }}
              >
                To promote scientific temper, support research and innovation, and contribute to the
                development of a better society.
              </Text>

              <Text size="sm" c="#64748B" mt="sm" style={{ lineHeight: 1.6 }}>
                Creating collaborative avenues for interdisciplinary researchers, school teachers,
                and collegiate students across Jammu, Kashmir, and Ladakh.
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Organizational Leadership & Members */}
      <Container size="xl" mb={60}>
        <Box mb="xl">
          <span className="section-tag-dash">LEADERSHIP & ADVISORY</span>
          <Title order={2} mt={6} style={{ color: '#0B2545', fontWeight: 800 }}>
            Distinguished Council & Members
          </Title>
          <Text size="sm" c="#64748B">
            Prominent academicians and scientists guiding the parishad's roadmap and programs.
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          {members.map((member) => (
            <Card
              key={member.id}
              padding="lg"
              radius="lg"
              withBorder
              className="hover-lift"
              style={{ textAlign: 'center', backgroundColor: '#FFFFFF' }}
            >
              <Avatar
                src={member.photo_url}
                size={96}
                radius="100%"
                mx="auto"
                mb="md"
                style={{
                  border: '3px solid #2563EB',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.15)',
                }}
              />
              <Text fw={700} size="md" c="#0B2545">
                {member.name}
              </Text>
              <Badge color="blue" variant="light" size="sm" radius="xl" mt={6} mb={8}>
                {member.role}
              </Badge>
              <Text size="xs" c="#64748B" lineClamp={2}>
                {member.institution}
              </Text>
              <Box
                mt="md"
                mx="auto"
                style={{
                  width: 32,
                  height: 4,
                  borderRadius: 999,
                  backgroundColor: '#2563EB',
                }}
              />
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
