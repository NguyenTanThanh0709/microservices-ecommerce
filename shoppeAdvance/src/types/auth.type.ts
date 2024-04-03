import { User } from './user.type'
import { SuccessResponse } from './utils.type'

type Role = 'customer' | 'seller';

export type AuthResponse = {
  access_token: string
  refresh_token: string
  id: string;
  role: { id: number; name: Role }[]; // Role được chuyển thành string union type
  phone: string;
  email: string;
  address?: string;
}

export type RefreshTokenRespone = SuccessResponse<{
  access_token: string
}>


export type productReponse = {
  name: string;
  shortDescription: string;
  category: string;
  description: string;
  price: number;
  stockQuantity: number;
  phoneOwner: number;
  isPublished: boolean;
  isFeatured: boolean;
  countSell: number;
  idBrand: number;
  thongtinsize: string;
  cannangdonggoi: number;
  thetichdonggoi: string;
}
