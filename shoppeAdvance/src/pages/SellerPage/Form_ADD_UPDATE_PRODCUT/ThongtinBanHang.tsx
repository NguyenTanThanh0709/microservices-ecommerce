import React, { useState } from 'react';

interface FormData {
  gia: string;
  tonkhotong: string;
  tonKho_quanao: {
    [key: string]: string;
  };
  tonKho_giay: {
    [key: string]: string;
  };
}

export default function ThongtinBanHang() {
  const [formData, setFormData] = useState<FormData>({
    gia: '',
    tonkhotong: '',
    tonKho_quanao: {
      xs: '',
      s: '',
      m: '',
      l: '',
      xl: '',
      xxl: '',
    },
    tonKho_giay: {
      32: '',
      33: '',
      34: '',
      35: '',
      36: '',
      37: '',
      38: '',
      39: '',
      40: '',
      41: '',
      42: '',
      43: '',
      44: '',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuanAoTonKhoChange = (size: string, value: string) => {
    setFormData({
      ...formData,
      tonKho_quanao: {
        ...formData.tonKho_quanao,
        [size]: value,
      },
    });
  };

  const handleGiayTonKhoChange = (size: string, value: string) => {
    setFormData({
      ...formData,
      tonKho_giay: {
        ...formData.tonKho_giay,
        [size]: value,
      },
    });
  };

  return (
    <div className='m-4 p-4'>
      <div className="mb-4">
        <label htmlFor="gia" className="block font-medium mb-2 text-red-500">Giá (VNĐ)</label>
        <input
          type="number"
          id="gia"
          name="gia"
          value={formData.gia}
          onChange={handleChange}
          className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
          placeholder="Nhập giá"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="tonkhotong" className="block font-medium mb-2 text-red-500">Tồn kho tổng</label>
        <input
          type="number"
          id="tonkhotong"
          name="tonkhotong"
          value={formData.tonkhotong}
          onChange={handleChange}
          className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
          placeholder="Nhập Tồn kho tổng"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2 text-red-500">Tồn kho quần áo theo size</label>
        <div className="flex">
          {Object.keys(formData.tonKho_quanao).map((size) => (
            <div key={size} className="mr-4">
              <label htmlFor={size} className="block font-medium mb-1">{size.toUpperCase()}</label>
              <input
                type="number"
                id={size}
                name={size}
                value={formData.tonKho_quanao[size]}
                onChange={(e) => handleQuanAoTonKhoChange(size, e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded py-1 px-2 focus:outline-none focus:bg-white"
                placeholder="Nhập tồn kho"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2 text-red-500">Tồn kho giày theo size</label>
        <div className="flex">
          {Object.keys(formData.tonKho_giay).map((size) => (
            <div key={size} className="mr-4">
              <label htmlFor={size} className="block font-medium mb-1">{size.toUpperCase()}</label>
              <input
                type="number"
                id={size}
                name={size}
                value={formData.tonKho_giay[size]}
                onChange={(e) => handleGiayTonKhoChange(size, e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded py-1 px-2 focus:outline-none focus:bg-white"
                placeholder="Nhập tồn kho"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
