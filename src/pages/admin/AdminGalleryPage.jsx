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
  Drawer,
  TextInput,
  Textarea,
  Select,
  SimpleGrid,
  Box,
  Center,
  Loader,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconPhoto,
  IconSearch,
  IconExternalLink,
  IconUpload,
} from '@tabler/icons-react';
import {
  useAllAlbums,
  useSaveAlbum,
  useDeleteAlbum,
  useAlbumPhotos,
  useAddPhoto,
  useDeletePhoto,
} from '../../hooks/useAdminData';
import { notifications } from '@mantine/notifications';

const CATEGORY_OPTIONS = [
  'Seminar',
  'Exhibition',
  'Outreach',
  'Workshop',
  'Program',
  'Observation',
];

const DEFAULT_ALBUM_FORM = {
  id: null,
  title: '',
  slug: '',
  category: 'Workshop',
  event_date: new Date().toISOString().split('T')[0],
  date_display: '',
  venue: 'Jammu & Kashmir',
  participant_count: '150+ Attendees',
  description: '',
  cover_image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
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

export function AdminGalleryPage() {
  const { data: albums = [], isLoading } = useAllAlbums();
  const saveAlbumMutation = useSaveAlbum();
  const deleteAlbumMutation = useDeleteAlbum();

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [photosDrawerOpened, { open: openPhotosDrawer, close: closePhotosDrawer }] = useDisclosure(false);

  const [formData, setFormData] = useState(DEFAULT_ALBUM_FORM);
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [selectedAlbumForPhotos, setSelectedAlbumForPhotos] = useState(null);
  const [search, setSearch] = useState('');

  // Selected album photos query
  const { data: currentPhotos = [], isLoading: loadingPhotos } = useAlbumPhotos(selectedAlbumForPhotos?.id);
  const addPhotoMutation = useAddPhoto();
  const deletePhotoMutation = useDeletePhoto();

  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');

  const handleOpenAdd = () => {
    setFormData(DEFAULT_ALBUM_FORM);
    openModal();
  };

  const handleOpenEdit = (alb) => {
    setFormData({
      id: alb.id,
      title: alb.title || '',
      slug: alb.slug || '',
      category: alb.category || 'Workshop',
      event_date: alb.event_date ? alb.event_date.split('T')[0] : '',
      date_display: alb.date_display || '',
      venue: alb.venue || '',
      participant_count: alb.participant_count || '100+ Attendees',
      description: alb.description || '',
      cover_image: alb.cover_image || '',
    });
    openModal();
  };

  const handleDateChange = (val) => {
    if (!val) return;
    const d = new Date(val);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear().toString();
    setFormData((prev) => ({
      ...prev,
      event_date: val,
      date_display: `${month} ${year}`,
    }));
  };

  const handleSubmitAlbum = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      notifications.show({ title: 'Validation Error', message: 'Album title is required.', color: 'red' });
      return;
    }
    if (!formData.slug.trim()) {
      formData.slug = slugify(formData.title);
    }
    if (!formData.date_display) {
      handleDateChange(formData.event_date);
    }

    try {
      await saveAlbumMutation.mutateAsync(formData);
      notifications.show({
        title: 'Success',
        message: formData.id ? 'Album updated successfully.' : 'New album created.',
        color: 'green',
      });
      closeModal();
    } catch (err) {
      notifications.show({
        title: 'Save Failed',
        message: err.message,
        color: 'red',
      });
    }
  };

  const confirmDeleteAlbum = (alb) => {
    setAlbumToDelete(alb);
    openDeleteModal();
  };

  const handleDeleteAlbum = async () => {
    if (!albumToDelete) return;
    try {
      await deleteAlbumMutation.mutateAsync(albumToDelete.id);
      notifications.show({
        title: 'Album Deleted',
        message: `"${albumToDelete.title}" and its photos have been removed.`,
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

  const handleOpenPhotoManager = (alb) => {
    setSelectedAlbumForPhotos(alb);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    openPhotosDrawer();
  };

  const handleAddPhotoSubmit = async (e) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) return;

    try {
      await addPhotoMutation.mutateAsync({
        album_id: selectedAlbumForPhotos.id,
        photo_url: newPhotoUrl.trim(),
        caption: newPhotoCaption.trim() || selectedAlbumForPhotos.title,
        display_order: currentPhotos.length + 1,
      });
      notifications.show({
        title: 'Photo Added',
        message: 'New photo successfully attached to album.',
        color: 'green',
      });
      setNewPhotoUrl('');
      setNewPhotoCaption('');
    } catch (err) {
      notifications.show({
        title: 'Failed to Add Photo',
        message: err.message,
        color: 'red',
      });
    }
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      await deletePhotoMutation.mutateAsync({
        photoId,
        albumId: selectedAlbumForPhotos.id,
      });
      notifications.show({
        title: 'Photo Removed',
        message: 'Photo deleted from album.',
        color: 'blue',
      });
    } catch (err) {
      notifications.show({
        title: 'Delete Failed',
        message: err.message,
        color: 'red',
      });
    }
  };

  const filteredAlbums = albums.filter((alb) => {
    const q = search.toLowerCase();
    return !q || alb.title?.toLowerCase().includes(q) || alb.venue?.toLowerCase().includes(q);
  });

  return (
    <Box>
      {/* Header */}
      <Group justify="space-between" mb="lg" wrap="wrap" gap="md">
        <Stack gap={2}>
          <Group gap="xs">
            <span className="section-tag-dash">MEDIA & ARCHIVES</span>
          </Group>
          <Title order={2} fw={800} c="#0B2545">
            Gallery Albums & Photos
          </Title>
          <Text size="sm" c="#64748B">
            Create photo albums, upload high-resolution event moments, and organize captions.
          </Text>
        </Stack>

        <Button
          className="brand-gradient-btn"
          radius="xl"
          size="md"
          leftSection={<IconPlus size={18} />}
          onClick={handleOpenAdd}
        >
          Create Album
        </Button>
      </Group>

      {/* Filter and Search Bar */}
      <Card p="md" radius="lg" withBorder mb="lg" bg="#FFFFFF">
        <TextInput
          placeholder="Search albums by title, venue..."
          leftSection={<IconSearch size={16} color="#64748B" />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          radius="xl"
          style={{ width: '100%', maxWidth: 360 }}
        />
      </Card>

      {/* Albums Table */}
      <Card p="0" radius="lg" withBorder bg="#FFFFFF" style={{ overflow: 'hidden' }}>
        {isLoading ? (
          <Center p={60}>
            <Loader size="md" color="blue" />
          </Center>
        ) : filteredAlbums.length === 0 ? (
          <Box p={60} style={{ textAlign: 'center' }}>
            <Text fw={600} size="md" c="#0B2545">
              No albums created yet.
            </Text>
            <Text size="sm" c="#64748B" mt={4}>
              Click "Create Album" to organize event photos.
            </Text>
          </Box>
        ) : (
          <Table highlightOnHover verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead style={{ backgroundColor: '#F8FAFC' }}>
              <Table.Tr>
                <Table.Th>Album Title</Table.Th>
                <Table.Th>Category & Date</Table.Th>
                <Table.Th>Venue</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredAlbums.map((alb) => (
                <Table.Tr key={alb.id}>
                  <Table.Td>
                    <Group gap="sm" wrap="nowrap">
                      <img
                        src={alb.cover_image}
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
                          {alb.title}
                        </Text>
                        <Button
                          variant="subtle"
                          size="compact-xs"
                          color="blue"
                          leftSection={<IconPhoto size={13} />}
                          onClick={() => handleOpenPhotoManager(alb)}
                          mt={2}
                        >
                          Manage Photos
                        </Button>
                      </Box>
                    </Group>
                  </Table.Td>

                  <Table.Td>
                    <Badge color="cyan" variant="light" size="sm">
                      {alb.category}
                    </Badge>
                    <Text size="11px" c="#64748B" mt={2}>
                      {alb.date_display || alb.event_date}
                    </Text>
                  </Table.Td>

                  <Table.Td>
                    <Text size="xs" c="#64748B" lineClamp={1}>
                      {alb.venue}
                    </Text>
                    <Text size="10px" c="#94A3B8">
                      {alb.participant_count}
                    </Text>
                  </Table.Td>

                  <Table.Td style={{ textAlign: 'right' }}>
                    <Group gap="xs" justify="flex-end">
                      <ActionIcon
                        component="a"
                        href={`/gallery/${alb.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        variant="subtle"
                        color="gray"
                        radius="md"
                        title="View Public Album"
                      >
                        <IconExternalLink size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        radius="md"
                        onClick={() => handleOpenEdit(alb)}
                        title="Edit Album Details"
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        radius="md"
                        onClick={() => confirmDeleteAlbum(alb)}
                        title="Delete Album"
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

      {/* Add / Edit Album Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={
          <Text fw={700} size="lg" c="#0B2545">
            {formData.id ? 'Edit Album' : 'Create Photo Album'}
          </Text>
        }
        size="lg"
        radius="lg"
        padding="xl"
      >
        <form onSubmit={handleSubmitAlbum}>
          <Stack gap="md">
            <TextInput
              label="Album Title"
              placeholder="e.g. National Science Day Celebration 2026"
              required
              value={formData.title}
              onChange={(e) => {
                const val = e.currentTarget.value;
                setFormData((prev) => ({
                  ...prev,
                  title: val,
                  slug: prev.id ? prev.slug : slugify(val),
                }));
              }}
              radius="md"
            />

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <TextInput
                label="URL Slug"
                placeholder="national-science-day-2026"
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
                label="Venue"
                placeholder="Jammu & Kashmir"
                required
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.currentTarget.value })}
                radius="md"
              />
            </SimpleGrid>

            <TextInput
              label="Cover Image URL"
              placeholder="https://... cover photo address"
              required
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.currentTarget.value })}
              radius="md"
            />

            <Textarea
              label="Album Description"
              placeholder="Overview of the event, activities, and audience..."
              minRows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.currentTarget.value })}
              radius="md"
            />

            <Group justify="flex-end" mt="lg">
              <Button variant="default" radius="xl" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="brand-gradient-btn"
                radius="xl"
                loading={saveAlbumMutation.isPending}
              >
                {formData.id ? 'Save Changes' : 'Create Album'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* Photos Manager Drawer */}
      <Drawer
        opened={photosDrawerOpened}
        onClose={closePhotosDrawer}
        position="right"
        size="xl"
        title={
          <Box>
            <Text fw={700} size="md" c="#0B2545">
              Photos in "{selectedAlbumForPhotos?.title}"
            </Text>
            <Text size="xs" c="#64748B">
              Add photos or remove images from this album.
            </Text>
          </Box>
        }
      >
        <Stack gap="lg">
          {/* Quick Add Photo Card */}
          <Card p="md" radius="md" withBorder bg="#F8FAFC">
            <Text fw={700} size="sm" c="#0B2545" mb="xs">
              Add Photo to Album
            </Text>
            <form onSubmit={handleAddPhotoSubmit}>
              <Stack gap="xs">
                <TextInput
                  placeholder="https://... image URL address"
                  label="Photo Web URL"
                  required
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.currentTarget.value)}
                  radius="md"
                />
                <TextInput
                  placeholder="e.g. Keynote address by Chief Guest"
                  label="Caption (Optional)"
                  value={newPhotoCaption}
                  onChange={(e) => setNewPhotoCaption(e.currentTarget.value)}
                  radius="md"
                />
                <Button
                  type="submit"
                  size="sm"
                  radius="xl"
                  color="blue"
                  leftSection={<IconUpload size={14} />}
                  loading={addPhotoMutation.isPending}
                  mt={4}
                >
                  Upload Photo Link
                </Button>
              </Stack>
            </form>
          </Card>

          {/* Photos Grid */}
          <Box>
            <Text fw={700} size="sm" c="#0B2545" mb="sm">
              Existing Album Photos ({currentPhotos.length})
            </Text>

            {loadingPhotos ? (
              <Center p="xl">
                <Loader size="sm" />
              </Center>
            ) : currentPhotos.length === 0 ? (
              <Text size="sm" c="#64748B" p="md" ta="center">
                No photos in this album yet. Add one above!
              </Text>
            ) : (
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                {currentPhotos.map((photo) => (
                  <Card key={photo.id} p="xs" radius="md" withBorder bg="#FFFFFF">
                    <Box style={{ position: 'relative', height: 130, overflow: 'hidden', borderRadius: 6 }}>
                      <img
                        src={photo.photo_url}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <ActionIcon
                        color="red"
                        variant="filled"
                        size="sm"
                        radius="xl"
                        style={{ position: 'absolute', top: 6, right: 6 }}
                        onClick={() => handleDeletePhoto(photo.id)}
                        title="Delete photo"
                      >
                        <IconTrash size={12} />
                      </ActionIcon>
                    </Box>
                    <Text size="xs" c="#1E293B" lineClamp={1} mt={6} fw={600}>
                      {photo.caption || 'Event photograph'}
                    </Text>
                  </Card>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </Stack>
      </Drawer>

      {/* Delete Album Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title={<Text fw={700} c="red">Delete Album</Text>}
        size="sm"
        radius="lg"
      >
        <Stack gap="md">
          <Text size="sm">
            Are you sure you want to permanently delete{' '}
            <Text span fw={700}>"{albumToDelete?.title}"</Text>? All associated photos in this album will also be removed.
          </Text>

          <Group justify="flex-end" mt="md">
            <Button variant="default" radius="xl" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button
              color="red"
              radius="xl"
              onClick={handleDeleteAlbum}
              loading={deleteAlbumMutation.isPending}
            >
              Delete Album
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
