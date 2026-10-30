import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Group,
  Badge,
  ActionIcon,
  Text,
  Box,
  Container,
} from '@mantine/core';
import {
  IconSpeakerphone,
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPause,
  IconPlayerPlay,
} from '@tabler/icons-react';
import { useAnnouncements } from '../../hooks/useAnnouncements';

export function AnnouncementTicker() {
  const { data: announcements = [] } = useAnnouncements();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeAnnouncements = announcements.filter((a) => a.is_active !== false);

  useEffect(() => {
    if (isPaused || activeAnnouncements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, activeAnnouncements.length]);

  const handleNext = () => {
    if (activeAnnouncements.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
  };

  const handlePrev = () => {
    if (activeAnnouncements.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + activeAnnouncements.length) % activeAnnouncements.length);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const currentItem = activeAnnouncements[currentIndex] || {
    title: 'National Science Seminar 2026 | 23rd November 2026 | Registrations Open ->',
    link: '/events/national-science-seminar-2026',
  };

  return (
    <Box
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        paddingTop: 6,
        paddingBottom: 6,
      }}
    >
      <Container size="xl">
        <Group justify="space-between" wrap="nowrap" gap="sm">
          {/* Latest Badge */}
          <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
            <Badge
              leftSection={<IconSpeakerphone size={14} stroke={2.5} />}
              radius="xl"
              size="lg"
              style={{
                background: 'linear-gradient(90deg, #F04336 0%, #2563EB 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.8125rem',
                textTransform: 'none',
                paddingLeft: 12,
                paddingRight: 14,
                boxShadow: '0 2px 8px rgba(240, 67, 54, 0.25)',
              }}
            >
              Latest:
            </Badge>
          </Group>

          {/* Scrolling/Animated Ticker Content */}
          <Box
            style={{
              flex: 1,
              overflow: 'hidden',
              minWidth: 0,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            {/* Desktop continuous multi-item or current item */}
            <Group
              gap="md"
              wrap="nowrap"
              style={{
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              <Text
                component={Link}
                to={currentItem.link || '/events'}
                size="sm"
                truncate
                style={{
                  color: '#1E293B',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>{currentItem.title}</span>
              </Text>

              {/* Show second announcement if wide screen */}
              {activeAnnouncements.length > 1 && (
                <Group gap="xs" wrap="nowrap" visibleFrom="md">
                  <Box
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: '#2563EB',
                      flexShrink: 0,
                    }}
                  />
                  <Text
                    component={Link}
                    to={
                      activeAnnouncements[(currentIndex + 1) % activeAnnouncements.length]?.link ||
                      '/events'
                    }
                    size="sm"
                    c="#475569"
                    truncate
                    style={{ textDecoration: 'none' }}
                  >
                    {activeAnnouncements[(currentIndex + 1) % activeAnnouncements.length]?.title}
                  </Text>
                </Group>
              )}
            </Group>
          </Box>

          {/* Next / Prev / Pause Controls */}
          <Group gap={4} wrap="nowrap" style={{ flexShrink: 0 }}>
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              radius="xl"
              onClick={handlePrev}
              aria-label="Previous announcement"
              style={{ color: '#475569' }}
            >
              <IconChevronLeft size={16} stroke={2} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              radius="xl"
              onClick={handleNext}
              aria-label="Next announcement"
              style={{ color: '#475569' }}
            >
              <IconChevronRight size={16} stroke={2} />
            </ActionIcon>
            <ActionIcon
              variant={isPaused ? 'filled' : 'subtle'}
              color={isPaused ? 'blue' : 'gray'}
              size="sm"
              radius="xl"
              onClick={togglePause}
              aria-label={isPaused ? 'Resume ticker' : 'Pause ticker'}
              style={{ color: isPaused ? '#FFFFFF' : '#475569' }}
            >
              {isPaused ? (
                <IconPlayerPlay size={14} stroke={2} />
              ) : (
                <IconPlayerPause size={14} stroke={2} />
              )}
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
