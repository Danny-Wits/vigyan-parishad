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
  IconMail,
  IconMailOpened,
  IconSend,
} from '@tabler/icons-react';
import { useAllInquiries, useUpdateInquiryStatus } from '../../hooks/useAdminData';
import { notifications } from '@mantine/notifications';

export function AdminInquiriesPage() {
  const { data: inquiries = [], isLoading } = useAllInquiries();
  const updateStatusMutation = useUpdateInquiryStatus();

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [selectedInq, setSelectedInq] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleView = (inq) => {
    setSelectedInq(inq);
    openModal();
    if (inq.status === 'unread') {
      updateStatusMutation.mutate({ id: inq.id, status: 'read' });
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status: newStatus });
      notifications.show({
        title: 'Status Updated',
        message: `Inquiry marked as ${newStatus}.`,
        color: newStatus === 'resolved' ? 'green' : 'blue',
      });
      if (selectedInq && selectedInq.id === id) {
        setSelectedInq((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      notifications.show({
        title: 'Update Failed',
        message: err.message,
        color: 'red',
      });
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      inq.full_name?.toLowerCase().includes(q) ||
      inq.email?.toLowerCase().includes(q) ||
      inq.subject?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
        return <Badge color="green" variant="filled" size="sm">RESOLVED</Badge>;
      case 'read':
        return <Badge color="gray" variant="light" size="sm">READ</Badge>;
      default:
        return <Badge color="red" variant="filled" size="sm">UNREAD</Badge>;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Group justify="space-between" mb="lg" wrap="wrap" gap="md">
        <Stack gap={2}>
          <Group gap="xs">
            <span className="section-tag-dash">COMMUNICATIONS</span>
          </Group>
          <Title order={2} fw={800} c="#0B2545">
            Public Messages & Inquiries
          </Title>
          <Text size="sm" c="#64748B">
            Respond to general inquiries, event questions, and partnership requests sent via the contact page.
          </Text>
        </Stack>
      </Group>

      {/* Filter and Search Bar */}
      <Card p="md" radius="lg" withBorder mb="lg" bg="#FFFFFF">
        <Group justify="space-between" wrap="wrap" gap="md">
          <TextInput
            placeholder="Search by sender name, email, or subject..."
            leftSection={<IconSearch size={16} color="#64748B" />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            radius="xl"
            style={{ width: '100%', maxWidth: 360 }}
          />

          <Select
            placeholder="Status"
            data={['All', 'unread', 'read', 'resolved']}
            value={statusFilter}
            onChange={(val) => setStatusFilter(val || 'All')}
            radius="xl"
            style={{ width: 160 }}
          />
        </Group>
      </Card>

      {/* Inquiries Table */}
      <Card p="0" radius="lg" withBorder bg="#FFFFFF" style={{ overflow: 'hidden' }}>
        {isLoading ? (
          <Center p={60}>
            <Loader size="md" color="blue" />
          </Center>
        ) : filteredInquiries.length === 0 ? (
          <Box p={60} style={{ textAlign: 'center' }}>
            <Text fw={600} size="md" c="#0B2545">
              No inquiries found.
            </Text>
            <Text size="sm" c="#64748B" mt={4}>
              New messages submitted from the Contact page form will automatically appear here.
            </Text>
          </Box>
        ) : (
          <Table highlightOnHover verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead style={{ backgroundColor: '#F8FAFC' }}>
              <Table.Tr>
                <Table.Th>Sender</Table.Th>
                <Table.Th>Subject</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredInquiries.map((inq) => (
                <Table.Tr key={inq.id}>
                  <Table.Td>
                    <Text fw={700} size="sm" c="#0B2545">
                      {inq.full_name}
                    </Text>
                    <Text size="11px" c="#64748B">
                      {inq.email} {inq.contact_number ? `• ${inq.contact_number}` : ''}
                    </Text>
                  </Table.Td>

                  <Table.Td>
                    <Text size="xs" fw={600} c="#1E293B" lineClamp={1}>
                      {inq.subject}
                    </Text>
                    <Text size="11px" c="#64748B" lineClamp={1}>
                      {inq.message}
                    </Text>
                  </Table.Td>

                  <Table.Td>
                    <Text size="xs" c="#64748B">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </Text>
                  </Table.Td>

                  <Table.Td>{getStatusBadge(inq.status)}</Table.Td>

                  <Table.Td style={{ textAlign: 'right' }}>
                    <Group gap="xs" justify="flex-end">
                      <Button
                        variant="subtle"
                        size="xs"
                        leftSection={<IconEye size={14} />}
                        onClick={() => handleView(inq)}
                      >
                        Read
                      </Button>
                      {inq.status !== 'resolved' && (
                        <ActionIcon
                          variant="light"
                          color="green"
                          radius="md"
                          onClick={() => handleUpdateStatus(inq.id, 'resolved')}
                          title="Mark as Resolved"
                        >
                          <IconCheck size={16} />
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

      {/* View Message Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={
          <Group gap="sm">
            <Text fw={700} size="lg" c="#0B2545">
              Contact Inquiry
            </Text>
            {selectedInq && getStatusBadge(selectedInq.status)}
          </Group>
        }
        size="md"
        radius="lg"
        padding="xl"
      >
        {selectedInq && (
          <Stack gap="md">
            <Box>
              <Text size="xs" c="#64748B" tt="uppercase" fw={700}>
                From
              </Text>
              <Text fw={700} size="md" c="#0B2545">
                {selectedInq.full_name}
              </Text>
              <Text size="xs" c="#64748B">
                {selectedInq.email} {selectedInq.contact_number ? `• Phone: ${selectedInq.contact_number}` : ''}
              </Text>
            </Box>

            <Box>
              <Text size="xs" c="#64748B" tt="uppercase" fw={700}>
                Subject
              </Text>
              <Text fw={600} size="sm" c="#1E293B">
                {selectedInq.subject}
              </Text>
            </Box>

            <Divider />

            <Box>
              <Text size="xs" c="#64748B" tt="uppercase" fw={700} mb={4}>
                Message Content
              </Text>
              <Card p="sm" radius="md" bg="#F8FAFC" withBorder>
                <Text size="sm" c="#334155" style={{ whiteSpace: 'pre-wrap' }}>
                  {selectedInq.message}
                </Text>
              </Card>
            </Box>

            <Group justify="space-between" mt="lg">
              <Button variant="default" radius="xl" onClick={closeModal}>
                Close
              </Button>
              <Group gap="xs">
                <Button
                  component="a"
                  href={`mailto:${selectedInq.email}?subject=Re: ${encodeURIComponent(selectedInq.subject)}`}
                  variant="light"
                  color="blue"
                  radius="xl"
                  leftSection={<IconSend size={14} />}
                >
                  Reply via Email
                </Button>
                {selectedInq.status !== 'resolved' && (
                  <Button
                    color="green"
                    radius="xl"
                    leftSection={<IconCheck size={14} />}
                    onClick={() => handleUpdateStatus(selectedInq.id, 'resolved')}
                  >
                    Mark Resolved
                  </Button>
                )}
              </Group>
            </Group>
          </Stack>
        )}
      </Modal>
    </Box>
  );
}
