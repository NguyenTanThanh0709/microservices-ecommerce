type Role = 'customer' | 'seller';

export interface User {
  id: string
  role: { id: number; name: Role }[]; // Role được chuyển thành string union type
  email: string;
  phone: string;
  address?: string;
}