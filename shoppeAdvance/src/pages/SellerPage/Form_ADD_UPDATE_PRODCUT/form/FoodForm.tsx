import React, { useState } from 'react';
import { Col, Container } from 'react-bootstrap';

interface FormData {
  brand: string;
  origin: string;
  weight: string;
  ingredients: string;
  manufacturerName: string;
  expirationDate: string;
  volume: string;
  productionDate: string;
  manufacturerAddress: string;
}

const FoodForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    brand: '',
    origin: '',
    weight: '',
    ingredients: '',
    manufacturerName: '',
    expirationDate: '',
    volume: '',
    productionDate: '',
    manufacturerAddress: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container>
      <div className='flex text-2xl m-4 p-4 justify-content-center justify-between w-full'>
        <Col md={6}>
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

          {/* Origin */}
          <div className="mb-4">
            <label htmlFor="origin" className="block font-medium mb-2 text-red-500">Xuất xứ</label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập xuất xứ"
            />
          </div>

          {/* Weight */}
          <div className="mb-4">
            <label htmlFor="weight" className="block font-medium mb-2 text-red-500">Trọng lượng</label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập trọng lượng"
            />
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <label htmlFor="ingredients" className="block font-medium mb-2 text-red-500">Thành phần</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập thành phần"
            />
          </div>
        </Col>

        <Col md={6}>
          {/* Manufacturer Name */}
          <div className="mb-4">
            <label htmlFor="manufacturerName" className="block font-medium mb-2 text-red-500">Tên tổ chức chịu trách nhiệm sản xuất</label>
            <input
              type="text"
              id="manufacturerName"
              name="manufacturerName"
              value={formData.manufacturerName}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập tên tổ chức"
            />
          </div>

          {/* Expiration Date */}
          <div className="mb-4">
            <label htmlFor="expirationDate" className="block font-medium mb-2 text-red-500">Hạn sử dụng</label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            />
          </div>

          {/* Volume */}
          <div className="mb-4">
            <label htmlFor="volume" className="block font-medium mb-2 text-red-500">Thể tích</label>
            <select
              id="volume"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn thể tích</option>
              <option value="">Chọn trọng lượng</option>
              <option value="1L">1L</option>
              <option value="10ml">10ml</option>
              <option value="20ml">20ml</option>
              <option value="30ml">30ml</option>
              <option value="50ml">50ml</option>
              <option value="100ml">100ml</option>
              <option value="150ml">150ml</option>
              <option value="200ml">200ml</option>
              {/* Thêm các tùy chọn thể tích */}
            </select>
          </div>

          {/* Production Date */}
          <div className="mb-4">
            <label htmlFor="productionDate" className="block font-medium mb-2 text-red-500">Ngày sản xuất</label>
            <input
              type="date"
              id="productionDate"
              name="productionDate"
              value={formData.productionDate}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            />
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

export default FoodForm;
