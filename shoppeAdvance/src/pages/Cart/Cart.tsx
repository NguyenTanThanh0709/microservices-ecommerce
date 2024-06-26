import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { Product } from 'src/types/product.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import produce from 'immer'
import keyBy from 'lodash/keyBy'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import noproduct from 'src/assets/images/no-product.png'
import { Purchase } from 'src/types/purchase.type'
import { useNavigate } from 'react-router-dom';
 interface orderTemp {
  idProduct: Product  ;
  priceProduct: number;
  quantityProdcut:number;
  color:string;
  size:string;
  message :string;
  discount:number;
}


export default function Cart() {

  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  console.log(extendedPurchases)

  const id = localStorage.getItem('id');
  const token = localStorage.getItem('accessToken');
  const tokenus = token !== null ? token :""
  const userId = id !== null ? parseInt(id) : 0;

  const { data: purchasesInCartData, refetch } = useQuery({
    queryFn: () => purchaseApi.getPurchases(userId, tokenus),
  });

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch();
    }
  })
  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })
  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId


  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchases]
  )

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, choosenPurchaseIdFromLocation, setExtendedPurchases])



  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleQuantity = (idupdate:string,purchaseIndex: number, value: number, enable: boolean) => {

    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: idupdate, buy_count: value })
    }
  }

  const handleDelete = (purchaseid: string, productid: number) => async () => {
    try {
      await deletePurchasesMutation.mutateAsync([purchaseid]);
      toast.success('Purchase deleted successfully', {
        position: 'top-center',
        autoClose: 1000
      });
    } catch (error) {
      toast.error('Failed to delete purchase', {
        position: 'top-center',
        autoClose: 1000
      });
    }
  };
  
  const handleDeleteManyPurchases = () => {
    const purchasesIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchasesMutation.mutate(purchasesIds)
  }
  const navigate = useNavigate();
  const handleBuyPurchases = () => {
    const orderTempArray: orderTemp[] = [];
    console.log(extendedPurchases)
    for (const item of extendedPurchases) {
      if(item.checked){
        const order: orderTemp = {
          idProduct: item.product,
          priceProduct: item.price_before_discount,
          quantityProdcut: item.buy_count,
          color:item.color,
          size:item.size,
          message :`sản phẩm: với màu ${item.color} và size ${item.size} với lời nhắn: ` ,
          discount:0,
          
        };
        orderTempArray.push(order);
      }
    }
    if (orderTempArray.length !== 0) {
      // Check if all products have the same phoneOwner
      const firstPhoneOwner = orderTempArray[0]?.idProduct?.phoneOwner;
      const allSamePhoneOwner = orderTempArray.every(order => order.idProduct.phoneOwner === firstPhoneOwner);
      if (allSamePhoneOwner) {
        // Navigate to the payment page
        navigate('/payment', { state: { orderTempArray } });
      } else {
        // Display an alert if phoneOwner is not the same for all products
        alert("Tất cả các sản phẩm cần có chủ sở hữu điện thoại giống nhau để thanh toán");
      }
    } else {
      // Display an alert if no products are selected
      alert("Vui lòng chọn sản phẩm để thanh toán");
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className='flex-grow text-black'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Thao tác</div>
                    </div>
                  </div>
                </div>
                {extendedPurchases.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extendedPurchases.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                              <input
                                type='checkbox'
                                className='h-5 w-5 accent-orange'
                                checked={purchase.checked}
                                onChange={handleCheck(index)}
                              />
                            </div>
                            <div className='flex-grow'>
                              <div className='flex'>
                                <Link
                                  className='h-20 w-20 flex-shrink-0 '
                                  to={`${path.home}${generateNameId({
                                    name: purchase.product.name,
                                    id: purchase.product.id.toString()
                                  })}`}
                                >
                                  <img alt={purchase.product.name} src={purchase.product.productImages[0].urlimg} />
                                </Link>
                                <div className='flex-grow px-2 pt-1 pb-2'>
                                  <Link
                                    to={`${path.home}${generateNameId({
                                      name: purchase.product.name,
                                      id: purchase.product.id.toString()
                                    })}`}
                                    className='text-left line-clamp-2'
                                  >
                                    {purchase.product.name}
                                    <br />
                                  <span>
                                    Mã shop: {purchase.product.phoneOwner}
                                  </span>
                                  <span>
                                  <>    Mô tả đơn hàng mua: <span className=''>MÀU: {purchase.color} và Mã Size - Size {purchase.size}</span> </>
                                  </span>
                              

                                  </Link>
                                  
                                </div>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 items-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-gray-300 line-through'>
                                  ₫{formatCurrency(purchase.product.price)}
                                </span>
                                <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController
                                max={purchase.product.stockQuantity}
                                value={purchase.buy_count}
                                classNameWrapper='flex items-center'
                                onIncrease={(value) => {
                                  console.log(value, purchase.product.stockQuantity, purchase)
                                  handleQuantity(purchase._id,index, value, value <= purchase.product.stockQuantity)
                                }}
                                onDecrease={(value) => handleQuantity( purchase._id,index, value, value >= 1)}
                                onType={handleTypeQuantity(index)}
                                onFocusOut={(value) =>
                                  handleQuantity(
                                    purchase._id,
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= purchase.product.stockQuantity &&
                                      value !== (purchasesInCart as Purchase[])[index].buy_count
                                  )
                                }
                                disabled={purchase.disabled}
                              />
                            </div>
                            <div className='col-span-1'>
                              <span className='text-orange'>
                                ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                              </span>
                            </div>
                            <div className='col-span-1'>
                              <button
                                onClick={handleDelete(purchase._id, purchase.product.id)}
                                className='bg-none text-black transition-colors hover:text-orange'
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>


            <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
                  Chọn tất cả ({extendedPurchases.length})
                </button>
                <button className='mx-3 border-none bg-none' onClick={handleDeleteManyPurchases}>
                  Xóa
                </button>
              </div>

              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div>Tổng thanh toán ({checkedPurchasesCount} sản phẩm):</div>
                    <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                  </div>
                </div>
                <Button
                  className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                  onClick={handleBuyPurchases}
                  disabled={buyProductsMutation.isLoading}
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <img src={noproduct} alt='no purchase' className='mx-auto h-24 w-24' />
            <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
            <div className='mt-5 text-center'>
              <Link
                to={path.home}
                className=' rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
  
}
