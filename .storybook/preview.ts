import type { Preview } from '@storybook/react-vite';
import * as React from 'react';
import { ThemeProvider } from '../src/lib/theme';
import '../src/index.css';

const preview: Preview = {
  decorators: [
    (Story) => React.createElement(ThemeProvider, null, React.createElement(Story)),
  ],
  parameters: {
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