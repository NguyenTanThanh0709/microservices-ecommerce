import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  inventory: number;
  sales: number;
}

const MaxProductCount = 999;

const ProductTable: React.FC<{ products: Product[] }> = ({ products }) => {
  const [uploadedProducts, setUploadedProducts] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const handleUpload = () => {
    setUploadedProducts(prevCount => prevCount + 1);
  };

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const tabs = [
    { key: 'all', label: 'Tất Cả' },
    { key: 'active', label: 'Đang Hoạt Động' },
    { key: 'outOfStock', label: 'Hết Hàng' },
    { key: 'pendingApproval', label: 'Chờ Duyệt' },
    { key: 'violation', label: 'Vi Phạm' },
    { key: 'hidden', label: 'Đã Ẩn' }
  ];

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
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id || ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className=" text-gray-900">{product.name || ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className=" text-gray-900">{product.price || ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className=" text-gray-900">{product.inventory || ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className=" text-gray-900">{product.sales || ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left  ">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Chỉnh sửa</a>
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
