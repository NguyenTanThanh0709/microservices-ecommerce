import React, { useState, useEffect } from 'react';
import { Col, Container } from 'react-bootstrap';
import { ThongtinChiTiet_, BrandData, BrandReponse, Product } from 'src/constants/contant';
import axiosInstance from 'src/apis/axiosClient'; 


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

const FormQuanAo: React.FC<{ updateFormDataProduct: (data: Partial<Product>) => void }> = ({ updateFormDataProduct }) => {

  const [formthongtinchitiet, setFormthongtinchitiet] = useState<ThongtinChiTiet_>({
    description: '',
    idBrand: 0,
  });


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

  const [formDatabrand, setFormDataBrand] = useState<BrandData>({
    name: "",
    slug: "",
    urlBrand: "",
  });

  const [brands, setBrands] = useState<BrandReponse[]>([]);

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

  const handleSubmitBrand = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formDatabrand);
    
    fetchDataPost(formDatabrand);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
  

  const handleClick = () => {
    
      
      // console.log(formthongtinchitiet);
      updateFormDataProduct({
        description: formthongtinchitiet.description,
        idBrand: formthongtinchitiet.idBrand,
    });

    alert("Lưu Thành Công")

  }

  useEffect(() => {
      setFormthongtinchitiet({
        description: formDataToString(formData),
        idBrand: parseInt(formData.brand, 10)
      });
  }, [formData]);

  const isFormDataNull = (data: FormData): boolean => {
    for (const key in data) {
      if (data[key as keyof FormData] === '') {
        return true;
      }
    }
    return false;
  };
  
  useEffect(() => {
    fetchData();
  }, []);

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

export default FormQuanAo;
