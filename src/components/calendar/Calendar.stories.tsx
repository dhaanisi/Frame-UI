import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar, type DateRange } from "./Calendar";
import { DatePicker, DateRangePicker } from "./DatePicker";

// ─── Calendar Meta ───────────────────────────────────────────────────────────

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A headless calendar supporting single and range selection, past date disabling, specific date disabling, and min/max bounds. Use DatePicker or DateRangePicker for popover variants.",
      },
    },
  },
  argTypes: {
    mode: { control: "radio", options: ["single", "range"] },
    disablePast: { control: "boolean" },
  },
  args: {
    mode: "single",
    disablePast: false,
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Single ──────────────────────────────────────────────────────────────────

export const SingleDefault: Story = {
  render: (): React.JSX.Element => {
    const [selected, setSelected] = React.useState<Date | null>(null);
    return (
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
      />
    );
  },
  args: {},
};

export const SinglePreselected: Story = {
  render: (): React.JSX.Element => {
    const [selected, setSelected] = React.useState<Date | null>(new Date());
    return (
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
      />
    );
  },
  args: {},
};

// ─── Range ───────────────────────────────────────────────────────────────────

export const RangeDefault: Story = {
  render: (): React.JSX.Element => {
    const [range, setRange] = React.useState<DateRange>({ from: null, to: null });
    return (
      <Calendar
        mode="range"
        selectedRange={range}
        onSelectRange={setRange}
      />
    );
  },
  args: {},
};

export const RangePreselected: Story = {
  render: (): React.JSX.Element => {
    const today = new Date();
    const [range, setRange] = React.useState<DateRange>({
      from: today,
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    });
    return (
      <Calendar
        mode="range"
        selectedRange={range}
        onSelectRange={setRange}
      />
    );
  },
  args: {},
};

// ─── Constraints ─────────────────────────────────────────────────────────────

export const DisablePast: Story = {
  render: (): React.JSX.Element => {
    const [selected, setSelected] = React.useState<Date | null>(null);
    return (
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        disablePast
      />
    );
  },
  args: {},
};

export const WithMinMax: Story = {
  render: (): React.JSX.Element => {
    const today = new Date();
    const [selected, setSelected] = React.useState<Date | null>(null);
    return (
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs text-zinc-400">Only dates within ±7 days from today</p>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          minDate={new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)}
          maxDate={new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)}
        />
      </div>
    );
  },
  args: {},
};

export const WithDisabledDates: Story = {
  render: (): React.JSX.Element => {
    const today = new Date();
    const [selected, setSelected] = React.useState<Date | null>(null);
    const disabledDates = [
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8),
    ];
    return (
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs text-zinc-400">+2, +5, +8 days are disabled</p>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          disabledDates={disabledDates}
        />
      </div>
    );
  },
  args: {},
};

// ─── DatePicker popover ──────────────────────────────────────────────────────

export const SinglePopover: Story = {
  render: (): React.JSX.Element => {
    const [selected, setSelected] = React.useState<Date | null>(null);
    return (
      <DatePicker
        selected={selected}
        onSelect={setSelected}
        placeholder="Select a date"
      />
    );
  },
  args: {},
};

export const SinglePopoverDisablePast: Story = {
  render: (): React.JSX.Element => {
    const [selected, setSelected] = React.useState<Date | null>(null);
    return (
      <DatePicker
        selected={selected}
        onSelect={setSelected}
        disablePast
        placeholder="Select a future date"
      />
    );
  },
  args: {},
};

// ─── DateRangePicker popover ─────────────────────────────────────────────────

export const RangePopover: Story = {
  render: (): React.JSX.Element => {
    const [range, setRange] = React.useState<DateRange>({ from: null, to: null });
    return (
      <DateRangePicker
        selectedRange={range}
        onSelectRange={setRange}
        placeholder="Select date range"
      />
    );
  },
  args: {},
};

export const RangePopoverDisablePast: Story = {
  render: (): React.JSX.Element => {
    const [range, setRange] = React.useState<DateRange>({ from: null, to: null });
    return (
      <DateRangePicker
        selectedRange={range}
        onSelectRange={setRange}
        disablePast
        placeholder="Select future range"
      />
    );
  },
  args: {},
};

// ─── Kitchen sink ────────────────────────────────────────────────────────────

export const KitchenSink: Story = {
  render: (): React.JSX.Element => {
    const [single, setSingle] = React.useState<Date | null>(null);
    const [range, setRange] = React.useState<DateRange>({ from: null, to: null });
    const [pickerDate, setPickerDate] = React.useState<Date | null>(null);
    const [pickerRange, setPickerRange] = React.useState<DateRange>({ from: null, to: null });

    return (
      <div className="flex flex-col gap-8 items-start">
        <div className="flex flex-wrap gap-6 items-start">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-zinc-500">Single inline</p>
            <Calendar mode="single" selected={single} onSelect={setSingle} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-zinc-500">Range inline</p>
            <Calendar mode="range" selectedRange={range} onSelectRange={setRange} disablePast />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 items-start">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-zinc-500">Single popover</p>
            <DatePicker selected={pickerDate} onSelect={setPickerDate} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-zinc-500">Range popover</p>
            <DateRangePicker selectedRange={pickerRange} onSelectRange={setPickerRange} />
          </div>
        </div>
      </div>
    );
  },
  args: {},
};