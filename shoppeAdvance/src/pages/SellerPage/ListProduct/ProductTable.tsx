import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from 'src/types/product.type';
import axiosInstance from 'src/apis/axiosClient'; 



const MaxProductCount = 999;

const ProductTable: React.FC<{ products: Product[] }> = ({ products }) => {
  const [uploadedProducts, setUploadedProducts] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    filterProducts(selectedTab);
    if(selectedTab=== 'all'){
      setFilteredProducts(products);
    }
  }, [products, selectedTab]);

  const handleUpload = () => {
    setUploadedProducts(prevCount => prevCount + 1);
  };

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    filterProducts(tab);
  };

  const filterProducts = (tab: string) => {
    if (tab === 'outOfStock') {
      const outOfStockProducts = products.filter(product => product.stockQuantity === 0);
      setFilteredProducts(outOfStockProducts);
    } else {
      setFilteredProducts(products);
    }
  };

  const tabs = [
    { key: 'all', label: 'Tất Cả' },
    { key: 'active', label: 'Đang Hoạt Động' },
    { key: 'outOfStock', label: 'Hết Hàng' },
  ];

  const navigate = useNavigate();
  const handleEditProduct = (productId: number) => {
    navigate(`/admin-home/1-${productId}`);
  };

  const fetchUpProduct = async (id:number) => {
    console.log(id)
    try {
        const response = await axiosInstance.patch('/api/v1/products/delete-product?id='+  id);
        if(response.status === 200) {
            alert("Ẩn sản phẩm thành công")
            return response.data
        }
        console.log(response)

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const fetchUpProduct1 = async (id:number) => {
  console.log(id)
  try {
      const response = await axiosInstance.patch('/api/v1/products/show-product?id='+  id);
      if(response.status === 200) {
          alert("Ẩn sản phẩm thành công")
          return response.data
      }
      console.log(response)

  } catch (error) {
      console.error('Error fetching data:', error);
  }
};

const handleEditProductShow = (productId: number) => {
  fetchUpProduct1(productId)
};
  
  const handleEditProductHidden = (productId: number) => {
    fetchUpProduct(productId)
  };

  return (
    <>
      <div className=''>
        <div>1 Sản Phẩm</div>
        <div className="w-full bg-gray-200 h-8 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${(uploadedProducts / MaxProductCount) * 100}%` }}
          ></div>
        </div>
        <div>
          Có thể đăng tải thêm 999 sản phẩm
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleUpload}
          disabled={uploadedProducts >= MaxProductCount}
        >
          Đăng tải sản phẩm
        </button>
      </div>

      <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.key}
            type="button"
            className={`hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-6 inline-flex items-center gap-x-2 border-b-2 border-transparent whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 ${selectedTab === tab.key && 'hs-tab-active'}`}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="overflow-x-auto ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left  text-gray-500 uppercase tracking-wider">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-6 py-3 text-left  text-gray-500 uppercase tracking-wider">
                Giá
              </th>
              <th scope="col" className="px-6 py-3 text-left  text-gray-500 uppercase tracking-wider">
                Tồn kho
              </th>
              <th scope="col" className="px-6 py-3 text-left  text-gray-500 uppercase tracking-wider">
                Doanh số
              </th>
              <th scope="col" className="px-6 py-3 text-left  text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3 text-left  text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id || ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className=" text-gray-900">{product.name || ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className=" text-gray-900">{product.price || ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className=" text-gray-900">{product.stockQuantity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className=" text-gray-900">{product.sold || ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">
                    {product.published ? 'Đang hiện' : 'Đã ẩn'}
                  </div>
                </td>


                <td className="px-6 py-4 whitespace-nowrap text-left  ">
                  <button onClick={() => handleEditProduct(product.id)} className="text-indigo-600 hover:text-indigo-900">Chỉnh sửa</button>
                  <button onClick={() => handleEditProductHidden(product.id)} className="text-red-600 mx-2 hover:text-indigo-900">Ẩn</button>
                  <button onClick={() => handleEditProductShow(product.id)} className="text-indigo-600 hover:text-indigo-900">Hiện</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;
