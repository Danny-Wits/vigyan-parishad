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
  Badge,
} from '@mantine/core';
import {
  IconSearch,
  IconArrowRight,
  IconChevronRight,
  IconFileText,
  IconDownload,
  IconEye,
} from '@tabler/icons-react';
import { usePublications } from '../hooks/usePublications';

const CATEGORIES = [
  'All',
  'Research Paper',
  'Report',
  'Proceedings',
  'Newsletter',
  'Article',
  'Presentation',
];

const YEARS = ['All', '2024', '2023', '2022'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

const CATEGORY_COLORS = {
  'RESEARCH PAPER': '#2563EB',
  'REPORT': '#059669',
  'PROCEEDINGS': '#7C3AED',
  'NEWSLETTER': '#EA580C',
  'ARTICLE': '#DC2626',
  'PRESENTATION': '#0D9488',
};

export function PublicationsPage() {
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [year, setYear] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: publications = [], isLoading } = usePublications({
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

  const totalPages = Math.ceil(publications.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPublications = publications.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box>
      {/* Hero Banner matching 04-publications-listing-and-detail.jpg */}
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
                  <span className="section-tag-dash">PUBLICATIONS</span>
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
                    Our{' '}
                  </Text>
                  <Text component="span" c="#2563EB" inherit>
                    Publications
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
                  Research papers, reports and other resources to advance science and society.
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
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                  alt="Himalayan Mountain Range"
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
            <Grid.Col span={{ base: 12, md: 4.5 }}>
              <TextInput
                placeholder="Search publications by title, author..."
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
            <Grid.Col span={{ base: 6, sm: 3, md: 2.5 }}>
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
            <Grid.Col span={{ base: 6, sm: 3, md: 2 }}>
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

            {/* Sort */}
            <Grid.Col span={{ base: 6, sm: 3, md: 1.8 }}>
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
            <Grid.Col span={{ base: 6, sm: 3, md: 1.2 }}>
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

      {/* Publications Grid */}
      <Container size="xl" mb={48}>
        {paginatedPublications.length === 0 ? (
          <Box p={40} style={{ textAlign: 'center' }}>
            <Text fw={600} size="lg" c="#0B2545" mb="xs">
              No publications found.
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
            {paginatedPublications.map((pub) => {
              const badgeColor = CATEGORY_COLORS[pub.category.toUpperCase()] || '#2563EB';

              return (
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={pub.id}>
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
                    {/* Header Image with Category Pill Tag */}
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
                          backgroundColor: badgeColor,
                          color: '#FFFFFF',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          fontSize: '0.6875rem',
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}
                      >
                        {pub.category}
                      </Badge>
                    </Box>

                    {/* Card Content */}
                    <Box p="lg" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Text
                        fw={700}
                        size="md"
                        c="#0B2545"
                        lineClamp={2}
                        mb={4}
                        component={Link}
                        to={`/publications/${pub.slug || pub.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {pub.title}
                      </Text>

                      <Text size="xs" c="#64748B" mb="sm">
                        {pub.date_display}
                      </Text>

                      <Group justify="space-between" align="center" mt="auto">
                        <Text size="xs" c="#64748B">
                          By {pub.author}
                        </Text>

                        <ActionIcon
                          component={Link}
                          to={`/publications/${pub.slug || pub.id}`}
                          radius="xl"
                          size={36}
                          variant="light"
                          color="blue"
                          aria-label="View Publication"
                          style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}
                        >
                          <IconChevronRight size={16} />
                        </ActionIcon>
                      </Group>
                    </Box>
                  </Card>
                </Grid.Col>
              );
            })}
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
