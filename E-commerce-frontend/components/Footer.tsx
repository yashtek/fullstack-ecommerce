import Link from "next/link"

const Footer = () => (
  <footer className="bg-foreground text-background mt-20">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-xl font-bold mb-4">MAISON</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            Curated essentials for the modern wardrobe. Timeless design meets exceptional quality.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Shop</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link href="/" className="hover:opacity-100 transition-opacity">New Arrivals</Link></li>
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Best Sellers</Link></li>
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Collections</Link></li>
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Sale</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link href="/" className="hover:opacity-100 transition-opacity">About Us</Link></li>
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Sustainability</Link></li>
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Careers</Link></li>
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Shipping & Returns</Link></li>
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Size Guide</Link></li>
            <li><Link href="/" className="hover:opacity-100 transition-opacity">FAQ</Link></li>
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm opacity-50">
        © 2026 MAISON. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
