import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Center, Loader, Stack, Text } from '@mantine/core';
import { useAdminAuth } from '../../context/AdminAuthContext';

export function AdminProtectedRoute() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Center style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
        <Stack align="center" gap="sm">
          <Loader size="lg" color="blue" />
          <Text size="sm" c="#64748B">
            Verifying manager credentials...
          </Text>
        </Stack>
      </Center>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
