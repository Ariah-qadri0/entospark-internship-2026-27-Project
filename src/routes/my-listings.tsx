import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useListings, useMine } from "@/lib/inventory-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/my-listings")({
  component: MyListings,
});

function MyListings() {
  const { userItems, setUserItems } = useListings();
  const [mine, setMine] = useMine();

  const items = userItems.filter((i) => mine.includes(i.id));

  const remove = (id: string) => {
    setUserItems((p) => p.filter((i) => i.id !== id));
    setMine((p) => p.filter((x) => x !== id));
    toast.success("Listing removed");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My listings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Items you've listed on this device.
          </p>
        </div>
        <Button asChild>
          <Link to="/sell">
            <PlusCircle className="h-4 w-4" /> New listing
          </Link>
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          You haven't listed anything yet.
        </div>
      ) : (
        <div className="mt-8 grid gap-3">
          {items.map((it) => (
            <Card key={it.id} className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <img
                  src={it.image}
                  alt={it.title}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {it.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {it.condition}
                    </span>
                  </div>
                  <Link
                    to="/item/$id"
                    params={{ id: it.id }}
                    className="mt-1 block truncate text-sm font-medium hover:underline"
                  >
                    {it.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    ₹{it.price} · {it.stock} in stock
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => remove(it.id)}
                  aria-label="Remove listing"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
