import { Link } from "@tanstack/react-router";
import type { Item } from "@/lib/inventory-data";
import { Card } from "@/components/ui/card";

export function ItemCard({ item }: { item: Item }) {
  return (
    <Link to="/item/$id" params={{ id: item.id }} className="group block">
      <Card className="overflow-hidden border-border bg-card p-0 transition-colors hover:border-primary/60">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {item.icon ? (
            <div className="flex h-full w-full items-center justify-center bg-secondary text-4xl">
              <span aria-hidden>{item.icon}</span>
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <span className="absolute left-1 top-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground backdrop-blur">
            {item.category}
          </span>
        </div>
        <div className="space-y-0.5 p-2">
          <h3 className="line-clamp-1 text-xs font-medium text-foreground">
            {item.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">
              ₹{item.price}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {item.stock} left
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
