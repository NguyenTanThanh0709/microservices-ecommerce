import React, { useState, useEffect } from 'react';
import { Col, Container } from 'react-bootstrap';
import { ThongtinChiTiet_, BrandData, BrandReponse, Product } from 'src/constants/contant';
import axiosInstance from 'src/apis/axiosClient'; 

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

const FormAoQuan: React.FC<{ updateFormDataProduct: (data: Partial<Product>) => void }> = ({ updateFormDataProduct }) => {
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

export default FormAoQuan;
