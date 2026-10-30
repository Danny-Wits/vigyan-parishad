import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
  headings: {
    fontFamily: `'Plus Jakarta Sans', sans-serif`,
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.25' },
      h3: { fontSize: '1.5rem', lineHeight: '1.3' },
      h4: { fontSize: '1.25rem', lineHeight: '1.4' },
    },
  },
  colors: {
    navy: [
      '#F0F5FA',
      '#DCE8F4',
      '#B8D1E9',
      '#87B1DC',
      '#4D8DCD',
      '#266FB8',
      '#1A5494',
      '#133F72',
      '#0F2D59',
      '#0B2545',
    ],
    brandBlue: [
      '#EFF6FF',
      '#DBEAFE',
      '#BFDBFE',
      '#93C5FD',
      '#60A5FA',
      '#3B82F6',
      '#2563EB',
      '#1D4ED8',
      '#1E40AF',
      '#1E3A8A',
    ],
    brandRed: [
      '#FEF2F2',
      '#FEE2E2',
      '#FECACA',
      '#FCA5A5',
      '#F87171',
      '#EF4444',
      '#DC2626',
      '#B91C1C',
      '#991B1B',
      '#7F1D1D',
    ],
  },
  primaryColor: 'brandBlue',
  defaultRadius: 'md',
  cursorType: 'pointer',
  components: {
    Container: {
      defaultProps: {
        size: 'xl',
      },
      vars: (theme, props) => {
        if (props.size === 'xl' || !props.size) {
          return {
            root: {
              '--container-size': '1560px',
            },
          };
        }
        return { root: {} };
      },
    },
    Button: {
      defaultProps: {
        radius: 'xl',
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        withBorder: true,
      },
      styles: {
        root: {
          borderColor: '#E2E8F0',
          transition: 'all 0.25s ease',
        },
      },
    },
    Badge: {
      defaultProps: {
        radius: 'xl',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'xl',
      },
      styles: {
        input: {
          borderColor: '#E2E8F0',
        },
      },
    },
    Select: {
      defaultProps: {
        radius: 'xl',
      },
      styles: {
        input: {
          borderColor: '#E2E8F0',
        },
      },
    },
  },
});
