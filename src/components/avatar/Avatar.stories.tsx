import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

// ─── Custom fallback icon ────────────────────────────────────────────────────

const BotIcon = (): React.JSX.Element => (
  <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="8" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 8V6a4 4 0 018 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="14" r="1.5" fill="currentColor" />
    <circle cx="15" cy="14" r="1.5" fill="currentColor" />
    <path d="M9 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An avatar component that renders an image, falls back to initials, then to an icon. Supports circle and rounded square shapes in sm, md, and lg sizes.",
      },
    },
  },
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    initials: { control: "text" },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    shape: { control: "radio", options: ["circle", "square"] },
  },
  args: {
    size: "md",
    shape: "circle",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Base ────────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Image ───────────────────────────────────────────────────────────────────

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "Jane Doe",
  },
};

export const BrokenImage: Story = {
  args: {
    src: "https://broken.url/image.jpg",
    alt: "Broken image",
    initials: "BD",
  },
};

// ─── Initials ────────────────────────────────────────────────────────────────

export const WithInitials: Story = {
  args: { initials: "JD", alt: "Jane Doe" },
};

export const SingleInitial: Story = {
  args: { initials: "A", alt: "Alice" },
};

// ─── Icon fallback ───────────────────────────────────────────────────────────

export const DefaultIcon: Story = {
  args: { alt: "Unknown user" },
};

export const CustomIcon: Story = {
  args: {
    fallbackIcon: <BotIcon />,
    alt: "Bot user",
  },
};

// ─── Shapes ──────────────────────────────────────────────────────────────────

export const Circle: Story = {
  args: { shape: "circle", initials: "JD" },
};

export const Square: Story = {
  args: { shape: "square", initials: "JD" },
};

export const AllShapes: Story = {
  render: (): React.JSX.Element => (
    <div className="flex items-center gap-4">
      <Avatar shape="circle" initials="JD" alt="Circle" />
      <Avatar shape="square" initials="JD" alt="Square" />
    </div>
  ),
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: (): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Avatar size="sm" initials="JD" alt="Small" />
      <Avatar size="md" initials="JD" alt="Medium" />
      <Avatar size="lg" initials="JD" alt="Large" />
    </div>
  ),
};

export const AllSizesWithImage: Story = {
  render: (): React.JSX.Element => (
    <div className="flex items-end gap-4">
      <Avatar size="sm" src="https://i.pravatar.cc/150?img=5" alt="Small" />
      <Avatar size="md" src="https://i.pravatar.cc/150?img=5" alt="Medium" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?img=5" alt="Large" />
    </div>
  ),
};

// ─── Fallback chain ──────────────────────────────────────────────────────────

export const FallbackChain: Story = {
  render: (): React.JSX.Element => (
    <div className="flex items-center gap-4">
      <Avatar src="https://i.pravatar.cc/150?img=8" alt="Image" />
      <Avatar initials="AB" alt="Initials" />
      <Avatar alt="Default icon" />
      <Avatar fallbackIcon={<BotIcon />} alt="Custom icon" />
    </div>
  ),
};

// ─── Kitchen sink ────────────────────────────────────────────────────────────

export const KitchenSink: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-col gap-6">
      {/* Circle row */}
      <div className="flex items-end gap-4">
        <Avatar shape="circle" size="sm" src="https://i.pravatar.cc/150?img=1" alt="User 1" />
        <Avatar shape="circle" size="md" initials="JD" alt="Jane Doe" />
        <Avatar shape="circle" size="lg" alt="Unknown" />
      </div>
      {/* Square row */}
      <div className="flex items-end gap-4">
        <Avatar shape="square" size="sm" src="https://i.pravatar.cc/150?img=2" alt="User 2" />
        <Avatar shape="square" size="md" initials="AB" alt="Alice B" />
        <Avatar shape="square" size="lg" fallbackIcon={<BotIcon />} alt="Bot" />
      </div>
    </div>
  ),
};