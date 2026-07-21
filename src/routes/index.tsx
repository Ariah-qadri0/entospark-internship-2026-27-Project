import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useListings } from "@/lib/inventory-store";
import { CATEGORIES, type Category } from "@/lib/inventory-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ItemCard } from "@/components/item-card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: BrowsePage,
});

function BrowsePage() {
  const { all } = useListings();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all
      .filter((i) => (cat === "All" ? true : i.category === cat))
      .filter((i) =>
        q
          ? i.title.toLowerCase().includes(q) ||
            i.description.toLowerCase().includes(q) ||
            i.college.toLowerCase().includes(q)
          : true,
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [all, query, cat]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-10">
        <div className="rounded-xl border border-border bg-card p-8 md:p-12">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            Student marketplace
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Buy and sell campus essentials with students from your college.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Stationery, notebooks, academic books, sports gear and uniforms —
            all listed by students, stored locally on your device.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild>
              <a href="#browse">Browse items</a>
            </Button>
            <Button asChild variant="secondary">
              <a href="/sell">Sell something</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="browse" className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search items, colleges…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c as Category | "All")}
                className={cn(
                  "rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
                  cat === c &&
                    "border-primary bg-primary text-primary-foreground hover:text-primary-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            No items match your search.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {filtered.map((i) => (
              <ItemCard key={i.id} item={i} />
            ))}
          </div>

        )}
      </section>
    </div>
  );
}
