import React, { useState, useEffect } from 'react';
import { Col, Container } from 'react-bootstrap';
import { ThongtinChiTiet_, BrandData, BrandReponse, Product } from 'src/constants/contant';
import axiosInstance from 'src/apis/axiosClient'; 

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

const FoodForm:  React.FC<{ updateFormDataProduct: (data: Partial<Product>) => void }> = ({ updateFormDataProduct }) => {
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
        <Col md={6}>
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

export default FoodForm;
