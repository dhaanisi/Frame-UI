import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select, type SelectItem } from "./Select";

// ─── Sample data ─────────────────────────────────────────────────────────────

const fruits: SelectItem[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "durian", label: "Durian", disabled: true },
  { value: "elderberry", label: "Elderberry" },
];

const grouped: SelectItem[] = [
  {
    group: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "mango", label: "Mango" },
    ],
  },
  {
    group: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
      { value: "spinach", label: "Spinach", disabled: true },
    ],
  },
  {
    group: "Grains",
    options: [
      { value: "rice", label: "Rice" },
      { value: "wheat", label: "Wheat" },
    ],
  },
];

const timezones: SelectItem[] = [
  {
    group: "Americas",
    options: [
      { value: "utc-5", label: "Eastern Time (UTC-5)" },
      { value: "utc-6", label: "Central Time (UTC-6)" },
      { value: "utc-8", label: "Pacific Time (UTC-8)" },
    ],
  },
  {
    group: "Europe",
    options: [
      { value: "utc+0", label: "London (UTC+0)" },
      { value: "utc+1", label: "Paris (UTC+1)" },
      { value: "utc+2", label: "Helsinki (UTC+2)" },
    ],
  },
  {
    group: "Asia",
    options: [
      { value: "utc+5:30", label: "India (UTC+5:30)" },
      { value: "utc+8", label: "Singapore (UTC+8)" },
      { value: "utc+9", label: "Tokyo (UTC+9)" },
    ],
  },
];

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A custom dropdown select supporting single selection, multi-selection with tags, option groups, disabled options, label, and helper text.",
      },
    },
  },
  decorators: [
    (Story): React.JSX.Element => (
      <div className="w-72 pb-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Single select ───────────────────────────────────────────────────────────

export const Default: Story = {
  render: (): React.JSX.Element => {
    const [value, setValue] = React.useState<string>("");
    return (
      <Select
        items={fruits}
        value={value}
        onChange={setValue}
        placeholder="Select a fruit"
      />
    );
  },
  args: { items: [] },
};

export const WithLabel: Story = {
  render: (): React.JSX.Element => {
    const [value, setValue] = React.useState<string>("");
    return (
      <Select
        items={fruits}
        value={value}
        onChange={setValue}
        label="Favourite fruit"
        placeholder="Pick one…"
      />
    );
  },
  args: { items: [] },
};

export const WithHelperText: Story = {
  render: (): React.JSX.Element => {
    const [value, setValue] = React.useState<string>("");
    return (
      <Select
        items={fruits}
        value={value}
        onChange={setValue}
        label="Favourite fruit"
        helperText="Durian is disabled for obvious reasons."
        placeholder="Pick one…"
      />
    );
  },
  args: { items: [] },
};

export const Preselected: Story = {
  render: (): React.JSX.Element => {
    const [value, setValue] = React.useState<string>("banana");
    return (
      <Select
        items={fruits}
        value={value}
        onChange={setValue}
        label="Fruit"
      />
    );
  },
  args: { items: [] },
};

export const Disabled: Story = {
  render: (): React.JSX.Element => (
    <Select
      items={fruits}
      value="apple"
      label="Fruit"
      disabled
    />
  ),
  args: { items: [] },
};

// ─── Multi select ────────────────────────────────────────────────────────────

export const MultiSelect: Story = {
  render: (): React.JSX.Element => {
    const [values, setValues] = React.useState<string[]>([]);
    return (
      <Select
        items={fruits}
        multi
        values={values}
        onChangeMulti={setValues}
        label="Favourite fruits"
        placeholder="Pick multiple…"
        helperText="You can select more than one."
      />
    );
  },
  args: { items: [] },
};

export const MultiPreselected: Story = {
  render: (): React.JSX.Element => {
    const [values, setValues] = React.useState<string[]>(["apple", "cherry"]);
    return (
      <Select
        items={fruits}
        multi
        values={values}
        onChangeMulti={setValues}
        label="Favourite fruits"
      />
    );
  },
  args: { items: [] },
};

// ─── Option groups ───────────────────────────────────────────────────────────

export const Grouped: Story = {
  render: (): React.JSX.Element => {
    const [value, setValue] = React.useState<string>("");
    return (
      <Select
        items={grouped}
        value={value}
        onChange={setValue}
        label="Food category"
        placeholder="Pick a food…"
      />
    );
  },
  args: { items: [] },
};

export const GroupedMulti: Story = {
  render: (): React.JSX.Element => {
    const [values, setValues] = React.useState<string[]>([]);
    return (
      <Select
        items={grouped}
        multi
        values={values}
        onChangeMulti={setValues}
        label="Food items"
        placeholder="Pick multiple foods…"
      />
    );
  },
  args: { items: [] },
};

export const TimezoneSelect: Story = {
  render: (): React.JSX.Element => {
    const [value, setValue] = React.useState<string>("");
    return (
      <Select
        items={timezones}
        value={value}
        onChange={setValue}
        label="Timezone"
        placeholder="Select your timezone…"
        helperText="Used for scheduling and notifications."
      />
    );
  },
  args: { items: [] },
};

// ─── Kitchen sink ────────────────────────────────────────────────────────────

export const KitchenSink: Story = {
  render: (): React.JSX.Element => {
    const [single, setSingle] = React.useState<string>("");
    const [multi, setMulti] = React.useState<string[]>([]);
    const [grouped_, setGrouped] = React.useState<string>("");

    return (
      <div className="flex flex-col gap-6 w-72 pb-64">
        <Select
          items={fruits}
          value={single}
          onChange={setSingle}
          label="Single select"
          placeholder="Pick one…"
          helperText="Durian is disabled."
        />
        <Select
          items={fruits}
          multi
          values={multi}
          onChangeMulti={setMulti}
          label="Multi select"
          placeholder="Pick multiple…"
        />
        <Select
          items={grouped}
          value={grouped_}
          onChange={setGrouped}
          label="Grouped select"
          placeholder="Pick a food…"
        />
        <Select
          items={fruits}
          value="apple"
          label="Disabled"
          disabled
        />
      </div>
    );
  },
  args: { items: [] },
};