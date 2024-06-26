import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
const URL = '/api/v1/products/'
interface GetPurchasesParams {
  iduser: number;
}

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}${id}`)
  },
  getProductByUser(idUser: number) {
    const params: GetPurchasesParams = { iduser: idUser };
    return http.get<SuccessResponse<Product[]>>(`${URL}user`, { 
      params
    });
  },  
}
export default productApi
