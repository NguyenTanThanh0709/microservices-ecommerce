import { Product } from './product.type'

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = PurchaseStatus

export interface Purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchaseStatus
  user: string
  color:string,
  size:string,
  product: Product
}

export interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}
