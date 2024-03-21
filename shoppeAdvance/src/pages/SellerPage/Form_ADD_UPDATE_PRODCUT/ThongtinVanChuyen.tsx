import React, { useState } from 'react';

interface FormData {
  canNang: string;
  kichThuocDongGoi: {
    chieuDai: string;
    chieuRong: string;
    chieuCao: string;
  };
}

export default function ThongtinVanChuyen() {
  const [formData, setFormData] = useState<FormData>({
    canNang: '',
    kichThuocDongGoi: {
      chieuDai: '',
      chieuRong: '',
      chieuCao: '',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKichThuocDongGoiChange = (dimension: string, value: string) => {
    setFormData({
      ...formData,
      kichThuocDongGoi: {
        ...formData.kichThuocDongGoi,
        [dimension]: value,
      },
    });
  };

  return (
    <div className='m-4 p-4'>
      <div className="mb-4">
        <label htmlFor="canNang" className="block font-medium mb-2 text-red-500">Cân nặng (Sau khi đóng gói)</label>
        <input
          type="number"
          id="canNang"
          name="canNang"
          value={formData.canNang}
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
              id="chieuDai"
              name="chieuDai"
              value={formData.kichThuocDongGoi.chieuDai}
              onChange={(e) => handleKichThuocDongGoiChange("chieuDai", e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Chiều dài"
            />
            <span>cm</span>
          </div>
          <div className="mr-4">
            <input
              type="number"
              id="chieuRong"
              name="chieuRong"
              value={formData.kichThuocDongGoi.chieuRong}
              onChange={(e) => handleKichThuocDongGoiChange("chieuRong", e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Chiều rộng"
            />
            <span>cm</span>
          </div>
          <div className="mr-4">
            <input
              type="number"
              id="chieuCao"
              name="chieuCao"
              value={formData.kichThuocDongGoi.chieuCao}
              onChange={(e) => handleKichThuocDongGoiChange("chieuCao", e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
              placeholder="Chiều cao"
            />
            <span>cm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
