import Navbar from 'src/pages/SellerPage/components/Navbar/Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import {  useQuery } from '@tanstack/react-query'
import React, { useEffect, useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import path from 'src/constants/path'
import axiosClient from 'src/apis/axiosClient'
import { useParams } from 'react-router-dom';

import { formatCurrency, generateNameId } from 'src/utils/utils'

interface PromotionData {
    name: string;
    idUser: string;
    description: string;
    code: string;
    isActive: boolean;
    startDate: string; // Có thể sử dụng kiểu Date nếu bạn muốn xử lý ngày tháng
    endDate: string; // Có thể sử dụng kiểu Date nếu bạn muốn xử lý ngày tháng
    discountValue: number;
    idProducts?: string[];
}

const Promotion: React.FC = () => {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [discountValue, setDiscountValue] = useState<number>(0);
    const [idProducts ,setIdProducts] = useState<string[]>([]);
    const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
    const [promotion, setPromotion] = useState<PromotionData>();


    const validateData = (data: any) => {
        // Validation rules for each property
        const nameIsValid = data.name.trim() !== '';
        const descriptionIsValid = data.description.trim() !== '';
        const codeIsValid = data.code.trim() !== '';
        const isActiveIsValid = typeof data.isActive === 'boolean';
        const startDateIsValid = data.startDate.trim() !== '';
        const endDateIsValid = data.endDate.trim() !== '';
        const discountValueIsValid = typeof data.discountValue === 'number' && data.discountValue >= 0;
        const idProductsIsValid = Array.isArray(data.idProducts) && data.idProducts.length > 0;
    
        // Check if all properties are valid
        return (
            nameIsValid &&
            descriptionIsValid &&
            codeIsValid &&
            isActiveIsValid &&
            startDateIsValid &&
            endDateIsValid &&
            discountValueIsValid &&
            idProductsIsValid
        );
    };



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formattedStartDate = new Date(startDate).toISOString()
    let formattedEndDate = new Date(endDate).toISOString()
    const id = localStorage.getItem("id");
    const promotionData: PromotionData = {
        name,
        description,
        code,
        isActive,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        discountValue,
        idProducts,
        idUser: id ? id : ''
    };

      if(validateData(promotionData)){
        if(promotionId != '0' && promotionId != null){
          fetchUpdateUpdatePromotions(promotionId,promotionData)
        }else{

          fetchUpdatePromotions(promotionData)
        }
      }else{
        alert("Vui lòng điền đủ thông tin!")
      }

  };

  const fetchUpdatePromotions = async (data: any) => {
    try {
        console.log(data)
        const response = await axiosClient.post('api/v1/promotions/', data);
        if(response){
            alert("Thêm khuyến mãi thành công!");
        }
    } catch (error) {
        alert("Thêm khuyến mãi không thành công!: ");

        console.error('Error uploading images:', error);
    }
  }

  const fetchUpdateUpdatePromotions = async (id:string,data: any) => {
    try {
        console.log(data)
        const response = await axiosClient.put(`api/v1/promotions/${id}`, data);
        if(response){
            alert("Update khuyến mãi thành công!");
        }
    } catch (error) {
        alert("Update khuyến mãi không thành công!: ");

        console.error('Error uploading images:', error);
    }
  }

 const fecthGetPromotion = async (id:string) =>{
  try {

    const response = await axiosClient.get(`api/v1/promotions/${id}`);
    if(response){
      setName(response.data.name)
      setDescription(response.data.description)
      setCode(response.data.code)
      setIsActive(response.data.isActive)
      const endDateString = response.data.endDate; // Chuỗi ngày tháng từ response
      // Tạo một đối tượng Date từ chuỗi ngày tháng
      const endDate = new Date(endDateString);
      setEndDate(endDate.toISOString().split('T')[0]); // Chuyển đổi thành định dạng yyyy-MM-dd

      const startDateString = response.data.startDate; // Chuỗi ngày tháng từ response
      // Tạo một đối tượng Date từ chuỗi ngày tháng
      const startDate = new Date(startDateString);
      setStartDate(startDate.toISOString().split('T')[0]); // Chuyển đổi thành định dạng yyyy-MM-dd

      setDiscountValue(response.data.discountValue)

      const products = response.data.discountApps;
      const productIds: string[] = [];
      for (let i = 0; i < products.length; i++) {
        productIds.push(products[i].idProduct.toString());
      }
      setIdProducts(productIds);
      
    }
} catch (error) {
    console.error('Error uploading images:', error);
}
 }


  const id = localStorage.getItem('id');
  const userId = id !== null ? parseInt(id) : 0;
  const token = localStorage.getItem('accessToken');
  const tokenus = token !== null ? token :""

  const { data: purchasesInCartData, refetch } = useQuery({
    queryFn: () => productApi.getProductByUser(userId),
  });

  const location = useLocation()
  const purchasesInCart = purchasesInCartData?.data


  let { promotionId } = useParams();
  useEffect(() => {
    if(promotionId != '0' && promotionId != null){
      console.log(promotionId)
      fecthGetPromotion(promotionId)
    }
  }, [])



  console.log(promotion)


  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsCheckedAll(checked);
    if (checked) {
        // If "Select All" is checked, add all purchase IDs to the idProducts state
        const allProductIds = purchasesInCart.map(purchase => purchase.id.toString());
        setIdProducts(allProductIds);
    } else {
        // If "Select All" is unchecked, clear idProducts state
        setIdProducts([]);
    }
};

const handleCheck = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    // Update idProducts state based on the checked status of individual items
    if (checked) {
        setIdProducts(prevIds => [...prevIds, purchasesInCart[index].id.toString()]);
    } else {
        setIdProducts(prevIds => prevIds.filter(id => id !== purchasesInCart[index].id.toString()));
    }
};



  return (
    <div>
        
      <Container>
        <div className='w-full'>
          <Row>
            <Col lg={3}><Navbar/></Col>
            <Col lg={9} className='p-4 sm:ml-60'>

            <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div className="mb-4">
        <label htmlFor="code" className="block text-gray-700">Code</label>
        <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div className="mb-4">
        <label htmlFor="isActive" className="block text-gray-700">Active</label>
        <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="mt-1" />
      </div>
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-gray-700">Start Date</label>
        <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-gray-700">End Date</label>
        <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div className="mb-4">
        <label htmlFor="discountValue" className="block text-gray-700">Discount Value</label>
        <input type="number" id="discountValue" value={discountValue} onChange={(e) => setDiscountValue(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div>
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">Submit</button>
      </div>
    </form>
            </Col>
          </Row>
        </div>





        {purchasesInCart ? (
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
                  checked={isCheckedAll}
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
            </div>
          </div>
        </div>
        <div className='my-3 rounded-sm bg-white p-5 shadow'>
          {purchasesInCart.map((purchase, index) => (
            <div
              key={purchase.id}
              className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
            >
              <div className='col-span-6'>
                <div className='flex'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={idProducts.includes(purchase.id.toString())}
                      onChange={handleCheck(index)}
                    />
                  </div>
                  <div className='flex-grow'>
                    <div className='flex'>
                      <Link
                        className='h-20 w-20 flex-shrink-0 '
                        to={`${path.home}${generateNameId({
                          name: purchase.name,
                          id: purchase.id.toString()
                        })}`}
                      >
                        <img alt={purchase.name} src={purchase.productImages[0].urlimg} />
                      </Link>
                      <div className='flex-grow px-2 pt-1 pb-2'>
                        <Link
                          to={`${path.home}${generateNameId({
                            name: purchase.name,
                            id: purchase.id.toString()
                          })}`}
                          className='text-left line-clamp-2'
                        >
                          {purchase.name}
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
                      <span className='ml-3'>₫{formatCurrency(purchase.price)}</span>
                    </div>
                  </div>
                  <div className='col-span-1'>
                    {purchase.stockQuantity}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
) : (
  <></>
)}



      </Container>
    </div>
  )
}
export default Promotion    