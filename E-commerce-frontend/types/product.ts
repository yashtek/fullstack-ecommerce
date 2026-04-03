export interface Product {
  id: string;
  productName: string;
  price: string;
  about: string;
  mainImage: {
    url: string;
    public_id: string;
  };
  productImages: any[];
  isLive: boolean;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}