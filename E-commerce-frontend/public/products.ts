export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  details: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Oversized Linen Blazer",
    price: 189,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop",
    category: "Outerwear",
    description: "A relaxed-fit linen blazer with a modern oversized silhouette. Perfect for layering over casual and dressy outfits alike.",
    details: ["100% European linen", "Oversized fit", "Two-button closure", "Fully lined", "Dry clean only"],
  },
  {
    id: "2",
    name: "Cashmere Crewneck Sweater",
    price: 225,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a25?w=600&h=750&fit=crop",
    category: "Knitwear",
    description: "Ultra-soft cashmere crewneck with a relaxed fit. A timeless wardrobe essential for any season.",
    details: ["100% Grade-A cashmere", "Relaxed fit", "Ribbed cuffs and hem", "Hand wash recommended"],
  },
  {
    id: "3",
    name: "Tailored Wool Trousers",
    price: 165,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop",
    category: "Bottoms",
    description: "Impeccably tailored wool trousers with a high waist and wide leg. Effortlessly elegant.",
    details: ["98% wool, 2% elastane", "High-rise waist", "Wide leg", "Side pockets", "Professional dry clean"],
  },
  {
    id: "4",
    name: "Silk Button-Down Shirt",
    price: 195,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=750&fit=crop",
    category: "Tops",
    description: "A luxurious silk shirt with a classic button-down collar. Transitions seamlessly from day to night.",
    details: ["100% mulberry silk", "Regular fit", "Mother-of-pearl buttons", "Dry clean only"],
  },
  {
    id: "5",
    name: "Leather Crossbody Bag",
    price: 320,
    originalPrice: 395,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop",
    category: "Accessories",
    description: "Minimalist leather crossbody with adjustable strap. Handcrafted from full-grain Italian leather.",
    details: ["Full-grain Italian leather", "Adjustable strap", "Interior zip pocket", "Magnetic closure"],
  },
  {
    id: "6",
    name: "Cotton Midi Dress",
    price: 145,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop",
    category: "Dresses",
    description: "Effortless midi dress in organic cotton. Features a flattering A-line silhouette with pockets.",
    details: ["100% organic cotton", "A-line silhouette", "Side pockets", "Machine washable"],
  },
  {
    id: "7",
    name: "Merino Wool Scarf",
    price: 85,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=750&fit=crop",
    category: "Accessories",
    description: "Lightweight merino wool scarf, perfect for transitional weather. Soft and breathable.",
    details: ["100% extra-fine merino", "Lightweight", "200cm x 70cm", "Hand wash"],
  },
  {
    id: "8",
    name: "Suede Chelsea Boots",
    price: 275,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=750&fit=crop",
    category: "Footwear",
    description: "Classic Chelsea boots in premium suede with a comfortable rubber sole. A year-round staple.",
    details: ["Premium Italian suede", "Rubber sole", "Elastic side panels", "Pull-on tab"],
  },
];

export const categories = [
  { name: "Outerwear", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop" },
  { name: "Knitwear", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop" },
  { name: "Tops", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=500&fit=crop" },
];
