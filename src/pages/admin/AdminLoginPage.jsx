import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Stack,
  Alert,
  Box,
  Badge,
} from '@mantine/core';
import {
  IconLock,
  IconMail,
  IconAlertCircle,
  IconArrowLeft,
  IconShieldCheck,
  IconKey,
} from '@tabler/icons-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { notifications } from '@mantine/notifications';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const redirectPath = location.state?.from?.pathname || '/admin';

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both your email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await login(email, password);
      if (res.error) {
        setErrorMsg(res.error.message || 'Invalid email or password.');
      } else {
        notifications.show({
          title: 'Welcome Back!',
          message: 'Successfully authenticated into the VPJK Management Portal.',
          color: 'green',
        });
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@vigyanparishad.org');
    setPassword('VigyanAdmin@2026');
    setErrorMsg('');
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 20,
      }}
    >
      <Container size="xs" style={{ width: '100%', maxWidth: 440 }}>
        {/* Header with Logo */}
        <Stack align="center" gap="xs" mb="lg">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="Vigyan Parishad J&K Logo"
              style={{ height: 60, width: 'auto', objectFit: 'contain' }}
            />
          </Link>
          <Group gap={6} align="center">
            <Title order={2} c="#0B2545" fw={800} style={{ fontSize: '1.5rem' }}>
              Management Portal
            </Title>
            <Badge variant="filled" color="blue" size="sm" radius="sm">
              STAFF
            </Badge>
          </Group>
          <Text size="sm" c="#64748B" ta="center">
            Vigyan Parishad J&K (Jammu, Kashmir & Ladakh)
          </Text>
        </Stack>

        <Paper
          withBorder
          shadow="md"
          p="xl"
          radius="lg"
          bg="#FFFFFF"
          style={{ borderColor: '#E2E8F0' }}
        >
          {errorMsg && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              color="red"
              variant="light"
              mb="md"
              radius="md"
              title="Authentication Notice"
            >
              {errorMsg}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Manager Email"
                placeholder="manager@vigyanparishad.org"
                leftSection={<IconMail size={16} color="#64748B" />}
                required
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                radius="md"
                autoComplete="email"
              />

              <PasswordInput
                label="Access Password"
                placeholder="Your secret password"
                leftSection={<IconLock size={16} color="#64748B" />}
                required
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                radius="md"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                radius="xl"
                size="md"
                loading={loading}
                className="brand-gradient-btn"
                leftSection={<IconShieldCheck size={18} />}
                mt="xs"
              >
                Sign In to Portal
              </Button>
            </Stack>
          </form>

          {/* Non-tech manager Quick Fill helper */}
          <Box
            mt="lg"
            p="xs"
            bg="#F1F5F9"
            style={{ borderRadius: 10, textAlign: 'center' }}
          >
            <Text size="xs" c="#64748B" mb={6}>
              Authorized Manager Credentials Hint:
            </Text>
            <Button
              variant="light"
              color="blue"
              size="xs"
              radius="xl"
              leftSection={<IconKey size={14} />}
              onClick={handleFillDemo}
            >
              Auto-fill Manager Account
            </Button>
          </Box>
        </Paper>

        <Group justify="center" mt="lg">
          <Button
            component={Link}
            to="/"
            variant="subtle"
            color="gray"
            size="xs"
            leftSection={<IconArrowLeft size={14} />}
          >
            Back to Public Website
          </Button>
        </Group>
      </Container>
    </Box>
  );
}
