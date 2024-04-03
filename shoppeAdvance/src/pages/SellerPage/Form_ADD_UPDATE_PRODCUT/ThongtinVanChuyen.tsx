import exp from 'constants';
import React, { useState } from 'react';
import {  thongtinvanchuyen, Product } from 'src/constants/contant';


interface ThongtinBanHangProps {
  updateFormDataProduct: (data: Partial<thongtinvanchuyen>) => void;
}


const ThongtinVanChuyen: React.FC<ThongtinBanHangProps> = ({ updateFormDataProduct }) => {


  const [formData, setFormData] = useState<thongtinvanchuyen>({
    cannangdonggoi:0,
    thetich_dai:0,
    thetich_rong:0,
    thetich_cao:0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = () => {
    console.log(formData);
    updateFormDataProduct({
      cannangdonggoi: formData.cannangdonggoi,
      thetich_dai: formData.thetich_dai,
      thetich_rong: formData.thetich_rong,
      thetich_cao: formData.thetich_cao,
    });
  }


  return (
    <div className='m-4 p-4'>
      <div className="mb-4">
        <label htmlFor="canNang" className="block font-medium mb-2 text-red-500">Cân nặng (Sau khi đóng gói)</label>
        <input
  type="number"
  id="canNang"
  name="cannangdonggoi" // Corrected name attribute
  value={formData.cannangdonggoi}
  onChange={handleChange}
  className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
  placeholder="Nhập cân nặng"
/>

        <span>gr</span>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2 text-red-500">Kích thước đóng gói (Phí vận chuyển thực tế sẽ thay đổi nếu bạn nhập sai kích thước)</label>
        <div className="flex">
          <div className="mr-4">
          <input
  type="number"
  id="thetich_dai"
  name="thetich_dai"
  value={formData.thetich_dai}
  onChange={handleChange}
  className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
  placeholder="Chiều dài"
/>

            <span>cm</span>
          </div>
          <div className="mr-4">
          <input
  type="number"
  id="thetich_rong"
  name="thetich_rong"
  value={formData.thetich_rong}
  onChange={handleChange}
  className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
  placeholder="Chiều rộng"
/>

            <span>cm</span>
          </div>
          <div className="mr-4">
          <input
  type="number"
  id="thetich_cao"
  name="thetich_cao"
  value={formData.thetich_cao}
  onChange={handleChange}
  className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
  placeholder="Chiều cao"
/>

            <span>cm</span>
          </div>
        </div>
      </div>
      <button
        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={handleClick}
      >
        Save
      </button>
    </div>
  );
}

export default ThongtinVanChuyen;
