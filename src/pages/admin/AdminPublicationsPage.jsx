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
  NumberInput,
  SimpleGrid,
  Box,
  Center,
  Loader,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconBook,
  IconFileText,
  IconExternalLink,
} from '@tabler/icons-react';
import { useAllPublications, useSavePublication, useDeletePublication } from '../../hooks/useAdminData';
import { notifications } from '@mantine/notifications';

const CATEGORY_OPTIONS = [
  'Research Paper',
  'Report',
  'Proceedings',
  'Newsletter',
  'Article',
  'Presentation',
];

const DEFAULT_PUB_FORM = {
  id: null,
  title: '',
  slug: '',
  category: 'Report',
  author: 'Vigyan Parishad J&K Editorial Board',
  publication_date: new Date().toISOString().split('T')[0],
  date_display: '',
  file_size: '2.5 MB',
  views: 100,
  pages: 28,
  doi: '10.1234/vpjk.2024.01',
  abstract: '',
  cover_image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
  pdf_url: '#',
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

export function AdminPublicationsPage() {
  const { data: publications = [], isLoading } = useAllPublications();
  const saveMutation = useSavePublication();
  const deleteMutation = useDeletePublication();

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

  const [formData, setFormData] = useState(DEFAULT_PUB_FORM);
  const [pubToDelete, setPubToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const handleOpenAdd = () => {
    setFormData(DEFAULT_PUB_FORM);
    openModal();
  };

  const handleOpenEdit = (pub) => {
    setFormData({
      id: pub.id,
      title: pub.title || '',
      slug: pub.slug || '',
      category: pub.category || 'Report',
      author: pub.author || '',
      publication_date: pub.publication_date ? pub.publication_date.split('T')[0] : '',
      date_display: pub.date_display || '',
      file_size: pub.file_size || '2.5 MB',
      views: pub.views || 0,
      pages: pub.pages || 20,
      doi: pub.doi || '',
      abstract: pub.abstract || '',
      cover_image: pub.cover_image || '',
      pdf_url: pub.pdf_url || '#',
    });
    openModal();
  };

  const handleTitleChange = (val) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.id ? prev.slug : slugify(val),
    }));
  };

  const handleDateChange = (val) => {
    if (!val) return;
    const d = new Date(val);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear().toString();
    setFormData((prev) => ({
      ...prev,
      publication_date: val,
      date_display: `${month} ${year}`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      notifications.show({ title: 'Validation Error', message: 'Publication title is required.', color: 'red' });
      return;
    }
    if (!formData.slug.trim()) {
      formData.slug = slugify(formData.title);
    }
    if (!formData.date_display) {
      handleDateChange(formData.publication_date);
    }

    try {
      await saveMutation.mutateAsync(formData);
      notifications.show({
        title: 'Success',
        message: formData.id ? 'Publication updated successfully.' : 'New publication added.',
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

  const confirmDelete = (pub) => {
    setPubToDelete(pub);
    openDeleteModal();
  };

  const handleDelete = async () => {
    if (!pubToDelete) return;
    try {
      await deleteMutation.mutateAsync(pubToDelete.id);
      notifications.show({
        title: 'Publication Removed',
        message: `"${pubToDelete.title}" has been deleted.`,
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

  const filteredPubs = publications.filter((pub) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      pub.title?.toLowerCase().includes(q) ||
      pub.author?.toLowerCase().includes(q) ||
      pub.slug?.toLowerCase().includes(q);
    const matchesCat = categoryFilter === 'All' || pub.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <Box>
      {/* Header */}
      <Group justify="space-between" mb="lg" wrap="wrap" gap="md">
        <Stack gap={2}>
          <Group gap="xs">
            <span className="section-tag-dash">RESEARCH & PAPERS</span>
          </Group>
          <Title order={2} fw={800} c="#0B2545">
            Publications Management
          </Title>
          <Text size="sm" c="#64748B">
            Catalog research papers, policy briefs, scientific proceedings, and annual newsletters.
          </Text>
        </Stack>

        <Button
          className="brand-gradient-btn"
          radius="xl"
          size="md"
          leftSection={<IconPlus size={18} />}
          onClick={handleOpenAdd}
        >
          Add Publication
        </Button>
      </Group>

      {/* Filter and Search Bar */}
      <Card p="md" radius="lg" withBorder mb="lg" bg="#FFFFFF">
        <Group justify="space-between" wrap="wrap" gap="md">
          <TextInput
            placeholder="Search publications by title or author..."
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

      {/* Publications Table */}
      <Card p="0" radius="lg" withBorder bg="#FFFFFF" style={{ overflow: 'hidden' }}>
        {isLoading ? (
          <Center p={60}>
            <Loader size="md" color="blue" />
          </Center>
        ) : filteredPubs.length === 0 ? (
          <Box p={60} style={{ textAlign: 'center' }}>
            <Text fw={600} size="md" c="#0B2545">
              No matching publications found.
            </Text>
            <Text size="sm" c="#64748B" mt={4}>
              Try adjusting your filters or click "Add Publication".
            </Text>
          </Box>
        ) : (
          <Table highlightOnHover verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead style={{ backgroundColor: '#F8FAFC' }}>
              <Table.Tr>
                <Table.Th>Publication</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Date & Specs</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredPubs.map((pub) => (
                <Table.Tr key={pub.id}>
                  <Table.Td>
                    <Group gap="sm" wrap="nowrap">
                      <img
                        src={pub.cover_image}
                        alt=""
                        style={{
                          width: 44,
                          height: 56,
                          borderRadius: 6,
                          objectFit: 'cover',
                          border: '1px solid #E2E8F0',
                        }}
                      />
                      <Box>
                        <Text fw={700} size="sm" c="#0B2545" lineClamp={1}>
                          {pub.title}
                        </Text>
                        <Text size="xs" c="#64748B" lineClamp={1} mt={2}>
                          Author: {pub.author}
                        </Text>
                      </Box>
                    </Group>
                  </Table.Td>

                  <Table.Td>
                    <Badge color="blue" variant="light" size="sm">
                      {pub.category}
                    </Badge>
                  </Table.Td>

                  <Table.Td>
                    <Badge variant="outline" color="gray" size="sm">
                      {pub.date_display || pub.publication_date}
                    </Badge>
                    <Text size="11px" c="#64748B" mt={2}>
                      {pub.pages} Pages • {pub.file_size}
                    </Text>
                  </Table.Td>

                  <Table.Td style={{ textAlign: 'right' }}>
                    <Group gap="xs" justify="flex-end">
                      <ActionIcon
                        component="a"
                        href={`/publications/${pub.slug}`}
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
                        onClick={() => handleOpenEdit(pub)}
                        title="Edit Publication"
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        radius="md"
                        onClick={() => confirmDelete(pub)}
                        title="Delete Publication"
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

      {/* Add / Edit Publication Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={
          <Text fw={700} size="lg" c="#0B2545">
            {formData.id ? 'Edit Publication' : 'Add New Publication'}
          </Text>
        }
        size="lg"
        radius="lg"
        padding="xl"
      >
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Publication Title"
              placeholder="e.g. Swadeshi Science & Climate Resilience in Western Himalayas"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.currentTarget.value)}
              radius="md"
            />

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <TextInput
                label="URL Slug"
                placeholder="swadeshi-science-western-himalayas"
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
                onChange={(val) => setFormData({ ...formData, category: val || 'Report' })}
                radius="md"
              />
            </SimpleGrid>

            <TextInput
              label="Author(s) / Editorial Committee"
              placeholder="e.g. Prof. R.K. Sharma & Vigyan Parishad Research Team"
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.currentTarget.value })}
              radius="md"
            />

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <TextInput
                label="Publication Date"
                type="date"
                required
                value={formData.publication_date}
                onChange={(e) => handleDateChange(e.currentTarget.value)}
                radius="md"
              />

              <TextInput
                label="Page Count"
                placeholder="32"
                value={formData.pages.toString()}
                onChange={(e) => setFormData({ ...formData, pages: parseInt(e.currentTarget.value) || 1 })}
                radius="md"
              />

              <TextInput
                label="File Size"
                placeholder="2.4 MB"
                value={formData.file_size}
                onChange={(e) => setFormData({ ...formData, file_size: e.currentTarget.value })}
                radius="md"
              />
            </SimpleGrid>

            <TextInput
              label="DOI / Catalog Reference"
              placeholder="10.1234/vpjk.2024.01"
              value={formData.doi}
              onChange={(e) => setFormData({ ...formData, doi: e.currentTarget.value })}
              radius="md"
            />

            <Textarea
              label="Abstract / Executive Summary"
              placeholder="Comprehensive summary of research findings, recommendations, and methodology..."
              minRows={4}
              required
              value={formData.abstract}
              onChange={(e) => setFormData({ ...formData, abstract: e.currentTarget.value })}
              radius="md"
            />

            <TextInput
              label="Cover Image URL"
              placeholder="https://... cover image address"
              required
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.currentTarget.value })}
              radius="md"
            />

            <TextInput
              label="PDF Document Download URL"
              placeholder="https://... file url or '#'"
              value={formData.pdf_url}
              onChange={(e) => setFormData({ ...formData, pdf_url: e.currentTarget.value })}
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
                {formData.id ? 'Save Changes' : 'Save Publication'}
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
            Are you sure you want to permanently delete publication{' '}
            <Text span fw={700}>"{pubToDelete?.title}"</Text>?
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
