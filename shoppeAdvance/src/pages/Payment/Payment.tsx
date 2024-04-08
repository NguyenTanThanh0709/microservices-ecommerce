import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import { PromotionReponse, OrderRequest } from 'src/constants/contant'
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import axiosClient from 'src/apis/axiosClient'
import { useLocation } from 'react-router-dom';
import PaymentPage from '../Cart/PaymentPage';
import { Product } from 'src/types/product.type'

interface orderTemp {
  idProduct: Product  ;
  priceProduct: number;
  quantityProdcut:number;
  message: string;
  discount: number;
}

export default function Payment() {

  const location = useLocation();
  const { orderTempArray } = location.state;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [promotions, setPromotions] = useState<PromotionReponse[]>([]);
  const [inputValues, setInputValues] = useState<orderTemp[]>([]);
  const [totalMoney, setTotalMoney] = useState<number>(0);

  


  useEffect(() => {

    const initialInputValues = orderTempArray.map((item: orderTemp) => ({
      idProduct: item.idProduct,
      priceProduct: item.priceProduct,
      quantityProdcut: item.quantityProdcut,
      message: 'lời nhắn: ',
      discount: 0,
    }));

    let totalPrice = 0;

    // Calculate the total price without updating the state inside the loop
    for (let i = 0; i < orderTempArray.length; i++) {
      totalPrice += orderTempArray[i].priceProduct * orderTempArray[i].quantityProdcut;
    }

    // Update the state with the total price after the calculation is complete
    setTotalMoney(totalPrice);

    // Set the initialInputValues to inputValues state
    setInputValues(initialInputValues);
  }, [orderTempArray]);

  // Update input values array
  const handleInputChangeSeparate = (event: React.ChangeEvent<HTMLInputElement>, index: number, property: string) => {
    const { value } = event.target;
    setInputValues(prevInputValues => {
      const updatedInputValues = [...prevInputValues];
      const updatedItem = { ...updatedInputValues[index], [property]: value };
      updatedInputValues[index] = updatedItem;
      return updatedInputValues;
    });
  };

  const id = localStorage.getItem('id');
  const userId = id !== null ? parseInt(id) : 0;
  const { data: profileData, refetch } = useQuery({
    queryFn: () => userApi.getProfile(userId)
  })
  const profile = profileData?.data.data

  

  const handleVoucherCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(event.target.value);
  };

  const handleApplyVoucher = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Áp dụng mã voucher:', voucherCode);
    setShowModal(false);
  };

  const getPromotions = async (number: number) => {
    try {
      const response = await axiosClient.get<PromotionReponse[]>(`/api/v1/promotions/product/${number}`);
      console.log(response.data)
      setPromotions(response.data);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  }

  const handleVoucherClick = (idproduct: any) => {
    getPromotions(idproduct)
    setShowModal(true);
  };

  const handleAppCode = (money: number) => {
    setTotalMoney(prevTotalMoney => prevTotalMoney - money);

  };

  const handleOrderDetailsClick = () => {
    console.log('Order Details:', inputValues); // Log the orderTempArray when the button is clicked
    console.log(profile)

      // Initialize an empty object to store product IDs and quantities
    const productIdsQuantitys: { [productId: string]: number } = {};
    // Iterate through inputValues to populate productIdsQuantitys
    inputValues.forEach((item: orderTemp) => {
      productIdsQuantitys[item.idProduct.id.toString()] = item.quantityProdcut;
    });

    const productIdsPrices: { [productId: string]: number } = {};
    inputValues.forEach((item: orderTemp) => {
      productIdsPrices[item.idProduct.id.toString()] = item.priceProduct;
    });

    const productIdsNotes: { [productId: string]: string } = {};
    inputValues.forEach((item: orderTemp) => {
      productIdsNotes[item.idProduct.id.toString()] = item.message;
    });


    const data = {
      phoneNumber: profile?.phone || "",
      address: profile?.address || "",
      statusOrder: "Chờ thanh toán", // Chờ thanh toán, Vận chuyển, Chờ giao hàng, Hoàn thành, Đã hủy, Trả hàng/Hoàn tiền
      statusDelivery: "Đóng hàng", // Đóng hàng, Lấy hàng, giao hàng, đã giao
      productIdsQuantitys: productIdsQuantitys,
      productIdsPrices: productIdsPrices,
      productIdsNotes: productIdsNotes,
      totalMoney: totalMoney,
      idPayment :0
    }
    console.log(data)
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

        {inputValues.map((product: any, index: number) => (
          <div key={index} className='p-2 mt-4 text-lg' style={{ background: '#fff' }}>

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
                <img className="Yzo0tI" alt="product image" src={product.idProduct.productImages[0].urlimg} width="40" height="40" />
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
                <div className='text-green-300 cursor-pointer' onClick={() => handleVoucherClick(product.idProduct.id)} > Chọn Voucher</div>
              </div>

            </div>

            <div className='grid grid-cols-2 flex mt-4 pt-4' style={{ borderTop: '1px solid black' }}>
              <div className='col-span-1 flex justify-between'>
                <input
                  type="text"
                  className='border'
                  value={inputValues[index]?.message || ''}
                  onChange={(e) => handleInputChangeSeparate(e, index, 'message')}
                  placeholder="Lời Nhắn cho shop"
                />
              </div>
              <div className='col-span-1 mx-2 flex justify-between' >
                <span>Đơn vị vẩn chuyển:</span>
                <span>Tên đơn vị vẩn chuyển</span>
                <span>10.000đ</span>
              </div>

            </div>


          </div>
        ))}

        <div className='p-2 mt-4 text-lg' style={{ background: '#fff' }}>
          <div className='mt-4'>Tổng Tiền: {totalMoney}đ</div>
          <div className='flex justify-end mt-4'>
            <button className='bg-green-500 text-white font-bold py-2 px-4 rounded'
             onClick={handleOrderDetailsClick}
              >
              Đặt Hàng
            </button>
          </div>
          <div className='mt-4'>
            <PaymentPage />
          </div>
        </div>

        {showModal && (
          <div className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg'>
              <h2 className='text-lg font-bold mb-4'>Chọn Voucher</h2>
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
                      <button type='submit' className='bg-green-500 text-white font-bold py-2 px-4 rounded'  onClick={() => handleAppCode(promotion.discountCode.discountValue)}>Áp dụng</button>
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
