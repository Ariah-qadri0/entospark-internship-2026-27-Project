import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Search = { total?: number; items?: number; order?: string };

export const Route = createFileRoute("/order-success")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    total: typeof s.total === "number" ? s.total : Number(s.total) || 0,
    items: typeof s.items === "number" ? s.items : Number(s.items) || 0,
    order: typeof s.order === "string" ? s.order : undefined,
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { total = 0, items = 0, order } = useSearch({ from: "/order-success" });
  const orderId =
    order ?? `CC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <Card className="border-border bg-card">
        <CardContent className="p-10 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">
            Order placed successfully
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Thanks for shopping on CampusCart. Your order has been confirmed.
          </p>

          <div className="mt-8 space-y-2 rounded-lg border border-border bg-secondary/40 p-4 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items</span>
              <span>{items}</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Total paid</span>
              <span className="text-primary">₹{total}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link to="/">
                <Package className="h-4 w-4" /> Continue shopping
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/admin">Back to admin</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
