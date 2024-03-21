import React from 'react'
import { Col, Row } from 'react-bootstrap'
import ThongtinCoBan from './ThongtinCoBan'
// import ThongtinChiTiet from './ThongtinChiTiet'
import ThongtinBanHang from './ThongtinBanHang'
import ThongtinVanChuyen from './ThongtinVanChuyen'

export default function Form_ADD_UPDATE_PRODCUT() {
  return (
    <>
        <div className='bg-gray-100 rounded-lg shadow-md p-2'>
            <Col >
                <h1 className='text-4xl fw-bold'>Thông tin cơ bản</h1>
                <ThongtinCoBan />
            </Col>
        </div>
        <div className='bg-gray-100 rounded-lg shadow-md mt-4 p-2'>
            <Col>
            <h1 className='text-4xl fw-bold'>Thông tin Chi tiết</h1>
                {/* <ThongtinChiTiet /> */}
            </Col>
        </div>
        <div className='bg-gray-100 rounded-lg shadow-md mt-4 p-2'>
            <Col>
            <h1 className='text-4xl fw-bold'>Bán Hàng</h1>
                <ThongtinBanHang />
            </Col>
        </div>
        <div className='bg-gray-100 rounded-lg shadow-md mt-4 p-2'>
            <Col>
            <h1 className='text-4xl fw-bold'>Vận Chuyển</h1>
            <ThongtinVanChuyen/>
            </Col>
        </div>
    </>

  )
}
