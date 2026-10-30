import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  Button,
  Badge,
  Modal,
  ThemeIcon,
  CopyButton,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCalendar,
  IconUser,
  IconFileText,
  IconEye,
  IconDownload,
  IconQuote,
  IconShare,
  IconCopy,
  IconCheck,
  IconFileSpreadsheet,
} from '@tabler/icons-react';
import { BreadcrumbsNav } from '../components/common/BreadcrumbsNav';
import { usePublicationDetail } from '../hooks/usePublications';

export function PublicationDetailPage() {
  const { slug } = useParams();
  const { data: pub, isLoading } = usePublicationDetail(slug);
  const [citeOpened, { open: openCite, close: closeCite }] = useDisclosure(false);

  if (!pub && !isLoading) {
    return (
      <Container size="xl" py={60} style={{ textAlign: 'center' }}>
        <Title order={2} c="#0B2545">Publication Not Found</Title>
        <Text size="sm" c="#64748B" mt="sm">The requested document could not be located.</Text>
        <Button component={Link} to="/publications" mt="md" radius="xl" className="brand-gradient-btn">
          Back to Publications
        </Button>
      </Container>
    );
  }

  const handleDownload = () => {
    notifications.show({
      title: 'Downloading Document',
      message: `Downloading "${pub?.title}.pdf" (${pub?.file_size || '2.4 MB'})...`,
      color: 'blue',
      icon: <IconDownload size={18} />,
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      notifications.show({
        title: 'Link Copied!',
        message: 'Publication link copied to clipboard.',
        color: 'teal',
        icon: <IconCheck size={18} />,
      });
    }
  };

  const apaCitation = `${pub?.author || 'Vigyan Parishad'}. (${pub?.date_display ? pub.date_display.slice(-4) : '2024'}). ${pub?.title}. Vigyan Parishad J&K Publications. DOI: ${pub?.doi || '10.1234/vpjk.2024.01'}`;

  return (
    <Box>
      <Container size="xl" pt="xs" pb="sm">
        <BreadcrumbsNav
          items={[
            { title: 'Publications', href: '/publications' },
            { title: pub?.title || 'Detail' },
          ]}
        />
      </Container>

      {/* Hero Section matching 04 mockup */}
      <Container size="xl" mb={40}>
        <Box
          className="hero-wavy-bg"
          p={{ base: 'lg', md: 'xl', lg: 40 }}
          style={{ position: 'relative', minHeight: 380 }}
        >
          <Grid align="center" gutter={{ base: 24, md: 40 }}>
            {/* Left Content */}
            <Grid.Col span={{ base: 12, md: 7.5 }}>
              <Stack gap="md" style={{ position: 'relative', zIndex: 1 }}>
                <Box>
                  <Badge
                    size="md"
                    radius="xl"
                    style={{
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      paddingLeft: 14,
                      paddingRight: 14,
                    }}
                  >
                    {pub?.category || 'RESEARCH PAPER'}
                  </Badge>
                </Box>

                <Title
                  order={1}
                  style={{
                    fontSize: 'clamp(2.1rem, 3.8vw, 3rem)',
                    fontWeight: 800,
                    color: '#0B2545',
                    lineHeight: 1.2,
                  }}
                >
                  {pub?.title}
                </Title>

                {/* Metadata Row */}
                <Group gap="lg" wrap="wrap" pt="xs">
                  <Group gap={6}>
                    <IconCalendar size={18} color="#2563EB" />
                    <Text size="sm" fw={600} c="#475569">
                      {pub?.date_display || '22 November 2024'}
                    </Text>
                  </Group>

                  <Group gap={6}>
                    <IconUser size={18} color="#2563EB" />
                    <Text size="sm" fw={600} c="#475569">
                      {pub?.author || 'Dr. A. Sharma'}
                    </Text>
                  </Group>

                  <Group gap={6}>
                    <IconFileText size={18} color="#2563EB" />
                    <Text size="sm" fw={600} c="#475569">
                      {pub?.file_size || '2.4 MB'}
                    </Text>
                  </Group>

                  <Group gap={6}>
                    <IconEye size={18} color="#2563EB" />
                    <Text size="sm" fw={600} c="#475569">
                      {pub?.views || 320} Views
                    </Text>
                  </Group>
                </Group>
              </Stack>
            </Grid.Col>

            {/* Right: 3D Book Cover Mockup */}
            <Grid.Col span={{ base: 12, md: 4.5 }} style={{ textAlign: 'center' }}>
              <Box className="book-cover-3d" style={{ maxWidth: 280, margin: '0 auto' }}>
                <Box
                  className="book-cover-inner"
                  style={{
                    backgroundColor: '#1E3A8A',
                    color: '#FFFFFF',
                    padding: '24px 20px',
                    minHeight: 360,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}
                >
                  <Box className="book-cover-spine" />

                  {/* Top logo & emblem */}
                  <Box style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <Box
                      p={4}
                      bg="rgba(255,255,255,0.9)"
                      style={{
                        borderRadius: 8,
                        display: 'inline-flex',
                        marginBottom: 12,
                      }}
                    >
                      <img src="/logo.png" alt="Logo" style={{ height: 36 }} />
                    </Box>
                  </Box>

                  {/* Book cover image banner */}
                  <Box
                    my="sm"
                    style={{
                      borderRadius: 8,
                      overflow: 'hidden',
                      height: 140,
                      position: 'relative',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Image
                      src={pub?.cover_image}
                      alt="Cover"
                      height={140}
                      fit="cover"
                      fallbackSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                    />
                  </Box>

                  {/* Title & Organization on Book Cover */}
                  <Box style={{ position: 'relative', zIndex: 1, textAlign: 'left', paddingLeft: 8 }}>
                    <Text fw={700} size="sm" c="#FFFFFF" lineClamp={2} style={{ lineHeight: 1.3 }}>
                      {pub?.title}
                    </Text>
                    <Text size="xs" c="#BFDBFE" mt={4}>
                      {pub?.author}
                    </Text>
                    <Text size="10px" c="#93C5FD" tt="uppercase" mt={6} style={{ letterSpacing: '0.1em' }}>
                      Vigyan Parishad J&K
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>

      {/* Main Content & Publication Details Sidebar */}
      <Container size="xl" mb={60}>
        <Grid gutter={36}>
          {/* Left Column: Abstract, Keywords, Download Buttons */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap={36}>
              {/* Abstract */}
              <Box>
                <span className="section-tag-dash">Abstract</span>
                <Text size="md" c="#334155" mt="md" style={{ lineHeight: 1.75 }}>
                  {pub?.abstract}
                </Text>
              </Box>

              {/* Keywords */}
              <Box>
                <span className="section-tag-dash">Keywords</span>
                <Group gap="xs" mt="sm">
                  {(pub?.keywords || ['Climate Change', 'Ecosystems', 'Jammu & Kashmir', 'Sustainability']).map(
                    (kw, idx) => (
                      <Badge
                        key={idx}
                        size="md"
                        variant="filled"
                        color="gray"
                        radius="xl"
                        style={{
                          backgroundColor: '#EFF6FF',
                          color: '#2563EB',
                          fontWeight: 600,
                          border: '1px solid #BFDBFE',
                        }}
                      >
                        {kw}
                      </Badge>
                    )
                  )}
                </Group>
              </Box>

              {/* Download / Action Row matching mockup */}
              <Box>
                <span className="section-tag-dash">Download</span>

                <Grid gutter="md" mt="md">
                  {/* Download PDF Card */}
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <Card
                      padding="md"
                      radius="lg"
                      withBorder
                      className="hover-lift"
                      onClick={handleDownload}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: '#F8FAFC',
                        borderColor: '#E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 76,
                      }}
                    >
                      <Group gap="sm" wrap="nowrap">
                        <ThemeIcon size={38} radius="xl" color="red" variant="light">
                          <IconDownload size={20} color="#DC2626" />
                        </ThemeIcon>
                        <Box>
                          <Text fw={700} size="xs" c="#0B2545">
                            Download PDF
                          </Text>
                          <Text size="11px" c="#64748B">
                            ({pub?.file_size || '2.4 MB'})
                          </Text>
                        </Box>
                      </Group>
                    </Card>
                  </Grid.Col>

                  {/* Cite (APA) Card */}
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <Card
                      padding="md"
                      radius="lg"
                      withBorder
                      className="hover-lift"
                      onClick={openCite}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: '#F8FAFC',
                        borderColor: '#E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 76,
                      }}
                    >
                      <Group gap="sm" wrap="nowrap">
                        <ThemeIcon size={38} radius="xl" color="blue" variant="light">
                          <IconQuote size={20} color="#2563EB" />
                        </ThemeIcon>
                        <Box>
                          <Text fw={700} size="xs" c="#0B2545">
                            Cite
                          </Text>
                          <Text size="11px" c="#64748B">
                            (APA / BibTeX)
                          </Text>
                        </Box>
                      </Group>
                    </Card>
                  </Grid.Col>

                  {/* Share Card */}
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <Card
                      padding="md"
                      radius="lg"
                      withBorder
                      className="hover-lift"
                      onClick={handleShare}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: '#F8FAFC',
                        borderColor: '#E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 76,
                      }}
                    >
                      <Group gap="sm" wrap="nowrap">
                        <ThemeIcon size={38} radius="xl" color="grape" variant="light">
                          <IconShare size={20} color="#9333EA" />
                        </ThemeIcon>
                        <Box>
                          <Text fw={700} size="xs" c="#0B2545">
                            Share
                          </Text>
                          <Text size="11px" c="#64748B">
                            Copy Link
                          </Text>
                        </Box>
                      </Group>
                    </Card>
                  </Grid.Col>
                </Grid>
              </Box>
            </Stack>
          </Grid.Col>

          {/* Right Column: Publication Details Sidebar */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card
              padding="xl"
              radius="lg"
              withBorder
              bg="#FFFFFF"
              style={{
                borderRadius: 20,
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
              }}
            >
              <Box mb="lg">
                <span className="section-tag-dash">Publication Details</span>
              </Box>

              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <Text size="sm" c="#64748B">Type</Text>
                  <Text size="sm" fw={700} c="#0B2545">
                    {pub?.category || 'Research Paper'}
                  </Text>
                </Group>

                <Group justify="space-between" align="center">
                  <Text size="sm" c="#64748B">Author</Text>
                  <Text size="sm" fw={700} c="#0B2545">
                    {pub?.author || 'Dr. A. Sharma'}
                  </Text>
                </Group>

                <Group justify="space-between" align="center">
                  <Text size="sm" c="#64748B">Publication Date</Text>
                  <Text size="sm" fw={700} c="#0B2545">
                    {pub?.date_display || '22 November 2024'}
                  </Text>
                </Group>

                <Group justify="space-between" align="center">
                  <Text size="sm" c="#64748B">Pages</Text>
                  <Text size="sm" fw={700} c="#0B2545">
                    {pub?.pages || 28}
                  </Text>
                </Group>

                <Group justify="space-between" align="center">
                  <Text size="sm" c="#64748B">Category</Text>
                  <Text size="sm" fw={700} c="#0B2545">
                    Environment & Science
                  </Text>
                </Group>

                <Group justify="space-between" align="center">
                  <Text size="sm" c="#64748B">DOI</Text>
                  <Text size="sm" fw={700} c="#2563EB">
                    {pub?.doi || '10.1234/vpjk.2024.01'}
                  </Text>
                </Group>
              </Stack>

              <Button
                mt="xl"
                fullWidth
                className="brand-gradient-btn"
                radius="xl"
                size="md"
                leftSection={<IconDownload size={18} />}
                onClick={handleDownload}
              >
                Download Document
              </Button>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Citation Modal */}
      <Modal
        opened={citeOpened}
        onClose={closeCite}
        title={<Text fw={700} c="#0B2545">Citation Information</Text>}
        radius="lg"
        centered
      >
        <Stack gap="md">
          <Text size="sm" fw={600} c="#0B2545">
            APA Format:
          </Text>
          <Box p="sm" bg="#F1F5F9" style={{ borderRadius: 8, fontSize: '0.85rem' }}>
            {apaCitation}
          </Box>
          <CopyButton value={apaCitation}>
            {({ copied, copy }) => (
              <Button
                color={copied ? 'teal' : 'blue'}
                radius="xl"
                leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                onClick={copy}
              >
                {copied ? 'Citation Copied!' : 'Copy APA Citation'}
              </Button>
            )}
          </CopyButton>
        </Stack>
      </Modal>
    </Box>
  );
}
