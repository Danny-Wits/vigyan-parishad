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
  NumberInput,
  SimpleGrid,
  Box,
  Center,
  Loader,
  Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconUsers,
} from '@tabler/icons-react';
import { useAllMembers, useSaveMember, useDeleteMember } from '../../hooks/useAdminData';
import { notifications } from '@mantine/notifications';

const DEFAULT_MEMBER_FORM = {
  id: null,
  name: '',
  role: 'Executive Member',
  institution: 'University of Jammu',
  photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  display_order: 1,
};

export function AdminMembersPage() {
  const { data: members = [], isLoading } = useAllMembers();
  const saveMutation = useSaveMember();
  const deleteMutation = useDeleteMember();

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

  const [formData, setFormData] = useState(DEFAULT_MEMBER_FORM);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const handleOpenAdd = () => {
    setFormData({
      ...DEFAULT_MEMBER_FORM,
      display_order: members.length + 1,
    });
    openModal();
  };

  const handleOpenEdit = (m) => {
    setFormData({
      id: m.id,
      name: m.name || '',
      role: m.role || '',
      institution: m.institution || '',
      photo_url: m.photo_url || '',
      display_order: m.display_order ?? 1,
    });
    openModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      notifications.show({ title: 'Validation Error', message: 'Member name is required.', color: 'red' });
      return;
    }

    try {
      await saveMutation.mutateAsync(formData);
      notifications.show({
        title: 'Success',
        message: formData.id ? 'Member updated.' : 'New member added to council.',
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

  const confirmDelete = (m) => {
    setMemberToDelete(m);
    openDeleteModal();
  };

  const handleDelete = async () => {
    if (!memberToDelete) return;
    try {
      await deleteMutation.mutateAsync(memberToDelete.id);
      notifications.show({
        title: 'Member Removed',
        message: `"${memberToDelete.name}" has been removed from council.`,
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
            <span className="section-tag-dash">LEADERSHIP & COUNCIL</span>
          </Group>
          <Title order={2} fw={800} c="#0B2545">
            Distinguished Council & Members
          </Title>
          <Text size="sm" c="#64748B">
            Manage executive council members, academic patrons, and advisors featured across the website.
          </Text>
        </Stack>

        <Button
          className="brand-gradient-btn"
          radius="xl"
          size="md"
          leftSection={<IconPlus size={18} />}
          onClick={handleOpenAdd}
        >
          Add Council Member
        </Button>
      </Group>

      {/* Members Table */}
      <Card p="0" radius="lg" withBorder bg="#FFFFFF" style={{ overflow: 'hidden' }}>
        {isLoading ? (
          <Center p={60}>
            <Loader size="md" color="blue" />
          </Center>
        ) : members.length === 0 ? (
          <Box p={60} style={{ textAlign: 'center' }}>
            <Text fw={600} size="md" c="#0B2545">
              No members in directory.
            </Text>
            <Text size="sm" c="#64748B" mt={4}>
              Click "Add Council Member" to list executive leadership.
            </Text>
          </Box>
        ) : (
          <Table highlightOnHover verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead style={{ backgroundColor: '#F8FAFC' }}>
              <Table.Tr>
                <Table.Th style={{ width: 80 }}>Order</Table.Th>
                <Table.Th>Member Profile</Table.Th>
                <Table.Th>Designation / Role</Table.Th>
                <Table.Th>Affiliation</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {members.map((m) => (
                <Table.Tr key={m.id}>
                  <Table.Td>
                    <Badge variant="light" color="gray" size="sm">
                      #{m.display_order ?? 0}
                    </Badge>
                  </Table.Td>

                  <Table.Td>
                    <Group gap="sm" wrap="nowrap">
                      <Avatar src={m.photo_url} size={42} radius="100%" color="blue" />
                      <Text fw={700} size="sm" c="#0B2545">
                        {m.name}
                      </Text>
                    </Group>
                  </Table.Td>

                  <Table.Td>
                    <Badge color="blue" variant="light" size="sm">
                      {m.role}
                    </Badge>
                  </Table.Td>

                  <Table.Td>
                    <Text size="xs" c="#64748B" lineClamp={1}>
                      {m.institution}
                    </Text>
                  </Table.Td>

                  <Table.Td style={{ textAlign: 'right' }}>
                    <Group gap="xs" justify="flex-end">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        radius="md"
                        onClick={() => handleOpenEdit(m)}
                        title="Edit Member"
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        radius="md"
                        onClick={() => confirmDelete(m)}
                        title="Delete Member"
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

      {/* Add / Edit Member Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={
          <Text fw={700} size="lg" c="#0B2545">
            {formData.id ? 'Edit Council Member' : 'Add Council Member'}
          </Text>
        }
        size="md"
        radius="lg"
        padding="xl"
      >
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Full Name & Title"
              placeholder="e.g. Prof. Manoj Kumar Dhar"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
              radius="md"
            />

            <TextInput
              label="Designation / Role in Parishad"
              placeholder="e.g. President / Vice Chancellor / Advisor"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.currentTarget.value })}
              radius="md"
            />

            <TextInput
              label="Institution / University Affiliation"
              placeholder="e.g. University of Jammu / Central University"
              required
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.currentTarget.value })}
              radius="md"
            />

            <TextInput
              label="Profile Photo URL"
              placeholder="https://... image address"
              required
              value={formData.photo_url}
              onChange={(e) => setFormData({ ...formData, photo_url: e.currentTarget.value })}
              radius="md"
            />

            <NumberInput
              label="Display Order"
              description="Lower numbers appear first on About and Council cards"
              value={formData.display_order}
              onChange={(val) => setFormData({ ...formData, display_order: Number(val) || 1 })}
              min={1}
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
                loading={saveMutation.isPending}
              >
                {formData.id ? 'Save Changes' : 'Add Member'}
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
            Are you sure you want to remove{' '}
            <Text span fw={700}>"{memberToDelete?.name}"</Text> from the council directory?
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
              Remove
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
