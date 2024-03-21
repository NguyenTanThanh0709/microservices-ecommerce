import React, { useState } from 'react';
import { Col, Container } from 'react-bootstrap';

interface FormData {
  brand: string;
  material: string;
  lockType: string;
  outerMaterial: string;
  shoeStyle: string;
  suitableWidth: string;
  manufacturerAddress: string;
  origin: string;
  occasion: string;
  highHeels: string;
  leatherType: string;
  shoeHeight: string;
  manufacturerName: string;
}

const FormGiay: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    brand: '',
    material: '',
    lockType: '',
    outerMaterial: '',
    shoeStyle: '',
    suitableWidth: '',
    manufacturerAddress: '',
    origin: '',
    occasion: '',
    highHeels: '',
    leatherType: '',
    shoeHeight: '',
    manufacturerName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container>
      <div className='flex text-2xl m-4 p-4 justify-content-center justify-between w-full'>
        <Col lg={6}>
          {/* Brand */}
          <div className="mb-4">
            <label htmlFor="brand" className="block font-medium mb-2 text-red-500">Thương hiệu</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập thương hiệu"
            />
          </div>

          {/* Material */}
          <div className="mb-4">
            <label htmlFor="material" className="block font-medium mb-2 text-red-500">Chất liệu</label>
            <select
              id="material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn chất liệu</option>
              <option value="Canvas">Canvas</option>
              <option value="Nylon">Nylon</option>
              <option value="Cao su">Cao su</option>
              <option value="Da">Da</option>
              <option value="Khác">Khác</option>
              <option value="Sợi tổng hợp">Sợi tổng hợp</option>
              <option value="Cối">Cối</option>
              <option value="Da PU">Da PU</option>
            </select>
          </div>

          {/* Lock Type */}
          <div className="mb-4">
            <label htmlFor="lockType" className="block font-medium mb-2 text-red-500">Loại Khóa</label>
            <select
              id="lockType"
              name="lockType"
              value={formData.lockType}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn loại khóa</option>
              <option value="Khóa cài">Khóa cài</option>
              <option value="Khóa dây">Khóa dây</option>
              <option value="Khóa kéo">Khóa kéo</option>
              <option value="Khóa dán">Khóa dán</option>
              <option value="Khóa Zip">Khóa Zip</option>
              <option value="Móc và vòng">Móc và vòng</option>
            </select>
          </div>

          {/* Loại da */}
          <div className="mb-4">
            <label htmlFor="leatherType" className="block font-medium mb-2 text-red-500">Loại da</label>
            <select
              id="leatherType"
              name="leatherType"
              value={formData.leatherType}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn loại da</option>
              <option value="Dập nổi">Dập nổi</option>
              <option value="Bóng">Bóng</option>
              <option value="Mờ">Mờ</option>
            </select>
          </div>

        </Col>

        <Col lg={6}>
          {/* Shoe Style */}
          <div className="mb-4">
            <label htmlFor="shoeStyle" className="block font-medium mb-2 text-red-500">Kiểu giày</label>
            <select
              id="shoeStyle"
              name="shoeStyle"
              value={formData.shoeStyle}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn kiểu giày</option>
              <option value="Giày lười">Giày lười</option>
              <option value="Giày sneaker">Giày sneaker</option>
            </select>
          </div>

          {/* Suitable Width */}
          <div className="mb-4">
            <label htmlFor="suitableWidth" className="block font-medium mb-2 text-red-500">Chiều rộng phù hợp</label>
            <input
              type="text"
              id="suitableWidth"
              name="suitableWidth"
              value={formData.suitableWidth}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập chiều rộng phù hợp"
            />
          </div>

          {/* Giày cao gót */}
          <div className="mb-4">
            <label htmlFor="highHeels" className="block font-medium mb-2 text-red-500">Giày cao gót</label>
            <select
              id="highHeels"
              name="highHeels"
              value={formData.highHeels}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn chiều cao gót giày</option>
              <option value="Cao">Cao</option>
              <option value="Thấp">Thấp</option>
              <option value="Trung Bình">Trung Bình</option>
              <option value="Không gót">Không gót</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          {/* Chiều cao cổ giày */}
          <div className="mb-4">
            <label htmlFor="shoeHeight" className="block font-medium mb-2 text-red-500">Chiều cao cổ giày</label>
            <select
              id="shoeHeight"
              name="shoeHeight"
              value={formData.shoeHeight}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn chiều cao cổ giày</option>
              <option value="Dài">Dài</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Ngắn">Ngắn</option>
            </select>
          </div>

          {/* Manufacturer Address */}
          <div className="mb-4">
            <label htmlFor="manufacturerAddress" className="block font-medium mb-2 text-red-500">Địa chỉ tổ chức chịu trách nhiệm sản xuất</label>
            <input
              type="text"
              id="manufacturerAddress"
              name="manufacturerAddress"
              value={formData.manufacturerAddress}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập địa chỉ"
            />
          </div>
        </Col>
      </div>
    </Container>
  );
};

export default FormGiay;
