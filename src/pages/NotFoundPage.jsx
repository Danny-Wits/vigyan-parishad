import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Title, Text, Button, Box, Stack } from '@mantine/core';
import { IconHome, IconArrowLeft } from '@tabler/icons-react';

export function NotFoundPage() {
  return (
    <Container size="md" py={100} style={{ textAlign: 'center' }}>
      <Stack align="center" gap="md">
        <Text
          fw={900}
          style={{
            fontSize: '6rem',
            lineHeight: 1,
            color: '#CBD5E1',
            letterSpacing: '-0.05em',
          }}
        >
          404
        </Text>
        <Title order={1} c="#0B2545" fw={800}>
          Page Not Found
        </Title>
        <Text size="md" c="#64748B" style={{ maxWidth: 480 }}>
          The page or resource you are seeking does not exist or may have been relocated.
          Please return to the Vigyan Parishad homepage.
        </Text>
        <Button
          component={Link}
          to="/"
          className="brand-gradient-btn"
          size="md"
          radius="xl"
          mt="md"
          leftSection={<IconHome size={18} />}
        >
          Back to Homepage
        </Button>
      </Stack>
    </Container>
  );
}
