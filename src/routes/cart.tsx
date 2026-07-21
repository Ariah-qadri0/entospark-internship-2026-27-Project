import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, useListings } from "@/lib/inventory-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});


function CartPage() {
  const { cart, setQty, remove, clear } = useCart();
  const navigate = useNavigate();

  const { all } = useListings();

  const lines = cart
    .map((l) => ({ line: l, item: all.find((i) => i.id === l.itemId) }))
    .filter((r) => r.item);

  const subtotal = lines.reduce(
    (n, { line, item }) => n + line.qty * (item?.price ?? 0),
    0,
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Your cart</h1>

      {lines.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          Your cart is empty.{" "}
          <Link to="/" className="text-primary hover:underline">
            Browse items
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {lines.map(({ line, item }) =>
              item ? (
                <Card key={line.itemId} className="border-border bg-card">
                  <CardContent className="flex items-center gap-4 p-4">
                    {item.icon ? (
                      <div className="grid h-20 w-20 place-items-center rounded-md bg-secondary text-3xl">
                        {item.icon}
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                    )}

                    <div className="min-w-0 flex-1">
                      <Link
                        to="/item/$id"
                        params={{ id: item.id }}
                        className="block truncate text-sm font-medium hover:underline"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {item.category} · {item.seller}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        ₹{item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 rounded-md border border-border bg-secondary p-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => setQty(item.id, line.qty - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">
                        {line.qty}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() =>
                          setQty(item.id, Math.min(item.stock, line.qty + 1))
                        }
                        disabled={line.qty >= item.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => remove(item.id)}
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ) : null,
            )}
          </div>

          <Card className="h-fit border-border bg-card">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Order summary
              </h2>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items</span>
                <span>
                  {lines.reduce((n, r) => n + r.line.qty, 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="text-primary">₹{subtotal}</span>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  const totalItems = lines.reduce((n, r) => n + r.line.qty, 0);
                  clear();
                  navigate({
                    to: "/order-success",
                    search: { total: subtotal, items: totalItems },
                  });
                }}
              >
                Checkout · ₹{subtotal}
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => clear()}
              >
                Clear cart
              </Button>

            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
