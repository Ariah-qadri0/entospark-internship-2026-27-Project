import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ShoppingCart, MapPin, User2 } from "lucide-react";
import { toast } from "sonner";
import { useCart, useItem } from "@/lib/inventory-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/item/$id")({
  component: ItemDetail,
});

function ItemDetail() {
  const { id } = Route.useParams();
  const item = useItem(id);
  const { add } = useCart();
  const navigate = useNavigate();

  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-xl font-semibold">Item not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This listing may have been removed.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Back to browse</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {item.icon ? (
            <div className="flex aspect-[4/3] w-full items-center justify-center bg-secondary text-8xl">
              {item.icon}
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="aspect-[4/3] w-full object-cover"
            />
          )}
        </div>


        <div className="space-y-5">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{item.category}</Badge>
              <Badge variant="outline">{item.condition}</Badge>
              <Badge variant="outline">{item.stock} in stock</Badge>
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {item.title}
            </h1>
            <p className="mt-3 text-3xl font-semibold text-primary">
              ₹{item.price}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>

          <Separator />

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User2 className="h-4 w-4" />
              <span>
                Sold by <span className="text-foreground">{item.seller}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{item.college}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              onClick={() => {
                add(item.id);
                toast.success("Added to cart", { description: item.title });
              }}
            >
              <ShoppingCart className="h-4 w-4" /> Add to cart
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                add(item.id);
                navigate({ to: "/cart" });
              }}
            >
              Buy now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
