import React, { useState, useEffect } from 'react';

interface Order {
  id: number;
  product: string;
  totalOrders: number;
  status: string;
  shippingProvider: string;
  refundAmount?: number;
}

const initialData: Order[] = [
  { id: 1, product: 'Product A', totalOrders: 10, status: 'Pending', shippingProvider: 'Provider X' },
  { id: 2, product: 'Product B', totalOrders: 20, status: 'Completed', shippingProvider: 'Provider Y' },
  { id: 3, product: 'Product C', totalOrders: 15, status: 'In Progress', shippingProvider: 'Provider Z' },
  // Add more data as needed
];

const ListOrder: React.FC = () => {
  const tabs = [
    { key: 'all', label: 'Tất Cả' },
    { key: 'pendingConfirmation', label: 'Chờ Xác Nhận' },
    { key: 'waitingForPickup', label: 'Chờ Lấy Hàng' },
    { key: 'shipping', label: 'Đang Giao' },
    { key: 'delivered', label: 'Đã Giao' },
    { key: 'cancelled', label: 'Đơn Hủy' },
    { key: 'refund', label: 'Trả Hàng/Hoàn Tiền' },
    { key: 'failedDelivery', label: 'Giao Hàng Không Thành Công' }
  ];

  const [selectedTab, setSelectedTab] = useState('all'); // Ban đầu chọn tab "Tất Cả"
  const [data, setData] = useState<Order[]>(initialData);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    if (selectedTab === 'refund') {
      const newData = initialData.map(item => {
        if (item.id === 1) {
          return { ...item, refundAmount: 100 }; // Thay 100 bằng giá trị thực tế
        }
        return item;
      });
      setData(newData);
    }
  }, [selectedTab]);

  return (
    <div className='m-4 p-4'>
      <nav className="flex space-x-2 border-b-2 border-indigo-500" aria-label="Tabs" role="tablist">
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

      <div className='border-b-2 border-indigo-500 my-4'>
        <div className="flex-1 my-4">
          <label htmlFor="orderDate" className="block  text-gray-700">Ngày đặt hàng</label>
          <input type="date" name="orderDate" id="orderDate" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-xl" />
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1">
            <select id="orderCode" name="orderCode" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-xl">
              <option value="">Chọn mã đơn hàng</option>
              <option value="">Chọn số điện thoại khách hàng</option>
              <option value="">Chọn tên sản phẩm</option>
              {/* Add your options here */}
            </select>
          </div>
          <div className="flex-1">
            <input type="text" name="orderNumber" placeholder='nhập thông tin' id="orderNumber" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-xl" />
          </div>
          <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Tìm</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {selectedTab === 'failedDelivery' &&
          <nav className="flex space-x-2 border-b-2 border-indigo-500" aria-label="Tabs" role="tablist">
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
        }
        <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Giao hàng loạt</button>

        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
              <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Tổng đơn hàng</th>
              <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Đơn vị vận chuyển</th>
              {selectedTab === 'refund' && <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Số tiền hoàn</th>}
              <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.product}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.totalOrders}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.shippingProvider}</td>
                {selectedTab === 'refund' && <td className="px-6 py-4 whitespace-nowrap">{item.refundAmount}</td>}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900">Giao hàng và lên đơn</button>
                  <button className="text-red-600 hover:text-red-900 ml-2">Hủy đơn</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListOrder;
