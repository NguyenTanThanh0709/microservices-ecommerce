import React from 'react';
import Navbar from 'src/pages/SellerPage/components/Navbar/Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import ProductTable from '../ListProduct/ProductTable';
import ListOrder from '../ListOrder/ListOrder';
import Form_ADD_UPDATE_PRODCUT from '../Form_ADD_UPDATE_PRODCUT/Form_ADD_UPDATE_PRODCUT';

export default function Home() {
  // Dữ liệu mẫu cho các sản phẩm
  const products = [
    { id: 1, name: 'Sản phẩm 1', price: 100000, inventory: 50, sales: 20 },
    { id: 2, name: 'Sản phẩm 2', price: 150000, inventory: 30, sales: 15 },
    { id: 3, name: 'Sản phẩm 3', price: 120000, inventory: 40, sales: 25 },
    // Thêm các sản phẩm khác nếu cần
  ];

  return (
    <div>
      <Container>
        <div className='w-full'>
          <Row>
            <Col lg={3}><Navbar/></Col>
            <Col lg={9} className='p-4 sm:ml-60'>
              {/* <ProductTable products={products} /> */}
              {/* <ListOrder/> */}
              <Form_ADD_UPDATE_PRODCUT/>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
