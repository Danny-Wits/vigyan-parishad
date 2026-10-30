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
  Switch,
  NumberInput,
  Box,
  Center,
  Loader,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSpeakerphone,
  IconExternalLink,
} from '@tabler/icons-react';
import { useAllAnnouncements, useSaveAnnouncement, useDeleteAnnouncement } from '../../hooks/useAdminData';
import { notifications } from '@mantine/notifications';

const DEFAULT_ANN_FORM = {
  id: null,
  title: '',
  date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  link: '',
  is_active: true,
  display_order: 1,
};

export function AdminAnnouncementsPage() {
  const { data: announcements = [], isLoading } = useAllAnnouncements();
  const saveMutation = useSaveAnnouncement();
  const deleteMutation = useDeleteAnnouncement();

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

  const [formData, setFormData] = useState(DEFAULT_ANN_FORM);
  const [annToDelete, setAnnToDelete] = useState(null);

  const handleOpenAdd = () => {
    setFormData({
      ...DEFAULT_ANN_FORM,
      display_order: announcements.length + 1,
    });
    openModal();
  };

  const handleOpenEdit = (ann) => {
    setFormData({
      id: ann.id,
      title: ann.title || '',
      date: ann.date || '',
      link: ann.link || '',
      is_active: Boolean(ann.is_active),
      display_order: ann.display_order ?? 1,
    });
    openModal();
  };

  const handleToggleActive = async (ann) => {
    try {
      await saveMutation.mutateAsync({
        id: ann.id,
        is_active: !ann.is_active,
      });
      notifications.show({
        title: 'Ticker Updated',
        message: `Announcement is now ${!ann.is_active ? 'LIVE on ticker' : 'hidden'}.`,
        color: !ann.is_active ? 'green' : 'gray',
      });
    } catch (err) {
      notifications.show({
        title: 'Update Failed',
        message: err.message,
        color: 'red',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      notifications.show({ title: 'Validation Error', message: 'Announcement text is required.', color: 'red' });
      return;
    }

    try {
      await saveMutation.mutateAsync(formData);
      notifications.show({
        title: 'Success',
        message: formData.id ? 'Announcement updated.' : 'Announcement added to ticker.',
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

  const confirmDelete = (ann) => {
    setAnnToDelete(ann);
    openDeleteModal();
  };

  const handleDelete = async () => {
    if (!annToDelete) return;
    try {
      await deleteMutation.mutateAsync(annToDelete.id);
      notifications.show({
        title: 'Deleted',
        message: 'Announcement removed from ticker.',
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

  return (
    <Box>
      {/* Header */}
      <Group justify="space-between" mb="lg" wrap="wrap" gap="md">
        <Stack gap={2}>
          <Group gap="xs">
            <span className="section-tag-dash">LIVE MARQUEE TICKER</span>
          </Group>
          <Title order={2} fw={800} c="#0B2545">
            Website Announcements
          </Title>
          <Text size="sm" c="#64748B">
            Control the real-time scrolling announcement ticker that appears right under the navigation bar.
          </Text>
        </Stack>

        <Button
          className="brand-gradient-btn"
          radius="xl"
          size="md"
          leftSection={<IconPlus size={18} />}
          onClick={handleOpenAdd}
        >
          Add Ticker Alert
        </Button>
      </Group>

      {/* Announcements Table */}
      <Card p="0" radius="lg" withBorder bg="#FFFFFF" style={{ overflow: 'hidden' }}>
        {isLoading ? (
          <Center p={60}>
            <Loader size="md" color="blue" />
          </Center>
        ) : announcements.length === 0 ? (
          <Box p={60} style={{ textAlign: 'center' }}>
            <Text fw={600} size="md" c="#0B2545">
              No ticker alerts configured.
            </Text>
            <Text size="sm" c="#64748B" mt={4}>
              Click "Add Ticker Alert" to show real-time notices on the website.
            </Text>
          </Box>
        ) : (
          <Table highlightOnHover verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead style={{ backgroundColor: '#F8FAFC' }}>
              <Table.Tr>
                <Table.Th style={{ width: 80 }}>Order</Table.Th>
                <Table.Th>Announcement Title</Table.Th>
                <Table.Th>Target URL</Table.Th>
                <Table.Th>Live On Site</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {announcements.map((ann) => (
                <Table.Tr key={ann.id}>
                  <Table.Td>
                    <Badge variant="light" color="gray" size="sm">
                      #{ann.display_order ?? 0}
                    </Badge>
                  </Table.Td>

                  <Table.Td>
                    <Text fw={700} size="sm" c="#0B2545">
                      {ann.title}
                    </Text>
                    {ann.date && (
                      <Text size="11px" c="#64748B">
                        Date tag: {ann.date}
                      </Text>
                    )}
                  </Table.Td>

                  <Table.Td>
                    {ann.link ? (
                      <Group gap={4}>
                        <Text size="xs" c="blue" component="a" href={ann.link} target="_blank">
                          {ann.link}
                        </Text>
                        <IconExternalLink size={12} color="#2563EB" />
                      </Group>
                    ) : (
                      <Text size="xs" c="#94A3B8">
                        None (Text only)
                      </Text>
                    )}
                  </Table.Td>

                  <Table.Td>
                    <Switch
                      checked={ann.is_active}
                      onChange={() => handleToggleActive(ann)}
                      color="green"
                      size="sm"
                      label={ann.is_active ? 'Active' : 'Hidden'}
                    />
                  </Table.Td>

                  <Table.Td style={{ textAlign: 'right' }}>
                    <Group gap="xs" justify="flex-end">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        radius="md"
                        onClick={() => handleOpenEdit(ann)}
                        title="Edit Announcement"
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        radius="md"
                        onClick={() => confirmDelete(ann)}
                        title="Delete Announcement"
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

      {/* Add / Edit Announcement Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={
          <Text fw={700} size="lg" c="#0B2545">
            {formData.id ? 'Edit Ticker Announcement' : 'Add Ticker Announcement'}
          </Text>
        }
        size="md"
        radius="lg"
        padding="xl"
      >
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Announcement Text"
              placeholder="e.g. Call for Papers: 15th National Science Congress 2026. Register now!"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.currentTarget.value })}
              radius="md"
            />

            <TextInput
              label="Optional Date Tag"
              placeholder="e.g. Nov 2026 or Ongoing"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.currentTarget.value })}
              radius="md"
            />

            <TextInput
              label="Target Link URL (optional)"
              placeholder="/events/national-science-congress-2026 or https://..."
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.currentTarget.value })}
              radius="md"
            />

            <NumberInput
              label="Display Order"
              description="Lower numbers appear first in ticker stream"
              value={formData.display_order}
              onChange={(val) => setFormData({ ...formData, display_order: Number(val) || 1 })}
              min={1}
              radius="md"
            />

            <Switch
              label="Make live on website immediately"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.currentTarget.checked })}
              color="green"
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
                {formData.id ? 'Save Changes' : 'Add to Ticker'}
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
            Are you sure you want to remove this announcement from the ticker?
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
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
