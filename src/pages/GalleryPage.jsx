import React, { useState } from 'react';
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
  ActionIcon,
  Pagination,
} from '@mantine/core';
import {
  IconSearch,
  IconArrowRight,
  IconChevronRight,
  IconPhoto,
} from '@tabler/icons-react';
import { useGallery } from '../hooks/useGallery';

const CATEGORIES = ['All', 'Seminar', 'Exhibition', 'Outreach', 'Workshop', 'Program', 'Observation'];
const YEARS = ['All', '2026', '2025', '2024'];
const DATES = ['All', 'Latest', 'Past Year'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

export function GalleryPage() {
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [year, setYear] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: albums = [], isLoading } = useGallery({
    search: activeSearch,
    category,
    year,
    sortBy,
  });

  const handleSearchClick = () => {
    setActiveSearch(searchInput);
    setCurrentPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const totalPages = Math.ceil(albums.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAlbums = albums.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box>
      {/* Hero Banner matching 05-gallery-listing-and-detail.jpg */}
      <Container size="xl" mt="md" mb={36}>
        <Box
          className="hero-wavy-bg"
          p={{ base: 'lg', md: 'xl', lg: 36 }}
          style={{ position: 'relative', minHeight: 320 }}
        >
          <Grid align="center" gutter={{ base: 24, md: 36 }}>
            <Grid.Col span={{ base: 12, md: 6.5 }}>
              <Stack gap="xs" style={{ position: 'relative', zIndex: 1 }}>
                <Box>
                  <span className="section-tag-dash">GALLERY</span>
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
                    Moments in{' '}
                  </Text>
                  <Text component="span" c="#2563EB" inherit>
                    Motion
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
                  A glimpse of our events, programs and initiatives in pictures.
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
                  alt="Gallery Pavilion"
                  height={240}
                  fit="cover"
                  style={{ width: '100%' }}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>

      {/* Filter and Search Bar matching mockup */}
      <Container size="xl" mb={36}>
        <Box
          p="md"
          bg="#FFFFFF"
          style={{
            borderRadius: 20,
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          }}
        >
          <Grid gutter="xs" align="center">
            {/* Search Input */}
            <Grid.Col span={{ base: 12, md: 3.5 }}>
              <TextInput
                placeholder="Search gallery by event name..."
                leftSection={<IconSearch size={16} color="#64748B" />}
                value={searchInput}
                onChange={(e) => setSearchInput(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                radius="xl"
                styles={{
                  input: {
                    backgroundColor: '#F8FAFC',
                    borderColor: '#E2E8F0',
                  },
                }}
              />
            </Grid.Col>

            {/* Categories */}
            <Grid.Col span={{ base: 6, sm: 3, md: 2 }}>
              <Select
                placeholder="Category"
                data={CATEGORIES}
                value={category}
                onChange={(val) => {
                  setCategory(val || 'All');
                  setCurrentPage(1);
                }}
                radius="xl"
                styles={{
                  input: {
                    backgroundColor: '#F8FAFC',
                    borderColor: '#E2E8F0',
                  },
                }}
              />
            </Grid.Col>

            {/* Years */}
            <Grid.Col span={{ base: 6, sm: 3, md: 1.8 }}>
              <Select
                placeholder="Year"
                data={YEARS}
                value={year}
                onChange={(val) => {
                  setYear(val || 'All');
                  setCurrentPage(1);
                }}
                radius="xl"
                styles={{
                  input: {
                    backgroundColor: '#F8FAFC',
                    borderColor: '#E2E8F0',
                  },
                }}
              />
            </Grid.Col>

            {/* Dates */}
            <Grid.Col span={{ base: 6, sm: 3, md: 1.8 }}>
              <Select
                placeholder="Dates"
                data={DATES}
                value={dateFilter}
                onChange={(val) => setDateFilter(val || 'All')}
                radius="xl"
                styles={{
                  input: {
                    backgroundColor: '#F8FAFC',
                    borderColor: '#E2E8F0',
                  },
                }}
              />
            </Grid.Col>

            {/* Sort */}
            <Grid.Col span={{ base: 6, sm: 3, md: 1.7 }}>
              <Select
                placeholder="Sort By"
                data={SORT_OPTIONS}
                value={sortBy}
                onChange={(val) => setSortBy(val || 'newest')}
                radius="xl"
                styles={{
                  input: {
                    backgroundColor: '#F8FAFC',
                    borderColor: '#E2E8F0',
                  },
                }}
              />
            </Grid.Col>

            {/* Search Button */}
            <Grid.Col span={{ base: 12, md: 1.2 }}>
              <Button
                fullWidth
                className="brand-gradient-btn"
                radius="xl"
                onClick={handleSearchClick}
              >
                Search
              </Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>

      {/* Album Grid */}
      <Container size="xl" mb={48}>
        {paginatedAlbums.length === 0 ? (
          <Box p={40} style={{ textAlign: 'center' }}>
            <Text fw={600} size="lg" c="#0B2545" mb="xs">
              No photo albums found.
            </Text>
            <Text size="sm" c="#64748B" mb="md">
              Try adjusting your search criteria.
            </Text>
            <Button
              variant="outline"
              color="blue"
              radius="xl"
              onClick={() => {
                setSearchInput('');
                setActiveSearch('');
                setCategory('All');
                setYear('All');
              }}
            >
              Reset Filters
            </Button>
          </Box>
        ) : (
          <Grid gutter="xl">
            {paginatedAlbums.map((album) => (
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={album.id}>
                <Card
                  padding="0"
                  radius="lg"
                  withBorder
                  className="hover-lift"
                  style={{
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                  }}
                >
                  <Box style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
                    <Image
                      src={album.cover_image}
                      alt={album.title}
                      height={210}
                      fit="cover"
                      fallbackSrc="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
                    />
                  </Box>

                  <Box p="lg" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Text
                      size="xs"
                      fw={700}
                      c="#EF4444"
                      tt="uppercase"
                      mb={6}
                      style={{ letterSpacing: '0.08em' }}
                    >
                      — {album.category}
                    </Text>

                    <Text
                      fw={700}
                      size="md"
                      c="#0B2545"
                      lineClamp={1}
                      mb="xs"
                      component={Link}
                      to={`/gallery/${album.slug || album.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      {album.title}
                    </Text>

                    <Text size="xs" c="#64748B" mb="md">
                      {album.date_display}
                    </Text>

                    <Group justify="space-between" align="center" mt="auto">
                      <Text size="xs" c="#64748B">
                        {album.photos?.length || 12} Photos
                      </Text>

                      <ActionIcon
                        component={Link}
                        to={`/gallery/${album.slug || album.id}`}
                        radius="xl"
                        size={36}
                        variant="light"
                        color="blue"
                        aria-label="View Album"
                        style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}
                      >
                        <IconChevronRight size={16} />
                      </ActionIcon>
                    </Group>
                  </Box>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Group justify="center" mt={40}>
            <Pagination
              value={currentPage}
              onChange={setCurrentPage}
              total={totalPages}
              radius="xl"
              styles={{
                control: {
                  '&[data-active]': {
                    background: 'linear-gradient(90deg, #F04336 0%, #2563EB 100%)',
                    borderColor: 'transparent',
                    color: '#FFFFFF',
                  },
                },
              }}
            />
          </Group>
        )}
      </Container>
    </Box>
  );
}
