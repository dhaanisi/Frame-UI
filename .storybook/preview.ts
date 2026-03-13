import type { Preview } from '@storybook/react-vite';
import * as React from 'react';
import { ThemeProvider } from '../src/lib/theme';
import { ThemeSwitcher } from '../src/components/theme-switcher/Theme-Switcher';
import '../src/index.css';

const withTheme = (Story: React.ComponentType): React.JSX.Element =>
  React.createElement(
    ThemeProvider,
    { defaultColorMode: "dark", defaultBlueTheme: "electric" },
    React.createElement(
      'div',
      {
        style: {
          minHeight: '100vh',
          backgroundColor: 'var(--color-bg)',
          display: 'flex',
          flexDirection: 'column',
        }
      },

      // ── Header bar ──────────────────────────────────────────────────────
      React.createElement(
        'header',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            height: '52px',
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            flexShrink: 0,
          }
        },

        // Logo
        React.createElement(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
          React.createElement(
            'div',
            {
              style: {
                width: '26px',
                height: '26px',
                borderRadius: '7px',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }
            },
            React.createElement(
              'svg',
              { width: 13, height: 13, viewBox: '0 0 16 16', fill: 'none' },
              React.createElement('rect', { x: 2, y: 2, width: 5, height: 5, rx: 1, fill: 'white' }),
              React.createElement('rect', { x: 9, y: 2, width: 5, height: 5, rx: 1, fill: 'white', opacity: 0.5 }),
              React.createElement('rect', { x: 2, y: 9, width: 5, height: 5, rx: 1, fill: 'white', opacity: 0.5 }),
              React.createElement('rect', { x: 9, y: 9, width: 5, height: 5, rx: 1, fill: 'white' }),
            )
          ),
          React.createElement(
            'span',
            {
              style: {
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--color-text)',
                letterSpacing: '-0.01em',
              }
            },
            'Frame UI'
          )
        ),

        // ThemeSwitcher trigger
        React.createElement(ThemeSwitcher, { variant: 'popover', align: 'right' })
      ),

      // ── Story content ───────────────────────────────────────────────────
      React.createElement(
        'main',
        { style: { flex: 1 } },
        React.createElement(Story)
      )
    )
  );

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;