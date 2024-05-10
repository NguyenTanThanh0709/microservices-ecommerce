import axiosInstance from 'src/apis/axiosClient'; 
import axiosInstanceFile from'src/apis/axiosClientFile';
import ClipLoader from "react-spinners/ClipLoader";
import React, {useState, useEffect, CSSProperties } from 'react'
import { Col, Row } from 'react-bootstrap'
import ThongtinCoBan from './ThongtinCoBan'
import ThongtinChiTiet from './ThongtinChiTiet'
import ThongtinBanHang from './ThongtinBanHang'
import ThongtinVanChuyen from './ThongtinVanChuyen'

import {  Product } from 'src/constants/contant';

const initialFormData: Product = {
    name: "",
    shortDescription: "",
    description: "",
    idBrand: 0,
    category: "",
    price: 0,
    stockQuantity: 0,
    productSize: [],
    phoneOwner: 0,
    isPublished: true,
    isFeatured: false,
    sold: 0,
    view: 0,
    cannangdonggoi: 0,
    thetich_dai: 0,
    thetich_rong: 0,
    thetich_cao: 0,
    video:  null,
    imgs:  null,
    urlVideo : "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/INYm_KgC8co?si=bejhveXyZyHlCeix\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
    imgsurl: [],
    colors : "",
};
const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  function isValidProduct(formData: Partial<Product>): boolean {
    // Check if required fields are present
    if (
        !formData.cannangdonggoi ||
        !formData.category ||
        !formData.description ||
        !formData.idBrand ||
        !formData.imgs ||
        !formData.name ||
        !formData.price ||
        !formData.shortDescription ||
        !formData.stockQuantity ||
        !formData.thetich_cao ||
        !formData.thetich_dai ||
        // !formData.video ||
        !formData.thetich_rong 
    ) {
        return false;
    }

    return true;
}


export default function Form_ADD_UPDATE_PRODCUT({ productId }: { productId: string }) {
    const [formDataProduct, setFormDataProduct] = useState<Product>(initialFormData);
    const [formDataProduct_, setFormDataProduct_] = useState<any>({});
    // console.log(formDataProduct_);
    useEffect(() => {
        if (productId !== '') {
            // Nếu productId không rỗng, gọi hàm để fetch dữ liệu từ API
            fetchProductData(productId);

        }
    }, [productId]); // useEffect sẽ chạy mỗi khi giá trị của productId thay đổi
    const fetchProductData = async (productId: string) => {
        try {
            // Gọi API để lấy dữ liệu sản phẩm dựa trên productId
            const response = await axiosInstance.get(`/api/v1/products/one/${productId}`);
            const productData = response.data;
            setFormDataProduct_(productData);
            if(productData.category.includes('Thời Trang') && (productData.category.includes('Quần') || productData.category.includes('Váy'))){
                setChangeCategory(1)
              }else{
                setChangeCategory(2)
              }
          
              if( productData.category.includes('Giày')){
                setChangeCategory(3)
              }
              if( productData.category.includes('Đồng Hồ')){
                setChangeCategory(4)
              }
              if( productData.category.includes('Thực Phẩm')){
                setChangeCategory(5)
              }
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const [changeCategory, setChangeCategory] = useState(0);
    const updateCateGory = (data: number) => {
        setChangeCategory(data);
    };


    // console.log(formDataProduct)

    const updateFormDataProduct = (data: Partial<Product>) => {
        setFormDataProduct(prevData => ({
            ...prevData,
            ...data
        }));
    };


    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ff0000");

    const handleSave = async () => {
        if(productId != ''){
            alert("Cập Nhật Data")
            fetchUpProductUpdate()
            return 
        }
        console.log(formDataProduct);
        if(!isValidProduct(formDataProduct)) {
            alert('Điền đủ thông tin xong và vui lòng ấn save!');
            return;
        } else {
            try {
                setLoading(true);
                let id = await fetchUpProduct()
                console.log(id + '')
                fetchUpProductImgs(id)
                 
            } catch (error) {
                console.error('Error:', error);
            setLoading(false);

            }
        }
    };
    

    useEffect(() => {
        const phoneOwnerFromLocalStorage = localStorage.getItem('id');
        if (phoneOwnerFromLocalStorage) {
            const phoneOwner = parseInt(phoneOwnerFromLocalStorage);
            setFormDataProduct(prevData => ({
                ...prevData,
                phoneOwner: phoneOwner
            }));
        }
    }, []);


    const fetchUpProduct = async () => {
        try {
            const response = await axiosInstance.post('/api/v1/products/seller/', formDataProduct);
            if(response.status === 201) {
                return response.data
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchUpProductUpdate = async () => {
        try {
            const response = await axiosInstance.put('/api/v1/products/seller/', {
                name: formDataProduct.name,
                id: formDataProduct_.id,
                shortDescription: formDataProduct.shortDescription,
                price: formDataProduct.price,
                stockQuantity: formDataProduct.stockQuantity,
                category: formDataProduct.category,
                colors: formDataProduct.colors,
                productSize: formDataProduct.productSize
            });
            if(response.status === 201) {
                alert("Thành Công")
                return response.data

            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchUpProductImgs = async (id: string) => {
        try {
            if (formDataProduct.imgs && formDataProduct.imgs.length > 0) { 
                const formData = new FormData();
                formData.append('id', id);
                formDataProduct.imgs.forEach((file, index) => {
                    formData.append('files', file);
                });
                
                const response = await axiosInstanceFile.post('api/v1/products/seller/files',  formData);
                if(response.status === 201) {
                    console.log('Ảnh đã được tải lên:', response.data);
                    alert("Thêm sản phẩm thành công")
                    setLoading(false);
                    return response.data;
                }
            } else {
                console.error('No image files selected');
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };
    
    
    
  return (
    <>
        <div className='bg-gray-100 rounded-lg shadow-md p-2'>
            <Col >
                <h1 className='text-4xl fw-bold'>Thông tin cơ bản</h1>
                <ThongtinCoBan formDataProduct={formDataProduct_} updateFormDataProduct={updateFormDataProduct} update_Category={updateCateGory}/>
            </Col>
        </div>
        <div className='bg-gray-100 rounded-lg shadow-md mt-4 p-2'>
            <Col>
            <h1 className='text-4xl fw-bold'>Thông tin Chi tiết</h1>
                <ThongtinChiTiet changeCategory= {changeCategory} formDataProduct={formDataProduct_} updateFormDataProduct={updateFormDataProduct}/>
            </Col>
        </div>
        <div className='bg-gray-100 rounded-lg shadow-md mt-4 p-2'>
            <Col>
            <h1 className='text-4xl fw-bold'>Bán Hàng</h1>
                <ThongtinBanHang changeCategory= {changeCategory} formDataProduct={formDataProduct_} updateFormDataProduct={updateFormDataProduct}/>
            </Col>
        </div>
        <div className='bg-gray-100 rounded-lg shadow-md mt-4 p-2'>
            <Col>
            <h1 className='text-4xl fw-bold'>Vận Chuyển</h1>
            <ThongtinVanChuyen formDataProduct={formDataProduct_} updateFormDataProduct={updateFormDataProduct}/>
            </Col>
        </div>
        <button className="bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Ẩn
        </button>
        <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
<button className="bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleSave}>
                Lưu
            </button>

    </>

  )
}
