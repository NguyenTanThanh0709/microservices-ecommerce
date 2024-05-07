import React, { useEffect, useState } from 'react';
import Navbar from 'src/pages/SellerPage/components/Navbar/Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import ProductTable from '../ListProduct/ProductTable';
import ListOrder from '../ListOrder/ListOrder';
import Form_ADD_UPDATE_PRODCUT from '../Form_ADD_UPDATE_PRODCUT/Form_ADD_UPDATE_PRODCUT';
import { useParams } from 'react-router-dom';
import CaiDatGiaoHang from '../CaiDatGiaoHang/CaiDatGiaoHang';
import { Product } from 'src/types/product.type';
import axiosInstance from 'src/apis/axiosClient';


export default function Home() {
  const { status } = useParams();

  // Kiểm tra xem status có dạng status-idproduct không
  const statusParts = status ? status.split('-') : [''];
  const statusId = statusParts[0];
  const idProduct = statusParts[1];

  const [userProducts, setUserProducts] = useState<Product[]>([]);
  useEffect(() => {
    if(statusId === '0'){
      let idString = localStorage.getItem('id');
      if (idString !== null) {
        let id = parseInt(idString);
        fetchUserProducts(id);
      }
    }


  },[status])

  console.log('userProducts:', userProducts);

  const fetchUserProducts = async (id:number) => {
    try {
      const response = await axiosInstance.get(`/api/v1/products/user?iduser=${id}`);
      setUserProducts(response.data);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error fetching user products:', error);

    }
  };

  return (
    <div>
      <Container>
        <div className='w-full'>
          <Row>
            <Col lg={3}><Navbar/></Col>
            <Col lg={9} className='p-4 sm:ml-60'>
              {statusId === '0' && <ProductTable products={userProducts} />}
              {statusId === '1' && (idProduct ? <Form_ADD_UPDATE_PRODCUT productId={idProduct} /> : <Form_ADD_UPDATE_PRODCUT productId="" />)}
              {statusId === '2' && <ListOrder />}
              {statusId === '4' && <CaiDatGiaoHang />}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
