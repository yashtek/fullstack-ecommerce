"use client"
import  Link  from "next/link";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const Navbar = () => {
//   const { totalItems, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link href="/" className="font-display text-xl md:text-2xl font-bold tracking-tight text-foreground">
            MAISON
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              New Arrivals
            </Link>
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Collections
            </Link>
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sale
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <div className="hidden md:flex items-center gap-2 animate-fade-in">
                <Input
                  placeholder="Search products..."
                  className="w-48 h-9 text-sm"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              </div>
            ) : (
              <button
                className="hidden md:flex p-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={18} />
              </button>
            )}

            <Link href="/login">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                <User size={18} />
              </Button>
            </Link>

            <button
              className="relative p-2 text-foreground hover:text-primary transition-colors"
            //   onClick={() => setIsDrawerOpen(true)}
            >
              <ShoppingBag size={18} />
              {/* {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )} */}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border py-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              <Input placeholder="Search products..." className="h-10" />
              <Link href="/" className="text-sm font-medium py-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/" className="text-sm font-medium py-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>New Arrivals</Link>
              <Link href="/" className="text-sm font-medium py-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
              <Link href="/" className="text-sm font-medium py-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>Sale</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
