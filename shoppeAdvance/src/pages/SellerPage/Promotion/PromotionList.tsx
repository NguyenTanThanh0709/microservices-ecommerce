import React, { useEffect, useState, useMemo } from 'react'
import Navbar from 'src/pages/SellerPage/components/Navbar/Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import {DiscountCode} from 'src/constants/contant'
import axiosClient from 'src/apis/axiosClient'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Trong component

<td className='px-6 py-4 whitespace-nowrap'>
  <FontAwesomeIcon icon={faPen} className='text-gray-400 hover:text-gray-600 cursor-pointer' />
</td>

const PromotionList: React.FC = () => {
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);

  // Sử dụng useEffect để gọi API hoặc nhận dữ liệu từ nguồn nào đó khi component được tạo ra
  useEffect(() => {
    const id = localStorage.getItem('id');
    const userId = id !== null ? parseInt(id) : 0;
    fetchGetPromotions(userId)

  }, []);

  const fetchGetPromotions = async (userId:number) => {
    try {
        const response = await axiosClient.get(`/api/v1/promotions/user/${userId}`);
        setDiscountCodes(response.data)
    } catch (error) {

        console.error('Error uploading images:', error);
    }
  }
console.log(discountCodes)
  return (
<div>
      <Container>
        <div className='w-full'>
          <Row>
            <Col lg={3}><Navbar /></Col>
            <Col lg={9} className='p-4 sm:ml-60'>
              <h2>Promotion List</h2>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Name
                      </th>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Description
                      </th>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Code
                      </th>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Start Date
                      </th>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        End Date
                      </th>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Discount Value
                      </th>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Thao Tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {discountCodes.map((code) => (
                      <tr key={code.id}>
                        <td className='px-6 py-4 whitespace-nowrap'>{code.name}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>{code.description}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>{code.code}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>{code.startDate}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>{code.endDate}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>{code.discountValue}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                        <Link to={`/admin-promiton/${code.id}`}>
                          <FontAwesomeIcon icon={faPen} className='text-gray-400 hover:text-gray-600 cursor-pointer' />
                        </Link>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>

  )
}
export default PromotionList    