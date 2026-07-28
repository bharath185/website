export interface Product {
  id: string
  name: string
  slug: string
  category: string
  description: string
  shortDescription: string
  specifications?: string[]
  image: string
  features?: string[]
}

export interface EnquiryItem {
  product: Product
  quantity: number
}

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
}
