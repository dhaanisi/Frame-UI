import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Avatar } from "../avatar/Avatar";
import { Badge } from "../badge/Badge";
import { Button } from "../button/Button";

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A compound card component with Card.Image, Card.Header, Card.Title, Card.Description, Card.Body, and Card.Footer sub-components. Supports elevated shadow and clickable states.",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Base ────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { children: null },
  render: (): React.JSX.Element => (
    <Card className="w-72">
      <Card.Header>
        <Card.Title>Card title</Card.Title>
        <Card.Description>A simple card with a header.</Card.Description>
      </Card.Header>
    </Card>
  ),
};

// ─── With body ───────────────────────────────────────────────────────────────

export const WithBody: Story = {
  args: { children: null },
  render: (): React.JSX.Element => (
    <Card className="w-72">
      <Card.Header>
        <Card.Title>Getting started</Card.Title>
        <Card.Description>Everything you need to know to get up and running.</Card.Description>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-zinc-600">
          This is the card body. Use it for any freeform content — lists, stats, rich text, whatever fits.
        </p>
      </Card.Body>
    </Card>
  ),
};

// ─── With image ──────────────────────────────────────────────────────────────

export const WithImage: Story = {
  args: { children: null },
  render: (): React.JSX.Element => (
    <Card className="w-72">
      <Card.Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" alt="Mountain landscape" />
      <Card.Header>
        <Card.Title>Mountain escape</Card.Title>
        <Card.Description>A breathtaking view from the summit.</Card.Description>
      </Card.Header>
    </Card>
  ),
};

// ─── With footer ─────────────────────────────────────────────────────────────

export const WithFooter: Story = {
  args: { children: null },
  render: (): React.JSX.Element => (
    <Card className="w-72">
      <Card.Header>
        <Card.Title>Upgrade your plan</Card.Title>
        <Card.Description>Get access to all features with our Pro plan.</Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button size="sm">Upgrade</Button>
        <Button size="sm" variant="ghost">Learn more</Button>
      </Card.Footer>
    </Card>
  ),
};

// ─── Clickable ───────────────────────────────────────────────────────────────

export const Clickable: Story = {
  args: { children: null },
  render: (): React.JSX.Element => (
    <Card className="w-72" clickable onClick={(): void => alert("Card clicked!")}>
      <Card.Image src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80" alt="Snowy mountain" />
      <Card.Header>
        <Card.Title>Click me</Card.Title>
        <Card.Description>This entire card is interactive.</Card.Description>
      </Card.Header>
    </Card>
  ),
};

// ─── With avatar + badge ─────────────────────────────────────────────────────

export const ProfileCard: Story = {
  args: { children: null },
  render: (): React.JSX.Element => (
    <Card className="w-72">
      <Card.Header>
        <div className="flex items-center justify-between">
          <Avatar
            src="https://i.pravatar.cc/150?img=12"
            alt="Sarah Chen"
            size="lg"
          />
          <Badge variant="soft">Pro</Badge>
        </div>
        <Card.Title as="h4">Sarah Chen</Card.Title>
        <Card.Description>Product designer based in San Francisco.</Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button size="sm" fullWidth>View profile</Button>
      </Card.Footer>
    </Card>
  ),
};

// ─── Full composition ────────────────────────────────────────────────────────

export const FullCard: Story = {
  args: { children: null },
  render: (): React.JSX.Element => (
    <Card className="w-72">
      <Card.Image
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80"
        alt="Lake at sunset"
      />
      <Card.Header>
        <div className="flex items-center justify-between">
          <Badge variant="solid">Featured</Badge>
        </div>
        <Card.Title>Lake at sunset</Card.Title>
        <Card.Description>A peaceful evening by the lake, captured in golden hour.</Card.Description>
      </Card.Header>
      <Card.Body>
        <p className="text-xs text-zinc-400">Taken in Banff National Park, Canada</p>
      </Card.Body>
      <Card.Footer>
        <Button size="sm">View details</Button>
        <Button size="sm" variant="ghost">Save</Button>
      </Card.Footer>
    </Card>
  ),
};

// ─── Kitchen sink ────────────────────────────────────────────────────────────

export const KitchenSink: Story = {
  args: { children: null },
  render: (): React.JSX.Element => (
    <div className="flex flex-wrap gap-5 items-start">
      {/* Simple */}
      <Card className="w-64">
        <Card.Header>
          <Card.Title>Simple card</Card.Title>
          <Card.Description>Just a header, nothing else.</Card.Description>
        </Card.Header>
      </Card>

      {/* With image + footer */}
      <Card className="w-64">
        <Card.Image src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80" alt="Flowers" />
        <Card.Header>
          <Card.Title>Spring bloom</Card.Title>
          <Card.Description>Flowers in full season.</Card.Description>
        </Card.Header>
        <Card.Footer>
          <Button size="sm">View</Button>
        </Card.Footer>
      </Card>

      {/* Clickable profile */}
      <Card className="w-64" clickable>
        <Card.Header>
          <Avatar initials="MK" size="md" />
          <Card.Title as="h4">Mike Kim</Card.Title>
          <Card.Description>Software engineer · Remote</Card.Description>
        </Card.Header>
        <Card.Footer>
          <Badge variant="soft">Available</Badge>
        </Card.Footer>
      </Card>
    </div>
  ),
};