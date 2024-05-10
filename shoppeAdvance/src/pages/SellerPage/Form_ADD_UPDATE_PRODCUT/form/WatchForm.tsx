import React, { useState, useEffect } from 'react';
import { Col, Container } from 'react-bootstrap';
import { ThongtinChiTiet_, BrandData, BrandReponse, Product } from 'src/constants/contant';
import axiosInstance from 'src/apis/axiosClient'; 
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

const WatchForm: React.FC<{ updateFormDataProduct: (data: Partial<Product>) => void }> = ({ updateFormDataProduct }) => {
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
      console.log({
        description: formthongtinchitiet.description,
        idBrand: formthongtinchitiet.idBrand,
    })
      alert("Lưu Thành Công")
    }

  return (
    <Container>
      <div className='flex text-2xl m-4 p-4 justify-content-center justify-between w-full'>
        <Col lg={6}>
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
            <option  value=''>Chọn Brand</option>

            {brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
            </select>
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

export default WatchForm;
