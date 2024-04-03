export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  phoneOwner: number;
  stockQuantity: number;
  sold: number;
  view: number;
  urlVideo: string;
  category: string;
  cannangdonggoi: number;
  thetich_dai: number;
  thetich_rong: number;
  thetich_cao: number;
  productImages: ProductImage[];
  productSize: ProductSize[];
  relatedProducts: any[]; // Đối tượng này có thể được mô tả chi tiết hơn nếu bạn biết cấu trúc của nó
  brand: Brand;
  featured: boolean;
  published: boolean;
  colors: String;
}

interface ProductImage {
  id: number;
  urlimg: string;
}

interface ProductSize {
  id: number;
  size: string;
  quantity: number;
}

interface Brand {
  id: number;
  name: string;
  slug: string;
  urlBrand: string;
}

export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}
export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: 'createdAt' | 'price' | 'rating' | 'sold' | 'view'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
  category?: string
}
