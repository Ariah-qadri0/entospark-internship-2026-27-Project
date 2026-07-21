import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  CATEGORIES,
  type Category,
  type Condition,
  type Item,
} from "@/lib/inventory-data";
import { useListings, useMine, newItemId } from "@/lib/inventory-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CONDITIONS: Condition[] = ["New", "Like New", "Good", "Used"];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=80";

export const Route = createFileRoute("/sell")({
  component: SellPage,
});

function SellPage() {
  const { setUserItems } = useListings();
  const [, setMine] = useMine();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "Stationery" as Category,
    condition: "Like New" as Condition,
    seller: "",
    college: "",
    image: "",
    stock: "1",
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.seller || !form.college) {
      toast.error("Please fill title, price, seller and college.");
      return;
    }
    const item: Item = {
      id: newItemId(),
      title: form.title.trim(),
      description: form.description.trim() || "No description provided.",
      price: Math.max(0, Number(form.price) || 0),
      category: form.category,
      condition: form.condition,
      seller: form.seller.trim(),
      college: form.college.trim(),
      image: form.image.trim() || FALLBACK_IMAGE,
      stock: Math.max(1, Number(form.stock) || 1),
      createdAt: Date.now(),
    };
    setUserItems((prev) => [item, ...prev]);
    setMine((prev) => [item.id, ...prev]);
    toast.success("Listed!", { description: item.title });
    navigate({ to: "/item/$id", params: { id: item.id } });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">List an item</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Stored locally on this device. Fill in the details below.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5">
        <Field label="Title">
          <Input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Engineering Physics — HK Malik"
          />
        </Field>

        <Field label="Description">
          <Textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Condition details, edition, marks etc."
            rows={4}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Price (₹)">
            <Input
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
            />
          </Field>
          <Field label="Stock">
            <Input
              type="number"
              min={1}
              value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <Select
              value={form.category}
              onValueChange={(v) => set("category", v as Category)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Condition">
            <Select
              value={form.condition}
              onValueChange={(v) => set("condition", v as Condition)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONDITIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Your name">
            <Input
              value={form.seller}
              onChange={(e) => set("seller", e.target.value)}
              placeholder="Aarav Mehta"
            />
          </Field>
          <Field label="College">
            <Input
              value={form.college}
              onChange={(e) => set("college", e.target.value)}
              placeholder="IIT Bombay"
            />
          </Field>
        </div>

        <Field label="Image URL (optional CDN link)">
          <Input
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
            placeholder="https://images.unsplash.com/…"
          />
        </Field>

        <div className="flex gap-2 pt-2">
          <Button type="submit">Publish listing</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate({ to: "/" })}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
