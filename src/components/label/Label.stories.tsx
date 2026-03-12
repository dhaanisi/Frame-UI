import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A semantic label component with optional required/optional indicators and disabled state. Works standalone or paired with form elements via htmlFor.",
      },
    },
  },
  argTypes: {
    children: { control: "text" },
    required: { control: "boolean" },
    optional: { control: "boolean" },
    disabled: { control: "boolean" },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    children: "Label",
    required: false,
    optional: false,
    disabled: false,
    size: "md",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Base ────────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Indicators ──────────────────────────────────────────────────────────────

export const Required: Story = {
  args: { children: "Email address", required: true },
};

export const Optional: Story = {
  args: { children: "Middle name", optional: true },
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { children: "Disabled field", disabled: true },
};

export const DisabledRequired: Story = {
  args: { children: "Disabled required", required: true, disabled: true },
};

export const DisabledOptional: Story = {
  args: { children: "Disabled optional", optional: true, disabled: true },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { children: "Small label", size: "sm" },
};

export const Medium: Story = {
  args: { children: "Medium label", size: "md" },
};

export const Large: Story = {
  args: { children: "Large label", size: "lg" },
};

export const AllSizes: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-col gap-3">
      <Label size="sm">Small label</Label>
      <Label size="md">Medium label</Label>
      <Label size="lg">Large label</Label>
    </div>
  ),
};

// ─── Paired with input ───────────────────────────────────────────────────────

export const PairedWithInput: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-col gap-1.5 w-64">
      <Label htmlFor="email-field" required>
        Email address
      </Label>
      <input
        id="email-field"
        type="email"
        placeholder="you@example.com"
        className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
      />
    </div>
  ),
};

export const PairedDisabled: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-col gap-1.5 w-64">
      <Label htmlFor="disabled-field" disabled>
        Disabled field
      </Label>
      <input
        id="disabled-field"
        type="text"
        placeholder="Cannot edit"
        disabled
        className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-400 bg-zinc-50 outline-none cursor-not-allowed opacity-50"
      />
    </div>
  ),
};

// ─── Kitchen sink ────────────────────────────────────────────────────────────

export const KitchenSink: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-6">
        <Label>Default</Label>
        <Label required>Required</Label>
        <Label optional>Optional</Label>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <Label disabled>Disabled</Label>
        <Label disabled required>Disabled required</Label>
        <Label disabled optional>Disabled optional</Label>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <Label size="sm" required>Small required</Label>
        <Label size="md" optional>Medium optional</Label>
        <Label size="lg">Large default</Label>
      </div>
    </div>
  ),
};