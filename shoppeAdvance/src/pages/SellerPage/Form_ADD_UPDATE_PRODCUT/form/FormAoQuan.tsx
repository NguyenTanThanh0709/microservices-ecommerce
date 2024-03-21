import React, { useState } from 'react';
import { Col, Container } from 'react-bootstrap';

interface FormData {
  brand: string;
  material: string;
  collar: string;
  petite: string;
  season: string;
  style: string;
  size: string;
  manufacturerAddress: string;
  origin: string;
  croppedTop: string;
  occasion: string;
  model: string;
  sleeveLength: string;
  shirtLength: string;
  manufacturerName: string;
}

const FormAoQuan: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    brand: '',
    material: '',
    collar: '',
    petite: '',
    season: '',
    style: '',
    size: '',
    manufacturerAddress: '',
    origin: '',
    croppedTop: '',
    occasion: '',
    model: '',
    sleeveLength: '',
    shirtLength: '',
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

          {/* Collar */}
          <div className="mb-4">
            <label htmlFor="collar" className="block font-medium mb-2 text-red-500">Cổ áo</label>
            <select
              id="collar"
              name="collar"
              value={formData.collar}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn cổ áo</option>
              <option value="Cổ thuyền">Cổ thuyền</option>
              <option value="Cổ sơ mi">Cổ sơ mi</option>
              <option value="Dây">Dây</option>
              <option value="Trễ vai">Trễ vai</option>
              <option value="Khác">Khác</option>
              <option value="Cổ tròn">Cổ tròn</option>
              <option value="Cổ lọ">Cổ lọ</option>
              <option value="Cổ chữ V">Cổ chữ V</option>
            </select>
          </div>

          {/* Petite */}
          <div className="mb-4">
            <label htmlFor="petite" className="block font-medium mb-2 text-red-500">Petite</label>
            <select
              id="petite"
              name="petite"
              value={formData.petite}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn petite</option>
              <option value="có">có</option>
              <option value="không">không</option>
            </select>
          </div>

          {/* Season */}
          <div className="mb-4">
            <label htmlFor="season" className="block font-medium mb-2 text-red-500">Mùa</label>
            <select
              id="season"
              name="season"
              value={formData.season}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn mùa</option>
              <option value="Mùa thu">Mùa thu</option>
              <option value="Mùa xuân">Mùa xuân</option>
              <option value="Mùa hè">Mùa hè</option>
              <option value="Mùa đông">Mùa đông</option>
            </select>
          </div>

          {/* Style */}
          <div className="mb-4">
            <label htmlFor="style" className="block font-medium mb-2 text-red-500">Phong cách</label>
            <select
              id="style"
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn phong cách</option>
              <option value="Thể thao">Thể thao</option>
              <option value="Cơ bản">Cơ bản</option>
              <option value="Boho">Boho</option>
              <option value="Hàn Quốc">Hàn Quốc</option>
              <option value="Tối giản">Tối giản</option>
              <option value="Retro">Retro</option>
              <option value="Sexy">Sexy</option>
              <option value="Đường phố">Đường phố</option>
            </select>
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

          {/* Cropped Top */}
          <div className="mb-4">
            <label htmlFor="croppedTop" className="block font-medium mb-2 text-red-500">Cropped Top</label>
            <select
              id="croppedTop"
              name="croppedTop"
              value={formData.croppedTop}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Có/Không</option>
              <option value="Có">Có</option>
              <option value="Không">Không</option>
            </select>
          </div>

          {/* Occasion */}
          <div className="mb-4">
            <label htmlFor="occasion" className="block font-medium mb-2 text-red-500">Dịp</label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn dịp</option>
              <option value="Hằng ngày">Hằng ngày</option>
              <option value="Công việc">Công việc</option>
              <option value="Thể thao">Thể thao</option>
            </select>
          </div>

          {/* Model */}
          <div className="mb-4">
            <label htmlFor="model" className="block font-medium mb-2 text-red-500">Mẫu</label>
            <select
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
            >
              <option value="">Chọn mẫu</option>
              <option value="Trơn">Trơn</option>
              <option value="Chấm bi">Chấm bi</option>
              <option value="In">In</option>
              <option value="Sọc">Sọc</option>
              <option value="Nhuộm">Nhuộm</option>
            </select>
          </div>

          {/* Sleeve Length */}
          <div className="mb-4">
            <label htmlFor="sleeveLength" className="block font-medium mb-2 text-red-500">Chiều dài tay áo</label>
            <input
              type="text"
              id="sleeveLength"
              name="sleeveLength"
              value={formData.sleeveLength}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập chiều dài tay áo"
            />
          </div>

          {/* Shirt Length */}
          <div className="mb-4">
            <label htmlFor="shirtLength" className="block font-medium mb-2 text-red-500">Chiều dài áo</label>
            <input
              type="text"
              id="shirtLength"
              name="shirtLength"
              value={formData.shirtLength}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Nhập chiều dài áo"
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

export default FormAoQuan;
