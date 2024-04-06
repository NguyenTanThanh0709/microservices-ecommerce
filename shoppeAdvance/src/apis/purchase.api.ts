import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'api/v1/carts'

interface GetPurchasesParams {
  iduser: number;
}

const purchaseApi = {
  addToCart(body: { customerId:number;productId: number; quantity: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/create`, body)
  },
  getPurchases(idUser: number, token: string) {
    const params: GetPurchasesParams = { iduser: idUser };
    return http.get<SuccessResponse<Purchase[]>>(`${URL}/carts-user-data`, { 
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },  
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponse<void>>(`${URL}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}/cart-item/${purchaseIds[0]}`)
  }
  
}

export default purchaseApi
