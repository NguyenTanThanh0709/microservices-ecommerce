import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // Import biểu tượng location-dot
import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import {PromotionReponse} from 'src/constants/contant'
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axiosClient from 'src/apis/axiosClient'
import { useLocation } from 'react-router-dom';
export default function Payment() {
  const [inputValue, setInputValue] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [voucherCode, setVoucherCode] = useState<string>('');

const [promotions, setPromotions] = useState<PromotionReponse[]>([]);



const id = localStorage.getItem('id');
const userId = id !== null ? parseInt(id) : 0;
const { data: profileData, refetch } = useQuery({
  queryFn:  () =>  userApi.getProfile(userId)
})
const profile = profileData?.data.data
// console.log(profile)


  const location = useLocation();
  const { orderTempArray } = location.state;
  // Sử dụng orderTempArray ở đây
  console.log(orderTempArray);




  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleVoucherCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(event.target.value);
  };

  const handleApplyVoucher = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Xử lý mã voucher ở đây
    console.log('Áp dụng mã voucher:', voucherCode);
    // Sau khi xử lý, bạn có thể đóng modal nếu cần
    setShowModal(false);
  };

// Khởi tạo state để lưu trữ danh sách promotions

  const getPromotions = async (number: number) => {
    try {
        const response = await axiosClient.get<PromotionReponse[]>(`/api/v1/promotions/product/${number}`);
        console.log(response.data)
        setPromotions(response.data);
    } catch (error) {
        console.error('Error uploading images:', error);
    }
  }

  const handleVoucherClick = (idproduct:any) => {
    getPromotions(idproduct)
    setShowModal(true);
  };
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>


        <div className='row flex grid grid-cols-9 p-2 bg-orange-50' style={{ background: '#ffff' }}>
            <div className='col col-span-2'>
              <div className='m-2 text-lg '><FontAwesomeIcon className='text-red-500 mx-2' icon={faLocationDot} /><span className='text-red-500 mx-2'>Địa chỉ nhận hàng</span></div>
              <div className='font-black'>
              <div className='m-2 text-lg '>{profile?.email}</div>
              <div className='m-2 text-lg '>{profile?.phone}</div>
              </div>
            </div>
            <div className='col mx-4 col col-span-6'>
              <p className='text-lg'>{profile?.address}</p>
            </div>
            <div className='col col col-span-1'>
              <p className='p-2 border-amber-500 border-2'>mặc định</p>
            </div>
        </div>


        

        {orderTempArray.map((product: any, index: number) => (
          <>
          <div className='p-2 mt-4 text-lg' style={{ background: '#fff' }}>

            <div className="grid grid-cols-9 flex " >
              <div className="col-span-6">Sản Phẩm</div>
              <div className="col-span-1">Đơn giá</div>
              <div className="col-span-1">Số lượng</div>
              <div className="col-span-1">Thành tiền</div>
            </div>

            <div className='mt-2 font-black text-lg text-red-500'>
              <p>TÊN SHOP</p>
            </div>

            <div className="grid grid-cols-9 flex " >
              <div className="col-span-6 flex items-center">
              <img className="Yzo0tI" alt="product image" src={product.idProduct.productImages[0].urlimg} width="40" height="40"/>
              <p>{product.idProduct.name}</p>

              </div>
              <div className="col-span-1">{product.priceProduct}</div>
              <div className="col-span-1">{product.quantityProdcut}</div>
              <div className="col-span-1">{product.priceProduct * product.quantityProdcut}</div>
            </div>

            <div className='grid grid-cols-2 flex mt-4 pt-4' style={{ borderTop: '1px solid black' }}>
              <div className='col-span-1 flex justify-between'>
                <p>Hóa đơn điện tử ?</p>
                <p className=' text-green-500'>Yêu cầu ngay</p>
              </div>
              <div className='col-span-1 mx-2 flex justify-between'>
                <div> <FontAwesomeIcon icon={faTicket} /> Voucher của Shop</div>
                <div className='text-green-300 cursor-pointer'  onClick={() => handleVoucherClick(product.idProduct.id)} > Chọn Voucher</div>
              </div>

            </div>

            <div className='grid grid-cols-2 flex mt-4 pt-4' style={{ borderTop: '1px solid black' }}>
              <div className='col-span-1 flex justify-between'>
              <input 
                type="text" 
                className='border'
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Lời Nhắn cho shop" 
              />
              </div>
              <div className='col-span-1 mx-2 flex justify-between' >
                <span>Đơn vị vẩn chuyển:</span>
                <span>Tên đơn vị vẩn chuyển</span>
                <span>10.000đ</span>
              </div>

            </div>


            <div className='mt-4'>Tổng Tiền: 200.000đ</div>

            </div>
          </>
        ))}


                
        <div className='p-2 mt-4 text-lg' style={{ background: '#fff' }}>
          {/* Phần tử hiển thị thông tin đơn hàng */}
          {/* ... */}
          <div className='mt-4'>Tổng Tiền: 200.000đ</div>
          {/* Phần tử chứa nút đặt hàng */}
          <div className='flex justify-end mt-4'>
            <button className='bg-green-500 text-white font-bold py-2 px-4 rounded'>
              Đặt Hàng
            </button>
          </div>
          {/* Phần tử hiển thị phương thức thanh toán */}
          <div className='mt-4'>
            <p className='font-bold'>Phương Thức Thanh Toán:</p>
            <div className='flex items-center mt-2'>
              <input type='radio' id='cash' name='payment' value='cash' />
              <label htmlFor='cash' className='ml-2'>Tiền Mặt</label>
            </div>
            <div className='flex items-center mt-2'>
              <input type='radio' id='vnpay' name='payment' value='vnpay' />
              <label htmlFor='vnpay' className='ml-2'>VNPay</label>
            </div>
            <div className='flex items-center mt-2'>
              <input type='radio' id='paypal' name='payment' value='paypal' />
              <label htmlFor='paypal' className='ml-2'>PayPal</label>
            </div>
          </div>
        </div>

        {showModal && (
  <div className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center'>
    <div className='bg-white p-6 rounded-lg'>
      <h2 className='text-lg font-bold mb-4'>Chọn Voucher</h2>
      {/* Form nhập mã voucher */}
      <form className='my-4' onSubmit={handleApplyVoucher}>
        <div className='mb-4'>
          <label htmlFor='voucherCode' className='block text-sm font-medium text-gray-700'>Mã Voucher</label>
          <input
            type='text'
            id='voucherCode'
            value={voucherCode}
            onChange={handleVoucherCodeChange}
            className='mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
          />
        </div>
        <button type='submit' className='bg-green-500 text-white font-bold py-2 px-4 rounded'>Áp dụng</button>
      </form>
      <div className='my-2'>
      {promotions.map((promotion) => (
          promotion.discountCode.isActive && (
            <div key={promotion.id} className='my-2 bg-slate-200'>
              <p className='font-bold'>{promotion.discountCode.name}</p>
              <p>{promotion.discountCode.description}</p>
              <p>Hạn sử dụng: {new Date(promotion.discountCode.endDate).toLocaleDateString()}</p>
              <p>Số tiền giảm: {promotion.discountCode.discountValue}đ</p>
              <button type='submit' className='bg-green-500 text-white font-bold py-2 px-4 rounded'>Áp dụng</button>
            </div>
          )
        ))}
      </div>
      <button className='bg-red-500 text-white font-bold py-2 px-4 rounded mt-2' onClick={() => setShowModal(false)}>
        Đóng
      </button>
    </div>
  </div>
)}


      </div>
        </div>
  );
}
