export interface Product {
  id: string
  name: string
  slug: string
  category: string
  description: string
  shortDescription: string
  specifications?: string[]
  image: string
  images?: string[]
  features?: string[]
  price?: number
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

export type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  productName: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  userId: string
  userEmail?: string
  userName?: string
  user?: {
    name: string
    email: string
    phone?: string | null
  }
  totalAmount: number
  status: OrderStatus
  paymentStatus: string
  razorpayOrderId?: string | null
  razorpayPaymentId?: string | null
  shippingAddress: string
  contactPhone: string
  trackingNumber?: string | null
  adminNotes?: string | null
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
  phone?: string | null
  passwordResetRequired?: boolean
}
