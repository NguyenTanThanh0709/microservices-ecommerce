import React from 'react';
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig, Product as ProductType } from 'src/types/product.type'
import Product from 'src/pages/ProductList/components/Product/Product'

interface MenuItem {
  name: string;
  count?: number; // Optional property
}

const Navbar: React.FC = () => {
  // Sample data
  const menuItems: MenuItem[] = [
    { name: 'Tất cả', count: 3 },
    { name: 'Đồ ăn vặt' },
    { name: 'Đồng hồ' },
    { name: 'Quần áo' },
    { name: 'Giày' }

  ];


  const queryConfig = useQueryConfig()
  // console.log('queryParam', queryParam)
  // Product list use query to get data from server
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      <ul className="col-span-1 md:col-span-2 xl:col-span-1 space-y-2 font-medium">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span className="flex-1 ms-3 whitespace-nowrap">{item.name}</span>
              {item.count && (
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{item.count}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
      <div className="col-span-5 md:col-span-2 xl:col-span-5">
      {productsData && (
            <div className='sticky z-10 col-span-9'>
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product: ProductType) => (
                  <div className='col-span-1' key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default Navbar;
