import React, { useState } from 'react';
import {
  Title,
  Text,
  Button,
  Group,
  Stack,
  Card,
  Table,
  Badge,
  ActionIcon,
  Modal,
  TextInput,
  Textarea,
  Select,
  Switch,
  SimpleGrid,
  Box,
  Center,
  Loader,
  Menu,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconCalendar,
  IconMapPin,
  IconAlertCircle,
  IconCheck,
  IconExternalLink,
} from '@tabler/icons-react';
import { useAllEvents, useSaveEvent, useDeleteEvent } from '../../hooks/useAdminData';
import { notifications } from '@mantine/notifications';

const CATEGORY_OPTIONS = [
  'Seminar',
  'Workshop',
  'Exhibition',
  'Talk',
  'Outreach',
  'Observation',
  'Conference',
];

const DEFAULT_EVENT_FORM = {
  id: null,
  title: '',
  slug: '',
  category: 'Workshop',
  event_date: new Date().toISOString().split('T')[0],
  date_display: '',
  day_month: '',
  year: new Date().getFullYear().toString(),
  time: '10:00 AM - 04:00 PM',
  venue: 'University of Jammu, J&K',
  subtitle: 'Advancing scientific inquiry and innovation.',
  description: '',
  image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
  participants: '150+ Participants',
  organized_by: 'Vigyan Parishad J&K',
  is_featured: false,
};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function AdminEventsPage() {
  const { data: events = [], isLoading } = useAllEvents();
  const saveMutation = useSaveEvent();
  const deleteMutation = useDeleteEvent();

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

  const [formData, setFormData] = useState(DEFAULT_EVENT_FORM);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const handleOpenAdd = () => {
    setFormData(DEFAULT_EVENT_FORM);
    openModal();
  };

  const handleOpenEdit = (ev) => {
    setFormData({
      id: ev.id,
      title: ev.title || '',
      slug: ev.slug || '',
      category: ev.category || 'Workshop',
      event_date: ev.event_date ? ev.event_date.split('T')[0] : '',
      date_display: ev.date_display || '',
      day_month: ev.day_month || '',
      year: ev.year || new Date().getFullYear().toString(),
      time: ev.time || '10:00 AM - 04:00 PM',
      venue: ev.venue || '',
      subtitle: ev.subtitle || '',
      description: ev.description || '',
      image_url: ev.image_url || '',
      participants: ev.participants || '100+ Participants',
      organized_by: ev.organized_by || 'Vigyan Parishad J&K',
      is_featured: Boolean(ev.is_featured),
    });
    openModal();
  };

  const handleTitleChange = (val) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      // Auto-generate slug if it was empty or matching previous slug
      slug: prev.id ? prev.slug : slugify(val),
    }));
  };

  const handleDateChange = (val) => {
    if (!val) return;
    const d = new Date(val);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear().toString();

    setFormData((prev) => ({
      ...prev,
      event_date: val,
      year: year,
      day_month: `${day} ${month}`,
      date_display: `${month} ${day}, ${year}`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      notifications.show({ title: 'Validation Error', message: 'Event title is required.', color: 'red' });
      return;
    }
    if (!formData.slug.trim()) {
      formData.slug = slugify(formData.title);
    }
    if (!formData.date_display) {
      handleDateChange(formData.event_date);
    }

    try {
      await saveMutation.mutateAsync(formData);
      notifications.show({
        title: 'Success',
        message: formData.id ? 'Event updated successfully.' : 'New event published successfully.',
        color: 'green',
      });
      closeModal();
    } catch (err) {
      notifications.show({
        title: 'Error Saving Event',
        message: err.message || 'Failed to save event to database.',
        color: 'red',
      });
    }
  };

  const confirmDelete = (ev) => {
    setEventToDelete(ev);
    openDeleteModal();
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;
    try {
      await deleteMutation.mutateAsync(eventToDelete.id);
      notifications.show({
        title: 'Event Deleted',
        message: `"${eventToDelete.title}" has been removed.`,
        color: 'blue',
      });
      closeDeleteModal();
    } catch (err) {
      notifications.show({
        title: 'Delete Failed',
        message: err.message,
        color: 'red',
      });
    }
  };

  const filteredEvents = events.filter((ev) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      ev.title?.toLowerCase().includes(q) ||
      ev.venue?.toLowerCase().includes(q) ||
      ev.slug?.toLowerCase().includes(q);
    const matchesCat = categoryFilter === 'All' || ev.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <Box>
      {/* Top Header */}
      <Group justify="space-between" mb="lg" wrap="wrap" gap="md">
        <Stack gap={2}>
          <Group gap="xs">
            <span className="section-tag-dash">CONTENT MANAGEMENT</span>
          </Group>
          <Title order={2} fw={800} c="#0B2545">
            Events Directory
          </Title>
          <Text size="sm" c="#64748B">
            Create, update, or remove science seminars, workshops, and student congresses.
          </Text>
        </Stack>

        <Button
          className="brand-gradient-btn"
          radius="xl"
          size="md"
          leftSection={<IconPlus size={18} />}
          onClick={handleOpenAdd}
        >
          Add New Event
        </Button>
      </Group>

      {/* Filter and Search Bar */}
      <Card p="md" radius="lg" withBorder mb="lg" bg="#FFFFFF">
        <Group justify="space-between" wrap="wrap" gap="md">
          <TextInput
            placeholder="Search events by name, location..."
            leftSection={<IconSearch size={16} color="#64748B" />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            radius="xl"
            style={{ width: '100%', maxWidth: 360 }}
          />

          <Select
            placeholder="Category"
            data={['All', ...CATEGORY_OPTIONS]}
            value={categoryFilter}
            onChange={(val) => setCategoryFilter(val || 'All')}
            radius="xl"
            style={{ width: 180 }}
          />
        </Group>
      </Card>

      {/* Events Table */}
      <Card p="0" radius="lg" withBorder bg="#FFFFFF" style={{ overflow: 'hidden' }}>
        {isLoading ? (
          <Center p={60}>
            <Loader size="md" color="blue" />
          </Center>
        ) : filteredEvents.length === 0 ? (
          <Box p={60} style={{ textAlign: 'center' }}>
            <Text fw={600} size="md" c="#0B2545">
              No matching events found.
            </Text>
            <Text size="sm" c="#64748B" mt={4}>
              Try adjusting your search query or click "Add New Event".
            </Text>
          </Box>
        ) : (
          <Table highlightOnHover verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead style={{ backgroundColor: '#F8FAFC' }}>
              <Table.Tr>
                <Table.Th>Event</Table.Th>
                <Table.Th>Date & Time</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Featured</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredEvents.map((ev) => (
                <Table.Tr key={ev.id}>
                  <Table.Td>
                    <Group gap="sm" wrap="nowrap">
                      <img
                        src={ev.image_url}
                        alt=""
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 8,
                          objectFit: 'cover',
                          border: '1px solid #E2E8F0',
                        }}
                      />
                      <Box>
                        <Text fw={700} size="sm" c="#0B2545" lineClamp={1}>
                          {ev.title}
                        </Text>
                        <Group gap={6} mt={2}>
                          <IconMapPin size={12} color="#64748B" />
                          <Text size="xs" c="#64748B" lineClamp={1}>
                            {ev.venue}
                          </Text>
                        </Group>
                      </Box>
                    </Group>
                  </Table.Td>

                  <Table.Td>
                    <Badge variant="outline" color="blue" size="sm">
                      {ev.date_display || ev.event_date}
                    </Badge>
                    <Text size="11px" c="#64748B" mt={2}>
                      {ev.time}
                    </Text>
                  </Table.Td>

                  <Table.Td>
                    <Badge color="cyan" variant="light" size="sm">
                      {ev.category}
                    </Badge>
                  </Table.Td>

                  <Table.Td>
                    {ev.is_featured ? (
                      <Badge color="orange" variant="filled" size="xs">
                        FEATURED
                      </Badge>
                    ) : (
                      <Text size="xs" c="#94A3B8">
                        Standard
                      </Text>
                    )}
                  </Table.Td>

                  <Table.Td style={{ textAlign: 'right' }}>
                    <Group gap="xs" justify="flex-end">
                      <ActionIcon
                        component="a"
                        href={`/events/${ev.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        variant="subtle"
                        color="gray"
                        radius="md"
                        title="View Public Page"
                      >
                        <IconExternalLink size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        radius="md"
                        onClick={() => handleOpenEdit(ev)}
                        title="Edit Event"
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        radius="md"
                        onClick={() => confirmDelete(ev)}
                        title="Delete Event"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Card>

      {/* Add / Edit Event Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={
          <Text fw={700} size="lg" c="#0B2545">
            {formData.id ? 'Edit Event Details' : 'Publish New Event'}
          </Text>
        }
        size="lg"
        radius="lg"
        padding="xl"
      >
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Event Title"
              placeholder="e.g. State-level Science Model Competition 2026"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.currentTarget.value)}
              radius="md"
            />

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <TextInput
                label="URL Slug"
                placeholder="science-model-competition-2026"
                description="Unique identifier in address bar"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: slugify(e.currentTarget.value) })}
                radius="md"
              />

              <Select
                label="Category"
                data={CATEGORY_OPTIONS}
                required
                value={formData.category}
                onChange={(val) => setFormData({ ...formData, category: val || 'Workshop' })}
                radius="md"
              />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <TextInput
                label="Event Date"
                type="date"
                required
                value={formData.event_date}
                onChange={(e) => handleDateChange(e.currentTarget.value)}
                radius="md"
              />

              <TextInput
                label="Time Interval"
                placeholder="10:00 AM - 04:00 PM"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.currentTarget.value })}
                radius="md"
              />
            </SimpleGrid>

            <TextInput
              label="Venue / Location"
              placeholder="e.g. Brigadier Rajinder Singh Auditorium, University of Jammu"
              required
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.currentTarget.value })}
              radius="md"
            />

            <TextInput
              label="Short Catchline / Subtitle"
              placeholder="A brief 1-line summary"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.currentTarget.value })}
              radius="md"
            />

            <Textarea
              label="Detailed Description"
              placeholder="Comprehensive summary of event schedule, speakers, and topics..."
              minRows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.currentTarget.value })}
              radius="md"
            />

            <TextInput
              label="Cover Image URL"
              placeholder="https://... image address"
              required
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.currentTarget.value })}
              radius="md"
            />

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <TextInput
                label="Expected Participants"
                placeholder="200+ Students"
                value={formData.participants}
                onChange={(e) => setFormData({ ...formData, participants: e.currentTarget.value })}
                radius="md"
              />

              <TextInput
                label="Organizing Body"
                placeholder="Vigyan Parishad J&K"
                value={formData.organized_by}
                onChange={(e) => setFormData({ ...formData, organized_by: e.currentTarget.value })}
                radius="md"
              />
            </SimpleGrid>

            <Switch
              label="Highlight as Featured Event on Homepage"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.currentTarget.checked })}
              color="blue"
              size="md"
              mt="xs"
            />

            <Group justify="flex-end" mt="lg">
              <Button variant="default" radius="xl" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="brand-gradient-btn"
                radius="xl"
                loading={saveMutation.isPending}
              >
                {formData.id ? 'Save Changes' : 'Publish Event'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title={<Text fw={700} c="red">Confirm Deletion</Text>}
        size="sm"
        radius="lg"
      >
        <Stack gap="md">
          <Text size="sm">
            Are you sure you want to permanently delete event{' '}
            <Text span fw={700}>"{eventToDelete?.title}"</Text>? This action will update the live site immediately.
          </Text>

          <Group justify="flex-end" mt="md">
            <Button variant="default" radius="xl" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button
              color="red"
              radius="xl"
              onClick={handleDelete}
              loading={deleteMutation.isPending}
            >
              Delete Event
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
