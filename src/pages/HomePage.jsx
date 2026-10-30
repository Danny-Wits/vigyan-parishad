import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Title,
  Text,
  Button,
  Grid,
  Card,
  Image,
  Group,
  Stack,
  Badge,
  ActionIcon,
  SimpleGrid,
  ThemeIcon,
} from '@mantine/core';
import {
  IconArrowRight,
  IconCalendar,
  IconBook,
  IconPhoto,
  IconAtom,
  IconPlant,
  IconSchool,
  IconMicroscope,
  IconMapPin,
  IconClock,
  IconChevronRight,
  IconUserCheck,
} from '@tabler/icons-react';
import { useEvents } from '../hooks/useEvents';
import { usePublications } from '../hooks/usePublications';
import { useGallery } from '../hooks/useGallery';

const HERO_SLIDES = [
  {
    tag: 'VIGYAN PARISHAD J&K',
    titleLead: 'Promoting',
    titleAccent: 'Indian Science',
    titleTrail: 'and Scientific Temper',
    subtitle: "Nurturing scientific minds and advancing India's scientific heritage.",
    ctaText: 'Explore Initiatives',
    ctaLink: '/events',
    image: '/hero-campus.jpg',
  },
  {
    tag: 'RESEARCH & INNOVATION',
    titleLead: 'Empowering',
    titleAccent: 'Young Innovators',
    titleTrail: 'in Jammu, Kashmir & Ladakh',
    subtitle: 'Fostering research culture, grassroots prototypes, and student science congresses.',
    ctaText: 'View Publications',
    ctaLink: '/publications',
    image: '/hero-campus.jpg',
  },
  {
    tag: 'COMMUNITY & OUTREACH',
    titleLead: 'Connecting',
    titleAccent: 'Science with Society',
    titleTrail: 'for Sustainable Progress',
    subtitle: 'High-altitude ecology, clean Himalayan rivers, and experiential science workshops.',
    ctaText: 'Join Parishad',
    ctaLink: '/membership',
    image: '/hero-campus.jpg',
  },
  {
    tag: 'INDIGENOUS KNOWLEDGE',
    titleLead: 'Advancing',
    titleAccent: 'Swadeshi Vigyan',
    titleTrail: '& Modern Technologies',
    subtitle: 'Bridging timeless Indian scientific wisdom with contemporary innovation.',
    ctaText: 'About Parishad',
    ctaLink: '/about',
    image: '/hero-campus.jpg',
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Slowly cycle between the 4 hero slides with a 5-second delay (pauses on hover)
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeSlide, isHovered]);

  const { data: events = [] } = useEvents();
  const { data: publications = [] } = usePublications();
  const { data: albums = [] } = useGallery();

  const featuredEvents = events.slice(0, 3);
  const featuredPublications = publications.slice(0, 3);
  const featuredAlbums = albums.slice(0, 3);

  const currentSlide = HERO_SLIDES[activeSlide];

  return (
    <Box>
      {/* Hero Banner Section matching reference mockup */}
      <Container size="xl" mt="md" mb={48}>
        <Box
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 24,
            border: '1px solid #E2E8F0',
            backgroundColor: '#F0F6FF',
            background: 'linear-gradient(135deg, #F8FAFD 0%, #EBF4FF 40%, #DCEEFF 100%)',
            minHeight: 480,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Subtle bottom-left wave / organic gradient glow */}
          <Box
            style={{
              position: 'absolute',
              left: -40,
              bottom: -40,
              width: 380,
              height: 380,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(59, 130, 246, 0.03) 70%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Right Seamless Campus Image */}
          <Box
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '56%',
              zIndex: 1,
              overflow: 'hidden',
              borderRadius: '0 24px 24px 0',
              pointerEvents: 'none',
            }}
            display={{ base: 'none', md: 'block' }}
          >
            <img
              src={currentSlide.image}
              alt="University Campus Vigyan Parishad J&K"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'left center',
                maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, black 40%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, black 40%)',
              }}
            />
          </Box>

          {/* Left Hero Content */}
          <Box
            p={{ base: 28, sm: 40, md: 48, lg: 54 }}
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: 680,
              width: '100%',
            }}
          >
            {/* Animated Slide Content (cycles smoothly every 5s) */}
            <Stack key={activeSlide} gap="md" className="hero-slide-content">
              {/* Eyebrow tag with gradient dash */}
              <Group gap={10} align="center">
                <Box
                  style={{
                    width: 28,
                    height: 4,
                    borderRadius: 999,
                    background: 'linear-gradient(90deg, #F04336 0%, #2563EB 100%)',
                  }}
                />
                <Text
                  size="xs"
                  fw={800}
                  c="#0B2545"
                  style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
                >
                  {currentSlide.tag}
                </Text>
              </Group>

              {/* Title with exact reference hierarchy */}
              <Title
                order={1}
                style={{
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.35rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                }}
              >
                <Text component="span" c="#0B2545" inherit>
                  {currentSlide.titleLead}{' '}
                </Text>
                <Text component="span" c="#EF4444" inherit>
                  {currentSlide.titleAccent}
                </Text>
                <Text component="div" c="#2563EB" inherit mt={2}>
                  {currentSlide.titleTrail}
                </Text>
              </Title>

              {/* Subtitle */}
              <Text
                size="lg"
                c="#475569"
                style={{
                  fontSize: '1.125rem',
                  maxWidth: 520,
                  lineHeight: 1.55,
                }}
              >
                {currentSlide.subtitle}
              </Text>

              {/* CTA Button */}
              <Group gap="md" pt="xs">
                <Button
                  className="brand-gradient-btn"
                  size="lg"
                  radius="xl"
                  rightSection={<IconArrowRight size={18} stroke={2.5} />}
                  onClick={() => navigate(currentSlide.ctaLink)}
                  style={{
                    paddingLeft: 28,
                    paddingRight: 24,
                    fontSize: '1rem',
                    fontWeight: 700,
                  }}
                >
                  {currentSlide.ctaText}
                </Button>
              </Group>
            </Stack>

            {/* 4 Circular Indicator Dots matching reference */}
            <Group gap={10} pt="xl">
              {HERO_SLIDES.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to slide ${index + 1}: ${HERO_SLIDES[index].tag}`}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: activeSlide === index ? '#EF4444' : '#BAE6FD',
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: activeSlide === index ? 'scale(1.3)' : 'scale(1)',
                    boxShadow: activeSlide === index ? '0 0 0 3px rgba(239, 68, 68, 0.25)' : 'none',
                  }}
                />
              ))}
            </Group>
          </Box>
        </Box>
      </Container>

      {/* Core Purpose / Quick Overview Cards */}
      <Container size="xl" mb={60}>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          <Card padding="lg" radius="lg" withBorder className="hover-lift" bg="#FFFFFF">
            <ThemeIcon size={46} radius="xl" color="blue" variant="light" mb="md">
              <IconAtom size={26} color="#2563EB" />
            </ThemeIcon>
            <Text fw={700} size="md" c="#0B2545" mb={6}>
              Scientific Temper
            </Text>
            <Text size="sm" c="#64748B">
              Instilling rational thinking, logical deduction, and curiosity in children and educators across J&K.
            </Text>
          </Card>

          <Card padding="lg" radius="lg" withBorder className="hover-lift" bg="#FFFFFF">
            <ThemeIcon size={46} radius="xl" color="teal" variant="light" mb="md">
              <IconPlant size={26} color="#059669" />
            </ThemeIcon>
            <Text fw={700} size="md" c="#0B2545" mb={6}>
              Himalayan Research
            </Text>
            <Text size="sm" c="#64748B">
              Preserving high-altitude ecosystems, biodiversity, glacier tracking, and indigenous herbs.
            </Text>
          </Card>

          <Card padding="lg" radius="lg" withBorder className="hover-lift" bg="#FFFFFF">
            <ThemeIcon size={46} radius="xl" color="orange" variant="light" mb="md">
              <IconSchool size={26} color="#EA580C" />
            </ThemeIcon>
            <Text fw={700} size="md" c="#0B2545" mb={6}>
              Youth & STEM Labs
            </Text>
            <Text size="sm" c="#64748B">
              Empowering government and rural schools with experiential learning kits and AI bootcamps.
            </Text>
          </Card>

          <Card padding="lg" radius="lg" withBorder className="hover-lift" bg="#FFFFFF">
            <ThemeIcon size={46} radius="xl" color="red" variant="light" mb="md">
              <IconMicroscope size={26} color="#DC2626" />
            </ThemeIcon>
            <Text fw={700} size="md" c="#0B2545" mb={6}>
              Conferences & Awards
            </Text>
            <Text size="sm" c="#64748B">
              National seminars, state children science congress, and young scientist honors.
            </Text>
          </Card>
        </SimpleGrid>
      </Container>

      {/* Featured Events Section */}
      <Container size="xl" mb={60}>
        <Group justify="space-between" align="flex-end" mb="xl">
          <Box>
            <span className="section-tag-dash">EVENTS</span>
            <Title order={2} mt={6} style={{ color: '#0B2545', fontWeight: 800 }}>
              Upcoming & Featured Events
            </Title>
            <Text size="sm" c="#64748B">
              Seminars, workshops, and exhibitions organized across Jammu, Srinagar, and Leh.
            </Text>
          </Box>
          <Button
            component={Link}
            to="/events"
            variant="subtle"
            color="blue"
            radius="xl"
            rightSection={<IconArrowRight size={16} />}
            fw={600}
          >
            View All Events
          </Button>
        </Group>

        <Grid gutter="lg">
          {featuredEvents.map((item) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={item.id}>
              <Card
                padding="0"
                radius="lg"
                withBorder
                className="hover-lift"
                style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                {/* Image with date badge */}
                <Box style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    height={200}
                    fit="cover"
                    fallbackSrc="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
                  />
                  {/* Calendar day/month floating badge */}
                  <Box
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 10,
                      padding: '6px 10px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      textAlign: 'center',
                      lineHeight: 1.1,
                      minWidth: 50,
                    }}
                  >
                    <Text fw={800} size="md" c="#0B2545">
                      {item.day_month ? item.day_month.split(' ')[0] : '22'}
                    </Text>
                    <Text fw={700} size="xs" c="#2563EB" tt="uppercase">
                      {item.day_month ? item.day_month.split(' ')[1] : 'NOV'}
                    </Text>
                    <Text size="10px" c="#64748B">
                      {item.year || '2026'}
                    </Text>
                  </Box>
                </Box>

                <Box p="lg" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Category tag */}
                  <Text
                    size="xs"
                    fw={700}
                    c="#EF4444"
                    tt="uppercase"
                    mb={6}
                    style={{ letterSpacing: '0.08em' }}
                  >
                    — {item.category}
                  </Text>

                  <Text
                    fw={700}
                    size="md"
                    c="#0B2545"
                    lineClamp={2}
                    mb="xs"
                    component={Link}
                    to={`/events/${item.slug || item.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {item.title}
                  </Text>

                  <Text size="xs" c="#64748B" mb="md" lineClamp={2}>
                    {item.subtitle || item.description}
                  </Text>

                  <Group justify="space-between" align="center" mt="auto">
                    <Group gap={6}>
                      <IconMapPin size={14} color="#64748B" />
                      <Text size="xs" c="#64748B" truncate style={{ maxWidth: 170 }}>
                        {item.venue}
                      </Text>
                    </Group>
                    <ActionIcon
                      component={Link}
                      to={`/events/${item.slug || item.id}`}
                      radius="xl"
                      size={36}
                      variant="light"
                      color="blue"
                      aria-label="View Event"
                    >
                      <IconArrowRight size={16} />
                    </ActionIcon>
                  </Group>
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      {/* Featured Publications Section */}
      <Box py={50} bg="#F8FAFC" style={{ borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <Container size="xl">
          <Group justify="space-between" align="flex-end" mb="xl">
            <Box>
              <span className="section-tag-dash">PUBLICATIONS</span>
              <Title order={2} mt={6} style={{ color: '#0B2545', fontWeight: 800 }}>
                Recent Research & Reports
              </Title>
              <Text size="sm" c="#64748B">
                Scientific papers, ecological surveys, and annual proceedings published by our council.
              </Text>
            </Box>
            <Button
              component={Link}
              to="/publications"
              variant="subtle"
              color="blue"
              radius="xl"
              rightSection={<IconArrowRight size={16} />}
              fw={600}
            >
              View All Publications
            </Button>
          </Group>

          <Grid gutter="lg">
            {featuredPublications.map((pub) => (
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={pub.id}>
                <Card
                  padding="0"
                  radius="lg"
                  withBorder
                  className="hover-lift"
                  bg="#FFFFFF"
                  style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Box style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                    <Image
                      src={pub.cover_image}
                      alt={pub.title}
                      height={180}
                      fit="cover"
                      fallbackSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                    />
                    <Badge
                      size="sm"
                      radius="xl"
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        backgroundColor: '#2563EB',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      {pub.category}
                    </Badge>
                  </Box>

                  <Box p="lg" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Text
                      fw={700}
                      size="md"
                      c="#0B2545"
                      lineClamp={2}
                      mb={6}
                      component={Link}
                      to={`/publications/${pub.slug || pub.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      {pub.title}
                    </Text>

                    <Text size="xs" c="#64748B" mb="xs">
                      By {pub.author} • {pub.date_display}
                    </Text>

                    <Text size="xs" c="#64748B" mb="md" lineClamp={2}>
                      {pub.abstract}
                    </Text>

                    <Group justify="space-between" align="center" mt="auto">
                      <Badge variant="outline" color="gray" size="sm">
                        {pub.file_size}
                      </Badge>
                      <ActionIcon
                        component={Link}
                        to={`/publications/${pub.slug || pub.id}`}
                        radius="xl"
                        size={36}
                        variant="light"
                        color="blue"
                        aria-label="Read Publication"
                      >
                        <IconChevronRight size={16} />
                      </ActionIcon>
                    </Group>
                  </Box>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Gallery Highlights Preview */}
      <Container size="xl" mt={60} mb={60}>
        <Group justify="space-between" align="flex-end" mb="xl">
          <Box>
            <span className="section-tag-dash">GALLERY</span>
            <Title order={2} mt={6} style={{ color: '#0B2545', fontWeight: 800 }}>
              Moments in Motion
            </Title>
            <Text size="sm" c="#64748B">
              A glimpse into our state seminars, science camps, and hands-on workshops in pictures.
            </Text>
          </Box>
          <Button
            component={Link}
            to="/gallery"
            variant="subtle"
            color="blue"
            radius="xl"
            rightSection={<IconArrowRight size={16} />}
            fw={600}
          >
            Explore Full Gallery
          </Button>
        </Group>

        <Grid gutter="lg">
          {featuredAlbums.map((alb) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={alb.id}>
              <Card
                padding="0"
                radius="lg"
                withBorder
                className="hover-lift"
                component={Link}
                to={`/gallery/${alb.slug || alb.id}`}
                style={{ textDecoration: 'none', overflow: 'hidden' }}
              >
                <Box style={{ position: 'relative', height: 210 }}>
                  <Image
                    src={alb.cover_image}
                    alt={alb.title}
                    height={210}
                    fit="cover"
                  />
                  <Box
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(11, 37, 69, 0.85) 0%, transparent 60%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: 16,
                    }}
                  >
                    <Text size="xs" fw={700} c="#FCA5A5" tt="uppercase" mb={4}>
                      — {alb.category}
                    </Text>
                    <Text fw={700} size="md" c="#FFFFFF" lineClamp={1}>
                      {alb.title}
                    </Text>
                    <Group justify="space-between" mt={4}>
                      <Text size="xs" c="#E2E8F0">
                        {alb.date_display}
                      </Text>
                      <Badge size="xs" color="blue" radius="xl">
                        {alb.photos?.length || 12} Photos
                      </Badge>
                    </Group>
                  </Box>
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      {/* Membership Call to Action Banner */}
      <Container size="xl" mb={40}>
        <Box
          p={{ base: 'xl', md: 40 }}
          style={{
            borderRadius: 24,
            background: 'linear-gradient(135deg, #0B2545 0%, #0F2D59 60%, #1E40AF 100%)',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Grid align="center" gutter={32}>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <span
                style={{
                  color: '#93C5FD',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                BE A PART OF A BIGGER PURPOSE
              </span>
              <Title order={2} mt={8} mb="sm" style={{ color: '#FFFFFF', fontWeight: 800 }}>
                Join Vigyan Parishad Jammu & Kashmir
              </Title>
              <Text size="md" c="#BFDBFE" style={{ maxWidth: 620, lineHeight: 1.6 }}>
                Whether you are a scientist, educator, researcher, or passionate student, your contribution
                helps ignite scientific thinking and builds a brighter tomorrow for Jammu & Kashmir.
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} style={{ textAlign: 'right' }}>
              <Button
                component={Link}
                to="/membership"
                className="brand-gradient-btn"
                size="lg"
                radius="xl"
                rightSection={<IconArrowRight size={18} stroke={2.5} />}
                style={{
                  paddingLeft: 28,
                  paddingRight: 24,
                }}
              >
                Apply for Membership
              </Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
