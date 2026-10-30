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
  ActionIcon,
  Badge,
  SimpleGrid,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconCalendar,
  IconMapPin,
  IconUsers,
  IconDownload,
  IconChevronLeft,
  IconChevronRight,
  IconPhoto,
} from '@tabler/icons-react';
import { BreadcrumbsNav } from '../components/common/BreadcrumbsNav';
import { useAlbumDetail } from '../hooks/useGallery';

export function GalleryDetailPage() {
  const { slug } = useParams();
  const { data: album, isLoading } = useAlbumDetail(slug);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (!album && !isLoading) {
    return (
      <Container size="xl" py={60} style={{ textAlign: 'center' }}>
        <Title order={2} c="#0B2545">Album Not Found</Title>
        <Text size="sm" c="#64748B" mt="sm">The photo album could not be loaded.</Text>
        <Button component={Link} to="/gallery" mt="md" radius="xl" className="brand-gradient-btn">
          Back to Gallery
        </Button>
      </Container>
    );
  }

  const photos = album?.photos || [
    { id: 'p1', url: album?.cover_image, caption: 'Conference highlight' },
  ];

  const currentPhoto = photos[activePhotoIndex] || photos[0];

  const handlePrev = () => {
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setActivePhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handleDownloadAll = () => {
    notifications.show({
      title: 'Preparing Download',
      message: `Packaging ${photos.length} high-resolution photographs into a zip archive...`,
      color: 'blue',
      icon: <IconDownload size={18} />,
    });
  };

  return (
    <Box>
      <Container size="xl" pt="xs" pb="sm">
        <BreadcrumbsNav
          items={[
            { title: 'Gallery', href: '/gallery' },
            { title: album?.title || 'Album Detail' },
          ]}
        />
      </Container>

      {/* Main Top Section: Left Lightbox Slider + Right Details matching 05 mockup */}
      <Container size="xl" mb={48}>
        <Grid gutter={36} align="flex-start">
          {/* Left Column: Main Photo & Thumbnail Strip */}
          <Grid.Col span={{ base: 12, md: 7.5 }}>
            <Stack gap="sm">
              {/* Main Photo Box */}
              <Box
                style={{
                  position: 'relative',
                  borderRadius: 20,
                  overflow: 'hidden',
                  backgroundColor: '#000000',
                  aspectRatio: '16/10',
                  boxShadow: '0 12px 30px rgba(11, 37, 69, 0.15)',
                }}
              >
                <Image
                  src={currentPhoto?.url}
                  alt={currentPhoto?.caption || album?.title}
                  fit="cover"
                  style={{ width: '100%', height: '100%' }}
                />

                {/* Left & Right Arrow Navigation */}
                <ActionIcon
                  onClick={handlePrev}
                  radius="xl"
                  size={42}
                  variant="white"
                  style={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                    opacity: 0.9,
                  }}
                  aria-label="Previous photo"
                >
                  <IconChevronLeft size={22} color="#0B2545" />
                </ActionIcon>

                <ActionIcon
                  onClick={handleNext}
                  radius="xl"
                  size={42}
                  variant="white"
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                    opacity: 0.9,
                  }}
                  aria-label="Next photo"
                >
                  <IconChevronRight size={22} color="#0B2545" />
                </ActionIcon>

                {/* Counter Pill (e.g. 1 / 12) */}
                <Box
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    backgroundColor: 'rgba(11, 37, 69, 0.75)',
                    backdropFilter: 'blur(6px)',
                    color: '#FFFFFF',
                    borderRadius: 9999,
                    padding: '4px 14px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                  }}
                >
                  {activePhotoIndex + 1} / {photos.length}
                </Box>
              </Box>

              {/* Caption if present */}
              {currentPhoto?.caption && (
                <Text size="sm" c="#64748B" ta="center" italic>
                  {currentPhoto.caption}
                </Text>
              )}

              {/* Thumbnail Strip with Controls */}
              <Group gap="xs" justify="center" wrap="nowrap" mt="xs">
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="sm"
                  radius="xl"
                  onClick={handlePrev}
                >
                  <IconChevronLeft size={16} />
                </ActionIcon>

                <Box
                  style={{
                    display: 'flex',
                    gap: 8,
                    overflowX: 'auto',
                    padding: '4px 2px',
                    maxWidth: '100%',
                  }}
                >
                  {photos.map((photo, idx) => (
                    <Box
                      key={photo.id || idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      style={{
                        width: 70,
                        height: 48,
                        borderRadius: 8,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        flexShrink: 0,
                        border:
                          activePhotoIndex === idx
                            ? '3px solid #2563EB'
                            : '2px solid transparent',
                        opacity: activePhotoIndex === idx ? 1 : 0.65,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Image
                        src={photo.url}
                        alt="Thumbnail"
                        height={48}
                        fit="cover"
                      />
                    </Box>
                  ))}
                </Box>

                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="sm"
                  radius="xl"
                  onClick={handleNext}
                >
                  <IconChevronRight size={16} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Right Column: Album Details & Download Button */}
          <Grid.Col span={{ base: 12, md: 4.5 }}>
            <Stack gap="lg" pt={{ base: 'md', md: 'xl' }}>
              <Box>
                <Text
                  size="xs"
                  fw={700}
                  c="#EF4444"
                  tt="uppercase"
                  style={{ letterSpacing: '0.1em' }}
                >
                  — {album?.category || 'SEMINAR'}
                </Text>

                <Title
                  order={1}
                  mt={4}
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: '#0B2545',
                    lineHeight: 1.2,
                  }}
                >
                  {album?.title}
                </Title>
              </Box>

              <Stack gap="sm">
                <Group gap={10}>
                  <IconCalendar size={18} color="#2563EB" />
                  <Text size="sm" fw={600} c="#0B2545">
                    {album?.date_display || '22 November 2026'}
                  </Text>
                </Group>

                <Group gap={10}>
                  <IconMapPin size={18} color="#2563EB" />
                  <Text size="sm" fw={600} c="#0B2545">
                    {album?.venue || 'University of Jammu, J&K'}
                  </Text>
                </Group>

                <Group gap={10}>
                  <IconUsers size={18} color="#2563EB" />
                  <Text size="sm" fw={600} c="#0B2545">
                    {album?.participant_count || '120+ Participants'}
                  </Text>
                </Group>
              </Stack>

              <Text size="sm" c="#475569" style={{ lineHeight: 1.65 }}>
                {album?.description ||
                  'A national seminar bringing together researchers, educators and students to discuss innovations and the future of science.'}
              </Text>

              <Button
                variant="light"
                color="blue"
                radius="xl"
                size="md"
                leftSection={<IconDownload size={18} />}
                onClick={handleDownloadAll}
                style={{
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  fontWeight: 600,
                }}
              >
                Download All Photos
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Full Photo Grid (5 columns matching mockup) */}
      <Container size="xl" mb={60}>
        <Box mb="lg">
          <span className="section-tag-dash">Event Gallery</span>
        </Box>

        <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="md">
          {photos.map((photo, idx) => (
            <Card
              key={photo.id || idx}
              padding="0"
              radius="md"
              withBorder
              className="hover-lift"
              onClick={() => {
                setActivePhotoIndex(idx);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              style={{
                cursor: 'pointer',
                overflow: 'hidden',
                aspectRatio: '4/3',
                border: activePhotoIndex === idx ? '2px solid #2563EB' : '1px solid #E2E8F0',
              }}
            >
              <Image
                src={photo.url}
                alt={photo.caption || `Photo ${idx + 1}`}
                fit="cover"
                style={{ width: '100%', height: '100%' }}
              />
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
