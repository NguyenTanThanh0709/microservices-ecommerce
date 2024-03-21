import React, { useState } from 'react';
import { Col, Container } from 'react-bootstrap';

interface FormData {
  brand: string;
  watchType: string;
  warrantyType: string;
  caseType: string;
  buckleType: string;
  features: string[];
  glassType: string;
  warrantyPeriod: string;
  leatherType: string;
  manufacturerAddress: string;
  dialType: string;
  watchStyle: string;
  caseDiameter: string;
  caseMaterial: string;
  strapMaterial: string;
  waterResistance: string;
  origin: string;
  material: string;
  manufacturerName: string;
  watchLength: string;
}

const WatchForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    brand: '',
    watchType: '',
    warrantyType: '',
    caseType: '',
    buckleType: '',
    features: [],
    glassType: '',
    warrantyPeriod: '',
    leatherType: '',
    manufacturerAddress: '',
    dialType: '',
    watchStyle: '',
    caseDiameter: '',
    caseMaterial: '',
    strapMaterial: '',
    waterResistance: '',
    origin: '',
    material: '',
    manufacturerName: '',
    watchLength: '',
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

          {/* Watch Type */}
          <div className="mb-4">
            <label htmlFor="watchType" className="block font-medium mb-2 text-red-500">Loại đồng hồ</label>
            <input
              type="text"
              id="watchType"
              name="watchType"
              value={formData.watchType}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập loại đồng hồ"
            />
          </div>

          {/* Warranty Type */}
          <div className="mb-4">
            <label htmlFor="warrantyPeriod" className="block font-medium mb-2 text-red-500">Thời gian bảo hành (tháng)</label>
            <input
              type="text"
              id="warrantyPeriod"
              name="warrantyPeriod"
              value={formData.warrantyPeriod}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập thời gian bảo hành (tháng)"
            />
          </div>

          {/* Case Type */}
          <div className="mb-4">
            <label htmlFor="caseType" className="block font-medium mb-2 text-red-500">Kiểu vỏ đồng hồ</label>
            <select
              id="caseType"
              name="caseType"
              value={formData.caseType}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn kiểu vỏ đồng hồ</option>
              <option value="Khác">Khác</option>
              <option value="Carre">Carre</option>
              <option value="O-van">O-van</option>
              <option value="Hình chữ nhật">Hình chữ nhật</option>
              <option value="Tròn">Tròn</option>
              <option value="Vuông">Vuông</option>
              <option value="Tonneau">Tonneau</option>
            </select>
          </div>

          {/* Buckle Type */}
          <div className="mb-4">
            <label htmlFor="buckleType" className="block font-medium mb-2 text-red-500">Kiểu khóa đồng hồ</label>
            <select
              id="buckleType"
              name="buckleType"
              value={formData.buckleType}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn kiểu khóa đồng hồ</option>
              <option value="Khác">Khác</option>
              <option value="Khóa dán">Khóa dán</option>
              <option value="Cài khóa">Cài khóa</option>
            </select>
          </div>
        </Col>

        <Col lg={6}>
          {/* Glass Type */}
          <div className="mb-4">
            <label htmlFor="glassType" className="block font-medium mb-2 text-red-500">Kính đồng hồ</label>
            <select
              id="glassType"
              name="glassType"
              value={formData.glassType}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn kính đồng hồ</option>
              <option value="Kính Cường Lực">Kính Cường Lực</option>
              <option value="Kính Thủy tinh">Kính Thủy tinh</option>
              <option value="Kính Sapphire">Kính Sapphire</option>
              <option value="Nhựa">Nhựa</option>
            </select>
          </div>

          {/* Dial Type */}
          <div className="mb-4">
            <label htmlFor="dialType" className="block font-medium mb-2 text-red-500">Loại mặt số</label>
            <input
              type="text"
              id="dialType"
              name="dialType"
              value={formData.dialType}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập loại mặt số"
            />
          </div>

          {/* Watch Style */}
          <div className="mb-4">
            <label htmlFor="watchStyle" className="block font-medium mb-2 text-red-500">Phong cách đồng hồ</label>
            <input
              type="text"
              id="watchStyle"
              name="watchStyle"
              value={formData.watchStyle}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập phong cách đồng hồ"
            />
          </div>

          {/* Case Diameter */}
          <div className="mb-4">
            <label htmlFor="caseDiameter" className="block font-medium mb-2 text-red-500">Đường kính vỏ đồng hồ (mm)</label>
            <input
              type="text"
              id="caseDiameter"
              name="caseDiameter"
              value={formData.caseDiameter}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập đường kính vỏ đồng hồ (mm)"
            />
          </div>

          {/* Case Material */}
          <div className="mb-4">
            <label htmlFor="caseMaterial" className="block font-medium mb-2 text-red-500">Chất liệu vỏ đồng hồ</label>
            <select
              id="caseMaterial"
              name="caseMaterial"
              value={formData.caseMaterial}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn chất liệu vỏ đồng hồ</option>
              <option value="Hợp kim">Hợp kim</option>
              <option value="Gốm sứ">Gốm sứ</option>
              <option value="Khác">Khác</option>
              <option value="Nhựa">Nhựa</option>
              <option value="Thép không gỉ">Thép không gỉ</option>
              <option value="Titanium">Titanium</option>
            </select>
          </div>

          {/* Strap Material */}
          <div className="mb-4">
            <label htmlFor="strapMaterial" className="block font-medium mb-2 text-red-500">Chất liệu dây đeo</label>
            <select
              id="strapMaterial"
              name="strapMaterial"
              value={formData.strapMaterial}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn chất liệu dây đeo</option>
              <option value="Hợp kim">Hợp kim</option>
              <option value="Da">Da</option>
              <option value="Nylon">Nylon</option>
              <option value="Nhựa">Nhựa</option>
              <option value="Da tổng hợp">Da tổng hợp</option>
              <option value="Cao su">Cao su</option>
              <option value="Silicone">Silicone</option>
              <option value="Thép không gỉ">Thép không gỉ</option>
            </select>
          </div>

          {/* Water Resistance */}
          <div className="mb-4">
            <label htmlFor="waterResistance" className="block font-medium mb-2 text-red-500">Khả năng chịu nước (ATM)</label>
            <input
              type="text"
              id="waterResistance"
              name="waterResistance"
              value={formData.waterResistance}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập khả năng chịu nước (ATM)"
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

export default WatchForm;
