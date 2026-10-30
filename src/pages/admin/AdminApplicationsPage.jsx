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
  Select,
  Box,
  Center,
  Loader,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconSearch,
  IconEye,
  IconCheck,
  IconX,
  IconUserCheck,
  IconMail,
  IconPhone,
  IconBriefcase,
} from '@tabler/icons-react';
import { useAllApplications, useUpdateApplicationStatus } from '../../hooks/useAdminData';
import { notifications } from '@mantine/notifications';

export function AdminApplicationsPage() {
  const { data: applications = [], isLoading } = useAllApplications();
  const updateStatusMutation = useUpdateApplicationStatus();

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleView = (app) => {
    setSelectedApp(app);
    openModal();
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status: newStatus });
      notifications.show({
        title: 'Status Updated',
        message: `Application marked as ${newStatus}.`,
        color: newStatus === 'approved' ? 'green' : 'blue',
      });
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      notifications.show({
        title: 'Update Failed',
        message: err.message,
        color: 'red',
      });
    }
  };

  const filteredApps = applications.filter((app) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      app.full_name?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.profession?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge color="green" variant="filled" size="sm">APPROVED</Badge>;
      case 'rejected':
        return <Badge color="red" variant="filled" size="sm">REJECTED</Badge>;
      default:
        return <Badge color="orange" variant="light" size="sm">PENDING</Badge>;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Group justify="space-between" mb="lg" wrap="wrap" gap="md">
        <Stack gap={2}>
          <Group gap="xs">
            <span className="section-tag-dash">MEMBERSHIP INTAKE</span>
          </Group>
          <Title order={2} fw={800} c="#0B2545">
            Membership Applications
          </Title>
          <Text size="sm" c="#64748B">
            Review submissions from educators, researchers, and students seeking to join Vigyan Parishad J&K.
          </Text>
        </Stack>
      </Group>

      {/* Filter and Search Bar */}
      <Card p="md" radius="lg" withBorder mb="lg" bg="#FFFFFF">
        <Group justify="space-between" wrap="wrap" gap="md">
          <TextInput
            placeholder="Search by name, email, or profession..."
            leftSection={<IconSearch size={16} color="#64748B" />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            radius="xl"
            style={{ width: '100%', maxWidth: 360 }}
          />

          <Select
            placeholder="Status"
            data={['All', 'pending', 'approved', 'rejected']}
            value={statusFilter}
            onChange={(val) => setStatusFilter(val || 'All')}
            radius="xl"
            style={{ width: 160 }}
          />
        </Group>
      </Card>

      {/* Applications Table */}
      <Card p="0" radius="lg" withBorder bg="#FFFFFF" style={{ overflow: 'hidden' }}>
        {isLoading ? (
          <Center p={60}>
            <Loader size="md" color="blue" />
          </Center>
        ) : filteredApps.length === 0 ? (
          <Box p={60} style={{ textAlign: 'center' }}>
            <Text fw={600} size="md" c="#0B2545">
              No applications found.
            </Text>
            <Text size="sm" c="#64748B" mt={4}>
              New submissions from the Membership page form will automatically appear here.
            </Text>
          </Box>
        ) : (
          <Table highlightOnHover verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead style={{ backgroundColor: '#F8FAFC' }}>
              <Table.Tr>
                <Table.Th>Applicant</Table.Th>
                <Table.Th>Contact</Table.Th>
                <Table.Th>Profession / Field</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredApps.map((app) => (
                <Table.Tr key={app.id}>
                  <Table.Td>
                    <Text fw={700} size="sm" c="#0B2545">
                      {app.full_name}
                    </Text>
                    <Text size="11px" c="#64748B">
                      Submitted: {new Date(app.created_at).toLocaleDateString()}
                    </Text>
                  </Table.Td>

                  <Table.Td>
                    <Text size="xs" c="#1E293B">
                      {app.email}
                    </Text>
                    <Text size="11px" c="#64748B">
                      {app.contact_number}
                    </Text>
                  </Table.Td>

                  <Table.Td>
                    <Badge color="blue" variant="light" size="sm">
                      {app.profession}
                    </Badge>
                  </Table.Td>

                  <Table.Td>{getStatusBadge(app.status)}</Table.Td>

                  <Table.Td style={{ textAlign: 'right' }}>
                    <Group gap="xs" justify="flex-end">
                      <Button
                        variant="subtle"
                        size="xs"
                        leftSection={<IconEye size={14} />}
                        onClick={() => handleView(app)}
                      >
                        Review
                      </Button>
                      {app.status !== 'approved' && (
                        <ActionIcon
                          variant="light"
                          color="green"
                          radius="md"
                          onClick={() => handleUpdateStatus(app.id, 'approved')}
                          title="Approve Application"
                        >
                          <IconCheck size={16} />
                        </ActionIcon>
                      )}
                      {app.status !== 'rejected' && (
                        <ActionIcon
                          variant="light"
                          color="red"
                          radius="md"
                          onClick={() => handleUpdateStatus(app.id, 'rejected')}
                          title="Reject Application"
                        >
                          <IconX size={16} />
                        </ActionIcon>
                      )}
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Card>

      {/* Review Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={
          <Group gap="sm">
            <Text fw={700} size="lg" c="#0B2545">
              Membership Application Review
            </Text>
            {selectedApp && getStatusBadge(selectedApp.status)}
          </Group>
        }
        size="md"
        radius="lg"
        padding="xl"
      >
        {selectedApp && (
          <Stack gap="md">
            <Box>
              <Text size="xs" c="#64748B" tt="uppercase" fw={700}>
                Applicant Name
              </Text>
              <Text fw={700} size="md" c="#0B2545">
                {selectedApp.full_name}
              </Text>
            </Box>

            <Group grow>
              <Box>
                <Text size="xs" c="#64748B" tt="uppercase" fw={700}>
                  Email Address
                </Text>
                <Text size="sm" c="#1E293B">
                  {selectedApp.email}
                </Text>
              </Box>
              <Box>
                <Text size="xs" c="#64748B" tt="uppercase" fw={700}>
                  Contact Number
                </Text>
                <Text size="sm" c="#1E293B">
                  {selectedApp.contact_number}
                </Text>
              </Box>
            </Group>

            <Group grow>
              <Box>
                <Text size="xs" c="#64748B" tt="uppercase" fw={700}>
                  Profession
                </Text>
                <Text size="sm" c="#1E293B">
                  {selectedApp.profession}
                </Text>
              </Box>
              <Box>
                <Text size="xs" c="#64748B" tt="uppercase" fw={700}>
                  Area of Interest
                </Text>
                <Text size="sm" c="#1E293B">
                  {selectedApp.area_of_interest || 'General Science'}
                </Text>
              </Box>
            </Group>

            <Divider />

            <Box>
              <Text size="xs" c="#64748B" tt="uppercase" fw={700} mb={4}>
                Motivation Statement
              </Text>
              <Card p="sm" radius="md" bg="#F8FAFC" withBorder>
                <Text size="sm" c="#334155" style={{ whiteSpace: 'pre-wrap' }}>
                  {selectedApp.short_motivation || 'No statement provided.'}
                </Text>
              </Card>
            </Box>

            <Group justify="space-between" mt="lg">
              <Button variant="default" radius="xl" onClick={closeModal}>
                Close
              </Button>
              <Group gap="xs">
                <Button
                  color="red"
                  variant="light"
                  radius="xl"
                  leftSection={<IconX size={14} />}
                  onClick={() => handleUpdateStatus(selectedApp.id, 'rejected')}
                >
                  Reject
                </Button>
                <Button
                  color="green"
                  radius="xl"
                  leftSection={<IconCheck size={14} />}
                  onClick={() => handleUpdateStatus(selectedApp.id, 'approved')}
                >
                  Approve Application
                </Button>
              </Group>
            </Group>
          </Stack>
        )}
      </Modal>
    </Box>
  );
}
