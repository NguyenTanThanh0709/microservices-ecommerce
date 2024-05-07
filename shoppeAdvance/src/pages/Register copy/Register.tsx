import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/components/Button';
import axiosInstance from'src/apis/axiosClient';
import { useNavigate } from 'react-router-dom';

interface ShopData {
  nameShop: string;
  des: string;
  user_id: string;
}

export default function Register(): JSX.Element {
  const [shopData, setShopData] = useState<ShopData>({
    nameShop: '',
    des: '',
    user_id: '' // Assuming this will be provided from another source or input
  });

  useEffect(() => {
    // Retrieve user_id from local storage
    const userId = localStorage.getItem('id');
    if (userId) {
      setShopData(prevShopData => ({ ...prevShopData, user_id: userId }));
    }
  }, []);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setShopData({ ...shopData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    console.log(shopData);
    fecthAddShop(shopData)
  };

  const fecthAddShop = async (shopData: ShopData) => {
    try {
        // Example POST request
        const response = await axiosInstance.post('/api/v1/users/shop', shopData);
        console.log(response)
        if(response.status === 201) {
            console.log(response.data);
            alert('Tạo Shop Thành Công');
            navigate('/admin-home/0');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  return (
    <div className='h-[900px] bg-orange'>
      <div className='container bg-shopee bg-contain bg-center bg-no-repeat'>
        <div className='grid grid-cols-1 py-12 lg:h-[470px] lg:grid-cols-5 lg:pr-10'>
          <div className='md:col-span-2 md:col-start-4 md:mx-8'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmit}>
              <div className='text-2xl'>Đăng Ký Shop</div>
              <input
                type='text'
                name='nameShop'
                value={shopData.nameShop}
                onChange={handleInputChange}
                placeholder='Tên Shop'
                className='my-4 p-2 border border-gray-300 rounded-md w-full'
              />
              <textarea
                name='des'
                value={shopData.des}
                onChange={handleInputChange}
                placeholder='Mô tả'
                className='my-4 p-2 border border-gray-300 rounded-md w-full'
              />

              <Button
                type='submit'
                className='flex w-full justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
              >
                Đăng ký
              </Button>
              <div className='mt-8 flex items-center justify-center gap-1 text-center'>
                <span className='text-gray-400'>Trang chủ</span>
                <Link to='/login' className='text-red-400'>
                  Home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
