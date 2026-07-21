import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, PlusCircle, Package } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CONDITIONS: Condition[] = ["New", "Like New", "Good", "Used"];

const ICON_PRESETS = ["📘", "✏️", "📓", "📐", "🎒", "🏀", "🏸", "👕", "🧮", "🖊️", "📚", "⚽"];

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { userItems, setUserItems } = useListings();
  const [, setMine] = useMine();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "Stationery" as Category,
    condition: "New" as Condition,
    seller: "Admin",
    college: "Campus",
    image: "",
    icon: "📦",
    useIcon: true,
    stock: "1",
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price) {
      toast.error("Title and price are required.");
      return;
    }
    const item: Item = {
      id: newItemId(),
      title: form.title.trim(),
      description: form.description.trim() || "No description provided.",
      price: Math.max(0, Number(form.price) || 0),
      category: form.category,
      condition: form.condition,
      seller: form.seller.trim() || "Admin",
      college: form.college.trim() || "Campus",
      image:
        form.image.trim() ||
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=80",
      icon: form.useIcon ? form.icon : undefined,
      stock: Math.max(1, Number(form.stock) || 1),
      createdAt: Date.now(),
    };
    setUserItems((prev) => [item, ...prev]);
    setMine((prev) => [item.id, ...prev]);
    toast.success("Item added to inventory", { description: item.title });
    setForm((p) => ({ ...p, title: "", description: "", price: "", stock: "1" }));
  };

  const remove = (id: string) => {
    setUserItems((p) => p.filter((i) => i.id !== id));
    setMine((p) => p.filter((x) => x !== id));
    toast.success("Item removed");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
          <Package className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin panel</h1>
          <p className="text-sm text-muted-foreground">
            Add inventory items locally — they show up on the browse page instantly.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
        <Card className="h-fit border-border bg-card">
          <CardContent className="p-6">
            <form onSubmit={submit} className="space-y-4">
              <Field label="Title">
                <Input
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. Blue Gel Pen"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
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

              <div className="grid grid-cols-2 gap-3">
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

              <Field label="Description">
                <Textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Optional details"
                />
              </Field>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  Display as
                </Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => set("useIcon", true)}
                    className={`flex-1 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                      form.useIcon
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-secondary text-muted-foreground"
                    }`}
                  >
                    Icon
                  </button>
                  <button
                    type="button"
                    onClick={() => set("useIcon", false)}
                    className={`flex-1 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                      !form.useIcon
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-secondary text-muted-foreground"
                    }`}
                  >
                    Image URL
                  </button>
                </div>
              </div>

              {form.useIcon ? (
                <Field label="Pick an icon">
                  <div className="flex flex-wrap gap-1.5">
                    {ICON_PRESETS.map((ic) => (
                      <button
                        type="button"
                        key={ic}
                        onClick={() => set("icon", ic)}
                        className={`grid h-9 w-9 place-items-center rounded-md border text-lg transition-colors ${
                          form.icon === ic
                            ? "border-primary bg-primary/10"
                            : "border-border bg-secondary hover:border-primary/60"
                        }`}
                      >
                        {ic}
                      </button>
                    ))}
                    <Input
                      value={form.icon}
                      onChange={(e) => set("icon", e.target.value)}
                      className="h-9 w-16 text-center"
                    />
                  </div>
                </Field>
              ) : (
                <Field label="Image URL">
                  <Input
                    value={form.image}
                    onChange={(e) => set("image", e.target.value)}
                    placeholder="https://…"
                  />
                </Field>
              )}

              <Button type="submit" className="w-full">
                <PlusCircle className="h-4 w-4" /> Add item
              </Button>
            </form>
          </CardContent>
        </Card>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Local inventory ({userItems.length})
            </h2>
            <Link to="/" className="text-xs text-primary hover:underline">
              View storefront →
            </Link>
          </div>

          {userItems.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              No admin-added items yet. Use the form to add your first one.
            </div>
          ) : (
            <div className="grid gap-2">
              {userItems.map((it) => (
                <Card key={it.id} className="border-border bg-card">
                  <CardContent className="flex items-center gap-3 p-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-md bg-secondary">
                      {it.icon ? (
                        <span className="text-2xl">{it.icon}</span>
                      ) : (
                        <img
                          src={it.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {it.category}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          {it.condition}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-sm font-medium">
                        {it.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ₹{it.price} · {it.stock} in stock
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => remove(it.id)}
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
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
