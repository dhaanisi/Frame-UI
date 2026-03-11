import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

// ─── icons (swap for your icon library) ────────────────────────────────────
const ArrowRight = (): React.JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Plus = (): React.JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Trash = (): React.JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v5M10 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
// ───────────────────────────────────────────────────────────────────────────

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component with multiple variants, sizes, loading state, and icon support.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive"],
      description: "Visual style of the button",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size of the button",
    },
    loading: {
      control: "boolean",
      description: "Shows spinner and disables interaction",
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
    fullWidth: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Base ───────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Variants ───────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: "primary", children: "Primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

// ─── Sizes ──────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { size: "sm", children: "Small" },
};

export const Medium: Story = {
  args: { size: "md", children: "Medium" },
};

export const Large: Story = {
  args: { size: "lg", children: "Large" },
};

// ─── All sizes side-by-side ──────────────────────────────────────────────────

export const AllSizes: Story = {
  render: (): React.JSX.Element => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// ─── All variants side-by-side ───────────────────────────────────────────────

export const AllVariants: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

// ─── Icons ──────────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  args: {
    children: "Add item",
    leadingIcon: <Plus />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    children: "Continue",
    trailingIcon: <ArrowRight />,
  },
};

export const DestructiveWithIcon: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
    leadingIcon: <Trash />,
  },
};

// ─── States ─────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { loading: true, children: "Saving…" },
};

export const LoadingSecondary: Story = {
  args: { variant: "secondary", loading: true, children: "Loading…" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};

// ─── Full width ──────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  decorators: [
    (Story): React.JSX.Element => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: { fullWidth: true, children: "Full width button" },
};

// ─── Kitchen sink ────────────────────────────────────────────────────────────

export const KitchenSink: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" size="sm" leadingIcon={<Plus />}>Add</Button>
        <Button variant="primary" size="md" trailingIcon={<ArrowRight />}>Continue</Button>
        <Button variant="primary" size="lg">Get started</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" size="sm">Cancel</Button>
        <Button variant="secondary" size="md" leadingIcon={<Plus />}>New item</Button>
        <Button variant="ghost" size="md">Learn more</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" loading>Saving…</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="destructive" leadingIcon={<Trash />}>Delete</Button>
      </div>
    </div>
  ),
};