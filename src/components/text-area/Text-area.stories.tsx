import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Text-area";

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An outlined auto-growing textarea with optional label and character count.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    showCount: { control: "boolean" },
    maxLength: { control: "number" },
    placeholder: { control: "text" },
    rows: { control: "number" },
  },
  args: {
    placeholder: "Type something…",
    disabled: false,
    showCount: false,
    rows: 3,
  },
  decorators: [
    (Story): React.JSX.Element => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Base ────────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── With label ──────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: {
    label: "Message",
    placeholder: "Write your message…",
  },
};

// ─── Character count ─────────────────────────────────────────────────────────

export const WithCharCount: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself…",
    maxLength: 150,
    showCount: true,
  },
};

export const CharCountAtLimit: Story = {
  args: {
    label: "Bio",
    maxLength: 50,
    showCount: true,
    value: "This value is exactly at the fifty character limit!",
  },
};

// ─── Auto-grow ───────────────────────────────────────────────────────────────

export const AutoGrow: Story = {
  args: {
    label: "Notes",
    placeholder: "Start typing — I'll grow with you…",
    rows: 2,
  },
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    label: "Read only",
    value: "This field cannot be edited.",
    disabled: true,
  },
};

// ─── Kitchen sink ────────────────────────────────────────────────────────────

export const KitchenSink: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-col gap-5 w-80">
      <Textarea
        label="Message"
        placeholder="Write your message…"
      />
      <Textarea
        label="Bio"
        placeholder="Tell us about yourself…"
        maxLength={150}
        showCount
      />
      <Textarea
        label="Notes"
        placeholder="Start typing — I'll grow…"
        rows={2}
      />
      <Textarea
        label="Disabled"
        value="Cannot edit this field."
        disabled
      />
    </div>
  ),
};
