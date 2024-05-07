import React, { useState, useEffect } from 'react';
import { Col, Container } from 'react-bootstrap';
import { ThongtinChiTiet_, BrandData, BrandReponse, Product } from 'src/constants/contant';
import axiosInstance from 'src/apis/axiosClient'; 
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

const FormGiay: React.FC<{ updateFormDataProduct: (data: Partial<Product>) => void }> = ({ updateFormDataProduct }) => {
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


    // +++++++++++++++++++++++++++++++++++++++++++++++++==
    const handleSubmitBrand = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(formDatabrand);
      
      fetchDataPost(formDatabrand);
    };
    const [formDatabrand, setFormDataBrand] = useState<BrandData>({
      name: "",
      slug: "",
      urlBrand: "",
    });
    async function fetchDataPost(data: any) {
      try {
          // Example POST request
          const response = await axiosInstance.post('/api/v1/products/seller/add-brand', data);
          alert('Thêm thương hiệu thành công');
          fetchData()
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }
    useEffect(() => {
      fetchData();
    }, []);
    const [brands, setBrands] = useState<BrandReponse[]>([]);
  
    async function fetchData() {
      try {
          // Example GET request
          const response = await axiosInstance.get('/api/v1/products/brand-list');
          // console.log(response.data);
          setBrands(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }
    const handleChangeBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormDataBrand((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const brandValue = e.target.value;
      setFormData((prevData) => ({
        ...prevData,
        brand: brandValue,
      }));
    };

    

    // =====================================
    useEffect(() => {
      setFormthongtinchitiet({
        description: formDataToString(formData),
        idBrand: parseInt(formData.brand, 10)
      });
  }, [formData]);
  const formDataToString = (data: FormData): string => {
    let result = '';
    for (const key in data) {
      if (key !== 'brand') {
        result += key + ': ' + data[key as keyof FormData] + '-';
      }
    }
    // Remove the trailing dash if it exists
    if (result.endsWith('-')) {
      result = result.slice(0, -1);
    }
    return result;
  };

    const isFormDataNull = (data: FormData): boolean => {
      for (const key in data) {
        if (data[key as keyof FormData] === '') {
          return true;
        }
      }
      return false;
    };

    const [formthongtinchitiet, setFormthongtinchitiet] = useState<ThongtinChiTiet_>({
      description: '',
      idBrand: 0,
    });
    const handleClick = () => {
        updateFormDataProduct({
          description: formthongtinchitiet.description,
          idBrand: formthongtinchitiet.idBrand,
      });
      alert("Lưu Thành Công")
    }

  return (
    <Container>
      <div className='flex text-2xl m-4 p-4 justify-content-center justify-between w-full'>
        <Col lg={6}>
          {/* Brand */}
          {/* Brand */}
          <form onSubmit={handleSubmitBrand} className="max-w-lg p-2  mx-auto mt-8">  
            <div>Thêm thương hiệu nếu bạn muốn</div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formDatabrand.name}
              onChange={handleChangeBrand}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="slug" className="block text-gray-700 font-bold mb-2">
              Slug:
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formDatabrand.slug}
              onChange={handleChangeBrand}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="urlBrand"
              className="block text-gray-700 font-bold mb-2"
            >
              URL Brand:
            </label>
            <input
              type="text"
              id="urlBrand"
              name="urlBrand"
              value={formDatabrand.urlBrand}
              onChange={handleChangeBrand}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          </form>

          <div className="mb-4">
            <label htmlFor="brand" className="block font-medium mb-2 text-red-500">Thương hiệu</label>
            <select className="w-full p-2 border rounded-md" onChange={handleBrandChange}>
            {brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
            </select>
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
      <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClick}
                  >
                    Save
                  </button>
    </Container>
  );
};

export default FormGiay;
