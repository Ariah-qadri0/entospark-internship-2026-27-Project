import { Link, useRouterState } from "@tanstack/react-router";
import { GraduationCap, ShoppingCart, Package, PlusCircle } from "lucide-react";
import { useCart } from "@/lib/inventory-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Browse" },
  { to: "/admin", label: "Admin" },
  { to: "/sell", label: "Sell" },
  { to: "/my-listings", label: "My Listings" },
];


export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { cart } = useCart();
  const count = cart.reduce((n, l) => n + l.qty, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-semibold tracking-tight">CampusCart</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active =
              n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  active && "bg-secondary text-foreground",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild size="sm" variant="secondary" className="md:hidden">
            <Link to="/sell">
              <PlusCircle className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="secondary" className="md:hidden">
            <Link to="/my-listings">
              <Package className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="default">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-5 min-w-5 justify-center px-1.5 text-xs"
                >
                  {count}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
