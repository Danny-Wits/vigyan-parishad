import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, Anchor, Text, Box } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

export function BreadcrumbsNav({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <Box py="sm">
      <Breadcrumbs
        separator={<IconChevronRight size={14} color="#94A3B8" />}
        styles={{
          breadcrumb: {
            fontSize: '0.875rem',
          },
        }}
      >
        <Anchor
          component={Link}
          to="/"
          c="#2563EB"
          underline="hover"
          fw={500}
        >
          Home
        </Anchor>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          if (isLast || !item.href) {
            return (
              <Text key={index} c="#64748B" fw={500} size="sm">
                {item.title}
              </Text>
            );
          }
          return (
            <Anchor
              key={index}
              component={Link}
              to={item.href}
              c="#2563EB"
              underline="hover"
              fw={500}
            >
              {item.title}
            </Anchor>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
