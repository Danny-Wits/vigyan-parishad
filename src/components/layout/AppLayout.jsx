import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mantine/core';
import { Navbar } from './Navbar';
import { AnnouncementTicker } from './AnnouncementTicker';
import { Footer } from './Footer';

export function AppLayout() {
  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Navbar />
      <AnnouncementTicker />
      <Box component="main" style={{ flex: 1, paddingBottom: 60 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
