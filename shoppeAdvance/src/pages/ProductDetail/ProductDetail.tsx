import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import purchaseApi from 'src/apis/purchase.api'
import { toast } from 'react-toastify'
import ProductRating from 'src/components/ProductRating'
import QuantityController from 'src/components/QuantityController'
import { purchasesStatus } from 'src/constants/purchase'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import path from 'src/constants/path'
import { Helmet } from 'react-helmet-async'
import { convert } from 'html-to-text'
import { Head } from 'src/components/head'
import axiosInstance from 'src/apis/axiosClient'; 




// Định nghĩa interface cho đánh giá sản phẩm
interface ProductRating {
  _id: string;
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  __v: number;
  user: {
      message: string;
      data: {
          _id: string;
          roles: string[];
          email: string;
          address: string;
          phone: string;
      }
  }
}


export default function ProductDetail() {

  // Khởi tạo state với một mảng các đánh giá sản phẩm
  const [productRatings, setProductRatings] = useState<ProductRating[]>([]);
  // Hàm để thực hiện việc cập nhật đánh giá sản phẩm
  const updateProductRatings = (newRatings: ProductRating[]) => {
      setProductRatings(newRatings);
  };

  const fetchUpProduct = async (idproduct:number) => {
    try {
        // Example POST request
        const response = await axiosInstance.get(`/api/v1/communicate/rating/product-rating/get?product_id=${idproduct}`);
        if(response.status === 200) {
          updateProductRatings(response.data);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const fetchUpProductDeleteRating = async (idproduct:string, idu:string) => {
  try {
      // Example POST request
      const response = await axiosInstance.delete(`/api/v1/communicate/rating/product-rating/${idproduct}/${idu}/delete`);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};


  const navigate = useNavigate()

  const navigateToPageShop = (id:number) => {
    window.location.href = '/admin-shop/'+id;
  };

  const navigateToPageShop1 = (id:number) => {
    window.location.href = '/chat/'+id + '/customer'
  };

  const queryClient = useQueryClient()
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const product = productDetailData?.data.data
  console.log(product)
  const imageRef = useRef<HTMLImageElement>(null)
  const currentImages = useMemo(
    () => (product ? product.productImages.map(image => image.urlimg).slice(...currentIndexImages) : []),
    [product, currentIndexImages]
);
// console.log(currentImages)

  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: "1" }

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product)
  })
  const addToCartMutation = useMutation(purchaseApi.addToCart)

  const handleDeleteRating = async (userId: string, productId:string) => {
    try {
      // Gọi API để xóa đánh giá sản phẩm
      await fetchUpProductDeleteRating(productId, userId);
      // Sau khi xóa thành công, cập nhật danh sách đánh giá sản phẩm mới
      await fetchUpProduct(parseInt(productId));
      // Hiển thị thông báo xóa thành công
      toast.success('Đánh giá đã được xóa thành công', {
        position: 'top-center',
        autoClose: 1000
      });
    } catch (error) {
      console.error('Lỗi khi xóa đánh giá sản phẩm:', error);
      toast.error('Đã xảy ra lỗi khi xóa đánh giá sản phẩm', {
        position: 'top-center',
        autoClose: 1000
      });
    }
  };
  

  useEffect(() => {
    if (product && product.productImages.length > 0) {
      setActiveImage(product.productImages[0].urlimg)
      fetchUpViewProduct(product.id);
      fetchUpProduct(product.id);
    }



  }, [product])


  const fetchUpViewProduct = async (id:number) => {
    try {
        // Example POST request
        const response = await axiosInstance.put(`/api/v1/products/${id}/views/increment`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  const next = () => {
    if (currentIndexImages[1] < (product as ProductType).productImages.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  var idu = localStorage.getItem('id') || '0'

  const addToCart = () => {
    if(product != null && product.colors != "" && product.productSize.length!= 0){
      if(selectColor== '' || selectedProductId == null){
        alert("Vui lòng chọn size và màu")
        return
      }
    }
    // Retrieve customerId from localStorage
    const customerId = parseInt(localStorage.getItem('id') || '0', 10);
    console.log({ customerId:customerId as number, productId: product?.id as number, quantity: buyCount, color:selectColor, size:selectedProductId+'-' +namesize });
    // return
    addToCartMutation.mutate(
      
      { customerId:customerId as number, productId: product?.id as number, quantity: buyCount, color:selectColor, size:selectedProductId+'-' +namesize },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
        }
      }
    )
  }

  const buyNow = async () => {



    if(product){
      console.log(product)
    if(product != null && product.colors != "" && product.productSize.length!= 0){
      if(selectColor== '' || selectedProductId == null){
        alert("Vui lòng chọn size và màu")
        return
      }
    }
    
    console.log(product.id+ '-'+selectedProductId + '-'+ namesize + '-' + selectColor)

    const customerId = parseInt(localStorage.getItem('id') || '0', 10);
    const res = await addToCartMutation.mutateAsync({ customerId:customerId as number, productId: product?.id as number, quantity: buyCount,color:selectColor, size:selectedProductId+'-' +namesize },)
    const purchase = res.data
    console.log(purchase)
    navigate(path.cart, {
      state: {
        purchaseId: purchase.id.toString()
      }
    })
    }
    
  }

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [namesize, setNamesize] = useState<string>('');
  const handleItemClick = (productId: number, size:string, quantity: number) => {
    if(quantity == 0){
      alert("Sản phẩm này đã hết hàng")
      return
    }
      setNamesize(size.toString());
      setSelectedProductId(productId);
      // Perform any other actions you want when an item is clicked
  };

  const [selectColor, setSelectColor] = useState<string>('');
  const handleItemClickColor = (color: string) => {
      setSelectColor(color);
  };

  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>{product.name} | Shopee Clone</title>
        <meta
          name='description'
          content={convert(product.description, {
            limits: {
              maxInputLength: 150
            }
          })}
        />
      </Helmet>
      <Head title={product.name} description={product.description} />
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  // onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  // onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <h1 className='text-sm font-medium uppercase'>{product.category}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product.view}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassname='fill-orange text-orange h-4 w-4'
                    nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price, product.price)} giảm
                </div>
              </div>
              <div className='mt-8  items-center bg-gray-50 px-5 py-4'>
                <h1>Thông tin Size</h1>
                {product.productSize.map((items) => (
                  <div key={items.id}  className={`items-center border-2 cursor-pointer rounded-sm px-4 py-2 mt-2 ${selectedProductId === items.id ? 'border-blue-500' : 'border-gray-300'}`}   onClick={() => handleItemClick(items.id, items.size, items.quantity)}> 
                  <p>Size: {items.size}</p>
                  <p>Số lượng trong kho: {items.quantity}</p>
                </div>
            ))}
              </div>
              <div className='mt-8  items-center bg-gray-50 px-5 py-4'>
                <h1>Thông tin màu</h1>
                {product.colors && product.colors.split("-").map((items, index) => (
                  <div key={index}  className={`items-center border-2 cursor-pointer rounded-sm px-4 py-2 mt-2 ${selectColor == items ? 'border-blue-500' : 'border-gray-300'}`}   onClick={() => handleItemClickColor(items)}> 
                  <p>Màu: {items}</p>
                </div>
            ))}
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.stockQuantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.stockQuantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className='fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className=' bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả Chi tiết</div>
            <div className='mx-4 mt-12 mb-4 text-lg leading-loose'>
              
              {product.description.split('-').map((line, index) => (
              <div
              key={index}
                dangerouslySetInnerHTML={{
                  
                  __html: DOMPurify.sanitize(line)
                }}
              />
          ))}
            </div>
          </div>

          <div className=' bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mt-12 mb-4 text-lg leading-loose'>
            {product.shortDescription.split('-').map((line, index) => (
              <div
              key={index}

                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(line)
                }}
              />
          ))}
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>Các đánh giá sản phẩm</div>
          <div className="grid grid-cols-3 gap-4 mt-4">

          {productRatings.map((rating, index) => (
        <div className="relative" key={index}>
          {/* Nút X để xóa đánh giá */}
          {rating.user_id == idu && (
            <span className="text-red-500 cursor-pointer absolute top-0 right-0" 
            onClick={() => handleDeleteRating(rating.user_id, rating.product_id)}
            >X</span>
          )}
          <div className='flex'>
            <div>
              {/* Hiển thị ảnh đại diện của người đánh giá */}
              <img src='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
            </div>
            <div>
              {/* Hiển thị tên người đánh giá */}
              <span>{rating.user.data.email}</span>
              {/* Hiển thị đánh giá về sản phẩm */}
              <ProductRating rating={rating.rating} />
              {/* Hiển thị thời gian đánh giá */}
              <span>{rating.created_at}</span>
              {/* Hiển thị nội dung đánh giá */}
              <p> <span>NỘI DUNG ĐÁNH GIÁ SẢN PHẨM:</span> {rating.comment}</p>
            </div>
          </div>
        </div>
      ))}
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>Thông tin của shop</div>
          <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            <div className='flex'>
              <div className="flex flex-wrap justify-center">
                <div className=" px-4">
                  <img src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg" alt="..." className="shadow rounded max-w-full h-auto align-middle border-none" />
                </div>
              </div>
            </div>
                          <div>

                    <p className='fw-bold mx-4 m-6'>TÊN SHOP</p>

                    <div className='flex'>
                    <>
                    <button
    onClick={() => navigateToPageShop1(product.phoneOwner)}
    className='fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
>
    CHAT NGAY
</button>


<button
    onClick={() => navigateToPageShop(product.phoneOwner)}
    className='fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
>
    XEM SHOP
</button>
                  </>
                    </div>


                </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>CÓ THỂ BẠN CŨNG THÍCH</div>
          {/* {productsData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}
