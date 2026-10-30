import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  IconCalendar,
  IconMapPin,
  IconFilter,
  IconAdjustmentsHorizontal,
  IconClock,
} from '@tabler/icons-react';
import { useEvents } from '../hooks/useEvents';

const CATEGORIES = [
  { value: 'All', label: 'All Categories' },
  { value: 'Seminar', label: 'Seminar' },
  { value: 'Workshop', label: 'Workshop' },
  { value: 'Exhibition', label: 'Exhibition' },
  { value: 'Talk', label: 'Talk' },
  { value: 'Outreach', label: 'Outreach' },
  { value: 'Observation', label: 'Observation' },
];
const YEARS = [
  { value: 'All', label: 'All Years' },
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
];
const DATES = [
  { value: 'All', label: 'All Dates' },
  { value: 'Upcoming', label: 'Upcoming' },
  { value: 'This Year', label: 'This Year' },
  { value: 'Past Events', label: 'Past Events' },
];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

export function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(urlSearch);
  const [activeSearch, setActiveSearch] = useState(urlSearch);
  const [category, setCategory] = useState('All');
  const [year, setYear] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (urlSearch) {
      setSearchInput(urlSearch);
      setActiveSearch(urlSearch);
    }
  }, [urlSearch]);

  const { data: events = [], isLoading } = useEvents({
    search: activeSearch,
    category,
    year,
    sortBy,
  });

  const handleSearchClick = () => {
    setActiveSearch(searchInput);
    setCurrentPage(1);
    if (searchInput) {
      setSearchParams({ search: searchInput });
    } else {
      setSearchParams({});
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  // Pagination calculation
  const totalPages = Math.ceil(events.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = events.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box>
      {/* Hero Banner matching 03-events-listing-and-detail.jpg */}
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
                  <span className="section-tag-dash">EVENTS</span>
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
                    Events
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
                  Seminars, workshops and initiatives to promote science and innovation.
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
                  alt="Events Pavilion"
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
          <Grid gutter="xs" align="flex-end">
            {/* Search Input */}
            <Grid.Col span={{ base: 12, md: 3.5 }}>
              <TextInput
                label="Search Events"
                labelProps={{ style: { fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: 4 } }}
                placeholder="Search events by name..."
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
                label="Category"
                labelProps={{ style: { fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: 4 } }}
                leftSection={<IconFilter size={15} color="#2563EB" />}
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
                label="Year"
                labelProps={{ style: { fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: 4 } }}
                leftSection={<IconCalendar size={15} color="#2563EB" />}
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
                label="Date Range"
                labelProps={{ style: { fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: 4 } }}
                leftSection={<IconClock size={15} color="#2563EB" />}
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
                label="Sort By"
                labelProps={{ style: { fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: 4 } }}
                leftSection={<IconAdjustmentsHorizontal size={15} color="#2563EB" />}
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

      {/* Events Grid */}
      <Container size="xl" mb={48}>
        {paginatedEvents.length === 0 ? (
          <Box p={40} style={{ textAlign: 'center' }}>
            <Text fw={600} size="lg" c="#0B2545" mb="xs">
              No events found matching your criteria.
            </Text>
            <Text size="sm" c="#64748B" mb="md">
              Try adjusting your search terms or filters.
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
                setSearchParams({});
              }}
            >
              Reset Filters
            </Button>
          </Box>
        ) : (
          <Grid gutter="xl">
            {paginatedEvents.map((item) => (
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={item.id}>
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
                  {/* Photo with Day/Month Badge */}
                  <Box style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      height={210}
                      fit="cover"
                      fallbackSrc="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
                    />

                    {/* Date badge */}
                    <Box
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 12,
                        padding: '6px 12px',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                        textAlign: 'center',
                        lineHeight: 1.1,
                        minWidth: 54,
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

                  {/* Body Content */}
                  <Box p="lg" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                        <Text size="xs" c="#64748B" truncate style={{ maxWidth: 180 }}>
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
                        aria-label="View Event Details"
                        style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}
                      >
                        <IconArrowRight size={16} />
                      </ActionIcon>
                    </Group>
                  </Box>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}

        {/* Pagination matching reference */}
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
