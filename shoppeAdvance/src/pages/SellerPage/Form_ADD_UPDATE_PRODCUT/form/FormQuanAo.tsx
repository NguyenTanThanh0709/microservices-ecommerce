import React, { useState } from 'react';
import { Col, Container } from 'react-bootstrap';

interface FormData {
  brand: string;
  material: string;
  model: string;
  waistSize: string;
  size: string;
  manufacturerAddress: string;
  origin: string;
  pantsStyle: string;
  style: string;
  tallFit: string;
  manufacturerName: string;
}

const FormQuanAo: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    brand: '',
    material: '',
    model: '',
    waistSize: '',
    size: '',
    manufacturerAddress: '',
    origin: '',
    pantsStyle: '',
    style: '',
    tallFit: '',
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
              <option value="Cotton">Cotton</option>
              <option value="Lông cừu">Lông cừu</option>
              <option value="Nylon">Nylon</option>
              <option value="Da">Da</option>
              <option value="Denim">Denim</option>
              <option value="Lông vũ">Lông vũ</option>
              <option value="Nỉ">Nỉ</option>
              <option value="Nỉ mỏng">Nỉ mỏng</option>
              <option value="lông">lông</option>
              <option value="kaki">kaki</option>
              <option value="Đan">Đan</option>
              <option value="Lanh">Lanh</option>
              <option value="Khác">Khác</option>
              <option value="bông">bông</option>
              <option value="chinos">chinos</option>
              <option value="Sợi tổng hợp">Sợi tổng hợp</option>
              <option value="Sợi dệt">Sợi dệt</option>
              <option value="Len">Len</option>
            </select>
          </div>

          {/* Model */}
          <div className="mb-4">
            <label htmlFor="model" className="block font-medium mb-2 text-red-500">Họa tiết</label>
            <select
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn họa tiết</option>
              <option value="Sọc caro">Sọc caro</option>
              <option value="Hoa">Hoa</option>
              <option value="Khác">Khác</option>
              <option value="Trơn">Trơn</option>
              <option value="Chấm bi">Chấm bi</option>
              <option value="In">In</option>
              <option value="Sọc">Sọc</option>
              <option value="Nhuộm">Nhuộm</option>
            </select>
          </div>

          {/* Waist Size */}
          <div className="mb-4">
            <label htmlFor="waistSize" className="block font-medium mb-2 text-red-500">Bản eo</label>
            <input
              type="text"
              id="waistSize"
              name="waistSize"
              value={formData.waistSize}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập bản eo"
            />
          </div>

          {/* Size */}
          <div className="mb-4">
            <label htmlFor="size" className="block font-medium mb-2 text-red-500">Kích thước</label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập kích thước"
            />
          </div>
        </Col>

        <Col lg={6}>
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

          {/* Pants Style */}
          <div className="mb-4">
            <label htmlFor="pantsStyle" className="block font-medium mb-2 text-red-500">Kiểu dáng quần</label>
            <select
              id="pantsStyle"
              name="pantsStyle"
              value={formData.pantsStyle}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn kiểu dáng quần</option>
              <option value="Khác">Khác</option>
              <option value="Thường">Thường</option>
              <option value="Skinny">Skinny</option>
              <option value="Slim Fit">Slim Fit</option>
              <option value="Đứng">Đứng</option>
              <option value="Tapered">Tapered</option>
              <option value="Ống rộng">Ống rộng</option>
            </select>
          </div>

          {/* Style */}
          <div className="mb-4">
            <label htmlFor="style" className="block font-medium mb-2 text-red-500">Phong cách</label>
            <input
              type="text"
              id="style"
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập phong cách"
            />
          </div>

          {/* Tall Fit */}
          <div className="mb-4">
            <label htmlFor="tallFit" className="block font-medium mb-2 text-red-500">Tall Fit</label>
            <input
              type="text"
              id="tallFit"
              name="tallFit"
              value={formData.tallFit}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập tall fit"
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
        </Col>
      </div>
    </Container>
  );
};

export default FormQuanAo;
