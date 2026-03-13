import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSwitcher } from "./Theme-Switcher";

const meta = {
  title: "UI/ThemeSwitcher",
  component: ThemeSwitcher,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Controls the active color palette and dark/light mode globally. Lives in the header — use the trigger in the top-right to switch themes across all components.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["popover", "icon", "inline"],
      description: "Display variant",
    },
    align: {
      control: "radio",
      options: ["left", "right"],
      description: "Dropdown alignment",
    },
  },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Popover: Story = {
  args: { variant: "popover", align: "right" },
};

export const Icon: Story = {
  args: { variant: "icon" },
};

export const Inline: Story = {
  args: { variant: "inline" },
};