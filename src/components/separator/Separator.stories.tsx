import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A separator component supporting horizontal and vertical orientations, solid and dashed styles, and an optional centered label.",
      },
    },
  },
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    variant: { control: "radio", options: ["solid", "dashed"] },
    label: { control: "text" },
  },
  args: {
    orientation: "horizontal",
    variant: "solid",
  },
  decorators: [
    (Story): React.JSX.Element => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Base ────────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Orientations ────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
};

export const Vertical: Story = {
  decorators: [
    (): React.JSX.Element => (
      <div className="flex items-center gap-4 h-10">
        <span className="text-sm text-zinc-600">Left</span>
        <Separator orientation="vertical" />
        <span className="text-sm text-zinc-600">Right</span>
      </div>
    ),
  ],
};

// ─── Variants ────────────────────────────────────────────────────────────────

export const Solid: Story = {
  args: { variant: "solid" },
};

export const Dashed: Story = {
  args: { variant: "dashed" },
};

// ─── With label ──────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: { label: "or" },
};

export const WithLongLabel: Story = {
  args: { label: "continue with email" },
};

export const DashedWithLabel: Story = {
  args: { variant: "dashed", label: "or" },
};

// ─── In context ──────────────────────────────────────────────────────────────

export const BetweenContent: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-col gap-4 w-80">
      <p className="text-sm text-zinc-600">Section one content goes here.</p>
      <Separator />
      <p className="text-sm text-zinc-600">Section two content goes here.</p>
    </div>
  ),
  args: {},
};

export const LoginDivider: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-col gap-4 w-80">
      <button className="w-full rounded-lg border border-zinc-200 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
        Continue with Google
      </button>
      <Separator label="or" />
      <button className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 transition-colors">
        Continue with email
      </button>
    </div>
  ),
  args: {},
};

export const VerticalInNav: Story = {
  render: (): React.JSX.Element => (
    <div className="flex items-center gap-3 h-8">
      <span className="text-sm font-medium text-zinc-700">Home</span>
      <Separator orientation="vertical" />
      <span className="text-sm font-medium text-zinc-700">About</span>
      <Separator orientation="vertical" />
      <span className="text-sm font-medium text-zinc-700">Contact</span>
    </div>
  ),
  args: {},
};

// ─── Kitchen sink ────────────────────────────────────────────────────────────

export const KitchenSink: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-col gap-6 w-80">
      <Separator />
      <Separator variant="dashed" />
      <Separator label="or" />
      <Separator variant="dashed" label="continue with email" />
      <div className="flex items-center gap-4 h-8">
        <span className="text-sm text-zinc-500">Left</span>
        <Separator orientation="vertical" />
        <span className="text-sm text-zinc-500">Middle</span>
        <Separator orientation="vertical" variant="dashed" />
        <span className="text-sm text-zinc-500">Right</span>
      </div>
    </div>
  ),
  args: {},
};