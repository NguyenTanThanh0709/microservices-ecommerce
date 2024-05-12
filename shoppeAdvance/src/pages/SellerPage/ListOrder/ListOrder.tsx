import React, { useState, useEffect } from 'react';
import axiosInstance from 'src/apis/axiosClient'; 
import {Order, OrderItem} from 'src/constants/contant'
import { Notification } from 'src/constants/contant';
import { io, Socket } from 'socket.io-client';
import jsPDF from 'jspdf';


const ListOrder: React.FC = () => {
  const tabs = [
    { key: 'pendingConfirmation', label: 'Chờ Xác Nhận' },
    { key: 'waitingForPickup', label: 'Chờ Lấy Hàng' },
    { key: 'shipping', label: 'Đang Giao' },
    { key: 'delivered', label: 'Đã Giao' },
    { key: 'cancelled', label: 'Đơn Hủy' },
    { key: 'refund', label: 'Trả Hàng/Hoàn Tiền' },
    { key: 'failedDelivery', label: 'Giao Hàng Không Thành Công' }
  ];


  const [selectedTab, setSelectedTab] = useState('pendingConfirmation'); // Ban đầu chọn tab "Tất Cả"

  const [orders, setOrders] = useState<Order[]>([]);
  const token = localStorage.getItem('accessToken');
  const tokenus = token !== null ? token :""
  const phoneOwnerFromLocalStorage = localStorage.getItem('id');

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    if (phoneOwnerFromLocalStorage) {
      let status = 1;
      if(selectedTab === 'pendingConfirmation') {
        status = 1;
      }else if(selectedTab === 'waitingForPickup') {
        status = 2;
      } else if(selectedTab === 'shipping') {
        status = 3;
      } else if(selectedTab === 'delivered') {
        status = 4;
      } else if(selectedTab ===  'cancelled') {
        status = 5;
      } else if(selectedTab === 'refund') {
        status = 6;
      } else if(selectedTab === 'failedDelivery') {
        status = 7;
      }
      
      fetchUpOrder(phoneOwnerFromLocalStorage, tokenus, status);
  }
  }, [selectedTab]);
  const fetchUpOrder = async (phone: string, token: string, status:number) => {
    try {
      const response = await axiosInstance.get(`/api/v1/orders/seller/${phone}/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [ordersItems, setOrdersItems] = useState<OrderItem[]>([]);
  
  const handleButtonClick =  (orders: OrderItem[]) => {
    
    // Xử lý logic khi nhấn vào nút
    console.log('Clicked on order with ID:', orders);
    setOrdersItems(orders);
    // Ví dụ: Mở modal hiển thị thông tin chi tiết đơn hàng, gửi yêu cầu API để lấy thông tin chi tiết đơn hàng, v.v.
    setShowModal(true);

  }

  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    setSocket(io("ws://localhost:8900"));
  }, []);



  const handleClickaddUser = (message: Notification) => {
    if(socket){
      socket.emit("notireceive", message);
    }
  }

  const handleButtonClickHuyDown =  (id:number, phoneUser:string) => {
    
    // Xử lý logic khi nhấn vào nút
    console.log('Clicked on order with ID:', id);
    fetchUpOrderHuyDon(id, 'Đã hủy', phoneUser);
  }

  const handlechat =  (phoneUser:string) => {
    window.location.href = '/chat/'+phoneUser + '/seller';
  }

  

  const fetchUpOrderHuyDon = async ( orderId:number, status:string, phoneUser:String) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axiosInstance.put(`/api/v1/orders/update/${orderId}/status?statusOrder=${status}&token=${token}`);
      if(response.status === 200) {
        alert("Hủy Đơn Thành Công");
        if (phoneOwnerFromLocalStorage) {
          fetchUpOrder(phoneOwnerFromLocalStorage, tokenus, 1);
          const data: Notification = {
            description: "Đơn Hàng Của Bạn Đã Bị Hủy! Click để xem chi tiết",
            seller: parseInt(localStorage.getItem('id') ?? "0"),
            customer: phoneUser.toString(), // Ensure phoneUser is a string
            type: 'ĐƠN HÀNG',
            id_type: orderId.toString(),
            date: new Date(),
          };

          fetchAddThongBao(data);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAddThongBao = async ( thongbao: Notification) => {
    try {
      const response = await axiosInstance.post('/api/v1/communicate/noti/', thongbao);
      if(response.status === 201) {
        handleClickaddUser(thongbao)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = (order: Order) => {

    const pdf = new jsPDF({
      orientation: 'portrait', // Hoặc 'landscape' tùy thuộc vào bố cục bạn muốn
      unit: 'mm',
      format: 'a4',
    });
    let y = 20; // Vị trí dòng đầu tiên

    pdf.text(`ORDER BILL FOR DELIVERY`, 10, y);
      y += 10; // Tăng vị trí dòng

 
      pdf.text(`Order ID: ${order.id}`, 10, y);
      y += 10; // Tăng vị trí dòng

      pdf.text(`Phone Number Customer: ${order.phoneNumber}`, 10, y);
      y += 10;

      pdf.text(`Address: ${order.address}`, 10, y);
      y += 10;

      pdf.text(`Total Money: ${order.totalMoney}`, 10, y);
      y += 10;

      pdf.text(`Seller ID: ${order.idSeller} VNĐ`, 10, y);
      y += 10;

      pdf.text('Order Items:', 10, y);
      y += 10;

      pdf.text('------------------------------------------------------------------------------------',10,y);
      y += 10;

      pdf.text('Order Items:', 10, y);
      y += 10;
      
      pdf.text(`- Product Name: Quantity x Price`, 20, y);
      y += 10;
      order.orderItems.forEach(item => {
        pdf.text(`- ${item.name}: ${item.quantity} x ${item.price}`, 20, y);
        y += 10;
      });

      // Tạo một dòng trống giữa các đơn hàng
      y += 10;
    pdf.save('orders.pdf');
    fetchUpOrderStatus(order.id, 'Chờ lấy hàng');
  };

  const fetchUpOrderStatus = async ( orderId:number, status:string) => {
    try {
      const response = await axiosInstance.put(`/api/v1/orders/update/${orderId}/status?statusOrder=${status}`);
      if(response.status === 200) {
        alert("Cập Nhật Thành Công! vui lòng lên đơn để shipper đến lấy");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


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
              <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Mã Đơn</th>
              <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Số điện thoại người mua</th>
              <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Địa chỉ</th>
              <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Trạng thái vận chuyển</th>
              {selectedTab === 'refund' && <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Số tiền hoàn</th>}
              <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.statusDelivery}</td>
                {selectedTab === 'refund' && <td className="px-6 py-4 whitespace-nowrap">100</td>}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-red-500 hover:text-indigo-400 mr-2" onClick={() => handleButtonClick(item.orderItems)}>Xem chi tiết</button>
                  <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleClick(item)}>Giao hàng và lên đơn</button>
                  <button className="text-red-600 hover:text-red-900 ml-2" onClick={() => handleButtonClickHuyDown(item.id, item.phoneNumber)}>Hủy đơn</button>
                  <button className="text-indigo-600 hover:text-red-900 ml-2" onClick={() => handlechat(item.phoneNumber)}>Nhắn tin</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {showModal && (
          <div className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg'>
              <h2 className='text-lg font-bold mb-4'>Các sản phẩm của đơn hàng</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ordersItems.map((item, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden shadow-md">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-cover object-center" />
                  <div className="p-2">
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <p className="text-gray-600 mb-1">Quantity: {item.quantity}</p>
                    <p className="text-gray-600 mb-1">Price: ${item.price.toFixed(2)}</p>
                    <p className="text-gray-600 mb-1">Note: {item.note}</p>
                  </div>
                </div>
                ))}
              </div>


              <button className='bg-red-500 text-white font-bold py-2 px-4 rounded mt-2' onClick={() => setShowModal(false)}>
                Đóng
              </button>
            </div>
          </div>
        )}

    </div>


  );
}

export default ListOrder;
