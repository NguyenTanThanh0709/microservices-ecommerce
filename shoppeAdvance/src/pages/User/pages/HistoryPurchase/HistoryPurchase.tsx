import { useQuery } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react';
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { toast } from 'react-toastify'

import { formatCurrency, generateNameId } from 'src/utils/utils'
import {Order} from 'src/constants/contant'
import axiosInstance from 'src/apis/axiosClient'; 
import { set } from 'lodash';

const purchaseTabs = [
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã hủy' },
  { status: purchasesStatus.trahang, name: 'Tra hàng' }
]

interface ProductRatingData {
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
}

interface PaymentData {
  orderId: string;
  transDate: string;
  amount: number;
  user: string;
}


export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status = Number(queryParams.status) || purchasesStatus.all

  const [orders, setOrders] = useState<Order[]>([]);
  const token = localStorage.getItem('accessToken');
  const tokenus = token !== null ? token :""
  const phoneOwnerFromLocalStorage = localStorage.getItem('phone');
  console.log(orders)

  useEffect(() => {
      
      if (phoneOwnerFromLocalStorage) {
        fetchUpOrder(phoneOwnerFromLocalStorage, tokenus);
    }

  }, [status]);

  const fetchUpOrder = async (phone: string, token: string) => {
    try {
      const response = await axiosInstance.get(`/api/v1/orders/user/${phone}/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchUpProduct = async (data: ProductRatingData) => {
    try {
        // Example POST request
        const response = await axiosInstance.post('/api/v1/communicate/rating/product-rating/add', data);
        if(response.status === 201) {
          toast.success(response.data.message, {
            position: 'top-center',
            autoClose: 1000
          })
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const comment = (event.target as HTMLFormElement).comment.value;

  // Lấy giá trị của select
  const rating = (event.target as HTMLFormElement).rating.value;
  const iduser = localStorage.getItem('id');
  if(iduser){
    const productRatingData: ProductRatingData = {
      product_id: selectedProductId, // Giả sử bạn đã có selectedProductId từ nơi khác trong mã của bạn
      user_id: iduser,
      rating: rating,
      comment: comment
  };
  fetchUpProduct(productRatingData);
  }
  };

  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

const handleOpenModal = (productId: string) => {
  setSelectedProductId(productId);
  setShowModal(true);
};


const fetchPaymentByID = async (id: number): Promise<void> => {
  try {
    const response = await axiosInstance.get(`/api/v1/payments/${id}`);
    if (response.status === 200) {
      const data: PaymentData = {
        orderId: response.data.vnpTxnRef,
        transDate: response.data.vnpPayDate,
        amount: 10000,
        user: "2@gmail.com"
      };
      await fetchPaymentRefund(data);
    }
  } catch (error) {
    console.error('Error fetching payment data:', error);
  }
};

const fetchPaymentRefund = async (data: PaymentData): Promise<void> => {
  try {
    const response = await axiosInstance.post(`/api/v1/orders/refund?orderId=${data.orderId}&amountt=${data.amount}&transDate=${data.transDate}&user=${data.user}`);
    if (response.status === 200) {
      console.log('Payment refund successful:', response.data);
    }
  } catch (error) {
    console.error('Error refunding payment:', error);
  }
};


const handleCancelOrder = (orderId: number) => {
  // Implement cancellation logic here
  console.log("Order cancelled:", orderId);
  // You can call any function to handle the cancellation process
  fetchPaymentByID(orderId);
};



  const Modal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
  <div className="bg-white p-8 rounded-lg">
    <h2 className="text-lg font-semibold mb-4">Đánh giá sản phẩm</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Nhận xét
        </label>
        <textarea
          id="comment"
          name="comment"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          placeholder="Nhận xét của bạn..."
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Đánh giá sao
        </label>
        <select
          id="rating"
          name="rating"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="1">1 sao</option>
          <option value="2">2 sao</option>
          <option value="3">3 sao</option>
          <option value="4">4 sao</option>
          <option value="5">5 sao</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => setShowModal(false)}
        >
          Đóng
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Lưu
        </button>
      </div>
    </form>
  </div>
</div>

    );
  };
    

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {orders?.map((purchase) => (
              
              <div key={purchase.id} className='m-4 bg-blue-100 p-2'>
                <div>
                Mã Đơn Hàng: {purchase.id}
                </div>
                <div>
                Trạng Thái đơn Hàng: {purchase.statusOrder}
                </div>
                <div>
                Trạng Thái vận chuyển đơn Hàng: {purchase.statusDelivery}
                </div>
                <div>
                    <button className="bg-green-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Xem trạng thái thanh toán
                    </button>
                </div>
                <div>
                    <button className="bg-pink-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Nhắn tin
                    </button>
                </div>
                    <div>
                    <button 
                      className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                      onClick={() => handleCancelOrder(purchase.id)}
                    >
                      Hủy Hàng
                    </button>

                    </div>
                <div>
                Danh sách sản phẩm của Đơn Hàng: 
                </div>
                {purchase.orderItems.map((item) => (

                  <div key={item.productId} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                  <Link
                    to={`${path.home}${generateNameId({ name: item.name, id: item.productId.toString() })}`}
                    className='flex'
                  >
                    <div className='flex-shrink-0'>
                      <img className='h-20 w-20 object-cover' src={item.img} alt={item.name} />
                    </div>
                    <div className='ml-3 flex-grow overflow-hidden'>
                      <div className='truncate'>{item.name}</div>
                      <div className='mt-3'>x{item.quantity}</div>
                    </div>
                    <div className='ml-3 flex-shrink-0'>
                      <span className='truncate text-gray-500 line-through'>
                        ₫{formatCurrency(item.price)}
                      </span>
                      <span className='ml-2 truncate text-orange'>₫{formatCurrency(item.price)}</span>
                    </div>
                  </Link>
                  <div className='flex justify-end'>



                    <div>
                    <Link
                    to={`${path.home}${generateNameId({ name: item.name, id: item.productId.toString() })}`}
                    className='flex'
                  >
                    <button className="bg-red-500 mx-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Mua lại 
                    </button>
                    </Link>
                    </div>

                    <div>
                    <button
                        className="bg-green-500 mx-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleOpenModal(item.productId.toString())}
                      >
                        Đánh giá
                      </button>
                      {showModal && <Modal />}


                    </div>

                    <div>
                      <span>Tổng giá tiền</span>
                      <span className='ml-4 text-xl text-orange'>
                        ₫{formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                    
                  </div>
                  </div>

                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
