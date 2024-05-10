import React, { useState } from 'react';
import { Link,NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import axiosInstance from'src/apis/axiosClient';
import { Notification } from 'src/constants/contant';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
const [showModal1, setShowModal1] = useState<boolean>(false);

const handleClick = () => {
  fecthThongBao() 
  setShowModal1(true);
};
const fecthThongBao = async () => {
  try {

      const userId = localStorage.getItem('id');
      const response = await axiosInstance.get(`/api/v1/communicate/noti/seller/${userId}`);
      if(response.status === 200) {
        setNotifications(response.data);
      }

  } catch (error) {
      console.error('Error fetching data:', error);
  }
};


  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState<boolean>(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState<boolean>(false);

  const toggleOrderDropdown = () => {
    setIsOrderDropdownOpen(!isOrderDropdownOpen);
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };
  const widthValue = '250px';
  const handleNotificationClick = (noti:Notification) => {
    if(noti.type == 'TIN NHẮN'){
      window.location.href = '/chat/'+noti.customer + '/seller';
    }else{
      alert("Đơn Hàng Mã số: " + noti.id_type + ". Với số điện thoại khách: " + noti.customer);

    }
};
  return (
    <div id="sidebar-multi-level-sidebar" style={{ width: widthValue }} className="fixed  top-0 left-0 z-40 w-150 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <NavLink to={path.home}>
              <span className="ms-3 text-4xl text-red-500">BONIK</span>
              </NavLink>
            </a>
          </li>
          <li>
            <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="order-dropdown" onClick={toggleOrderDropdown}>
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap  mx-2">Quản Lý Đơn Hàng</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
            <ul id="order-dropdown" className={isOrderDropdownOpen ? "py-2 space-y-2" : "hidden py-2 space-y-2"}>
            <NavLink to={`${path.adminhome.replace(':status', '2')}`}>
              <li>
                <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Tất Cả</a>
              </li>
              </NavLink>
              

              <NavLink to={`${path.adminhome.replace(':status', '4')}`}>
              <li>
                <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Cài Đặt Vận Chuyển   </a>
              </li>
              </NavLink>
            </ul>
          </li>
          <li>
            <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="product-dropdown" onClick={toggleProductDropdown}>
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap  mx-2">Quản Lý Sản Phẩm</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
            <ul id="product-dropdown" className={isProductDropdownOpen ? "py-2 space-y-2" : "hidden py-2 space-y-2"}>
              <NavLink to={`${path.adminhome.replace(':status', '0')}`}>
              <li>
                <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Tất Cả</a>
              </li>


              </NavLink>
              <NavLink to={`${path.adminhome.replace(':status', '1')}`}>
              <li>
                <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Thêm Sản Phẩm</a>
              </li>
              </NavLink>
              <NavLink to={path.pageListPromotion}>
              <li>
                <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Danh sách Khuyến mãi</a>
              </li>
              </NavLink>
             <NavLink to={path.pageFormPromotion.replace(':promotionId', '0')}>
             <li>
                <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Thêm Khuyến mãi</a>
              </li>
              </NavLink> 
            </ul>
          </li>
          <li onClick={handleClick}>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Thông Báo</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Thông Tin Shop</span>
            </a>
         </li>
      </ul>
   </div>
   {showModal1 && (
          <div className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg text-black'>
              <h2 className='text-lg font-bold mb-4'>Danh Sách Thông Báo</h2>
              <ul className="space-y-4">
              {notifications.map((notification, index) => (
                  <li key={index} className="flex items-center justify-between bg-slate-400 p-2 m-2 cursor-pointer" onClick={() => handleNotificationClick(notification)}>
                      <strong>Mô tả:</strong> {notification.description}<br />
                      <strong>Ngày:</strong> {new Date(notification.date).toLocaleString()}<br />
                  </li>
              ))}

                </ul>

              <button className='bg-red-500 text-white font-bold py-2 px-4 rounded mt-2' onClick={() => setShowModal1(false)}>
                Đóng
              </button>
            </div>
          </div>
        )}
</div>
  );
};

export default Navbar;
