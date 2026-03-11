import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

// ─── Icons ───────────────────────────────────────────────────────────────────

const SearchIcon = (): React.JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MailIcon = (): React.JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 5.5l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LockIcon = (): React.JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const EyeIcon = (): React.JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const HashIcon = (): React.JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6h10M3 10h10M6 2l-1.5 12M11.5 2L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An outlined input component supporting text, email, password, number, and search types — with label, error state, leading/trailing icons, and character count.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search"],
    },
    label: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    showCount: { control: "boolean" },
    maxLength: { control: "number" },
    placeholder: { control: "text" },
  },
  args: {
    type: "text",
    placeholder: "Enter value…",
    disabled: false,
    showCount: false,
  },
  decorators: [
    (Story): React.JSX.Element => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Base ────────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── With label ──────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: {
    label: "Full name",
    placeholder: "John Doe",
  },
};

// ─── Types ───────────────────────────────────────────────────────────────────

export const EmailInput: Story = {
  args: {
    type: "email",
    label: "Email address",
    placeholder: "you@example.com",
    leadingIcon: <MailIcon />,
  },
};

export const PasswordInput: Story = {
  args: {
    type: "password",
    label: "Password",
    placeholder: "••••••••",
    leadingIcon: <LockIcon />,
    trailingIcon: <EyeIcon />,
  },
};

export const NumberInput: Story = {
  args: {
    type: "number",
    label: "Quantity",
    placeholder: "0",
    leadingIcon: <HashIcon />,
  },
};

export const SearchInput: Story = {
  args: {
    type: "search",
    placeholder: "Search…",
    leadingIcon: <SearchIcon />,
  },
};

// ─── Icons ───────────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search anything…",
    leadingIcon: <SearchIcon />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    trailingIcon: <MailIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    leadingIcon: <LockIcon />,
    trailingIcon: <EyeIcon />,
  },
};

// ─── Error state ─────────────────────────────────────────────────────────────

export const WithError: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    leadingIcon: <MailIcon />,
    value: "not-an-email",
    error: "Please enter a valid email address.",
  },
};

export const ErrorNoLabel: Story = {
  args: {
    placeholder: "Enter value…",
    error: "This field is required.",
  },
};

// ─── Character count ─────────────────────────────────────────────────────────

export const WithCharCount: Story = {
  args: {
    label: "Username",
    placeholder: "Pick a username",
    maxLength: 20,
    showCount: true,
  },
};

export const CharCountAtLimit: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    maxLength: 30,
    showCount: true,
    value: "This is exactly thirty chars!!",
  },
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    label: "Read only field",
    placeholder: "Cannot edit this",
    disabled: true,
  },
};

// ─── Kitchen sink ────────────────────────────────────────────────────────────

export const KitchenSink: Story = {
  render: (): React.JSX.Element => (
    <div className="flex flex-col gap-5 w-80">
      <Input
        label="Full name"
        placeholder="John Doe"
      />
      <Input
        type="email"
        label="Email"
        placeholder="you@example.com"
        leadingIcon={<MailIcon />}
      />
      <Input
        type="password"
        label="Password"
        placeholder="••••••••"
        leadingIcon={<LockIcon />}
        trailingIcon={<EyeIcon />}
      />
      <Input
        label="Username"
        placeholder="Pick a username"
        maxLength={20}
        showCount
      />
      <Input
        label="Email"
        placeholder="you@example.com"
        leadingIcon={<MailIcon />}
        value="bad-input"
        error="Please enter a valid email address."
        onChange={(): void => {}}
      />
      <Input
        label="Disabled"
        placeholder="Cannot edit"
        disabled
      />
    </div>
  ),
};