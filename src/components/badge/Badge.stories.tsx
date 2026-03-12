import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

// ─── Icons ───────────────────────────────────────────────────────────────────

const StarIcon = (): React.JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4 6 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const TagIcon = (): React.JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 1.5h4l5 5-4 4-5-5v-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <circle cx="3.5" cy="3.5" r="0.75" fill="currentColor" />
  </svg>
);

const CheckIcon = (): React.JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A compact badge component with solid and soft styles, three sizes, and optional leading icon.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["solid", "soft"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    children: { control: "text" },
  },
  args: {
    children: "Badge",
    variant: "soft",
    size: "md",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Base ────────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Variants ────────────────────────────────────────────────────────────────

export const Solid: Story = {
  args: { variant: "solid", children: "Solid" },
};

export const Soft: Story = {
  args: { variant: "soft", children: "Soft" },
};

export const AllVariants: Story = {
  render: (): React.JSX.Element => (
    <div className="flex items-center gap-3">
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
    </div>
  ),
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { size: "sm", children: "Small" },
};

export const Medium: Story = {
  args: { size: "md", children: "Medium" },
};

export const Large: Story = {
  args: { size: "lg", children: "Large" },
};

export const AllSizes: Story = {
  render: (): React.JSX.Element => (
    <div className="flex items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

// ─── With leading icon ───────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  args: {
    children: "Featured",
    leadingIcon: <StarIcon />,
  },
};

export const SolidWithIcon: Story = {
  args: {
    variant: "solid",
    children: "Tagged",
    leadingIcon: <TagIcon />,
  },
};

export const AllWithIcons: Story = {
  render: (): React.JSX.Element => (
    <div className="flex items-center gap-3">
      <Badge variant="solid" leadingIcon={<CheckIcon />}>Verified</Badge>
      <Badge variant="soft" leadingIcon={<StarIcon />}>Featured</Badge>
      <Badge variant="soft" leadingIcon={<TagIcon />}>Tagged</Badge>
    </div>
  ),
};

// ─── Kitchen sink ────────────────────────────────────────────────────────────

export const KitchenSink: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="solid" size="sm">Solid sm</Badge>
        <Badge variant="solid" size="md">Solid md</Badge>
        <Badge variant="solid" size="lg">Solid lg</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="soft" size="sm">Soft sm</Badge>
        <Badge variant="soft" size="md">Soft md</Badge>
        <Badge variant="soft" size="lg">Soft lg</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="solid" leadingIcon={<CheckIcon />}>Verified</Badge>
        <Badge variant="soft" leadingIcon={<StarIcon />}>Featured</Badge>
        <Badge variant="soft" size="sm" leadingIcon={<TagIcon />}>Tagged</Badge>
      </div>
    </div>
  ),
};