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


export default function Form_ADD_UPDATE_PRODCUT() {
    const [formDataProduct, setFormDataProduct] = useState<Product>(initialFormData);


    const updateFormDataProduct = (data: Partial<Product>) => {
        setFormDataProduct(prevData => ({
            ...prevData,
            ...data
        }));
    };


    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ff0000");

    const handleSave = async () => {
        console.log(formDataProduct);
        if(!isValidProduct(formDataProduct)) {
            alert('Điền đủ thông tin xong và vui lòng ấn save!');
            return;
        } else {
            try {
                setLoading(true);
                await fetchUpProductImgs();
                
            setLoading(false);
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
            // Example POST request
            console.log(formDataProduct);
            const response = await axiosInstance.post('/api/v1/products/seller/', formDataProduct);
            if(response.status === 201) {
                console.log(response.data);
                alert('Thêm sản phẩm thành công!');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchUpProductImgs = async () => {
        try {
            if (formDataProduct.imgs && formDataProduct.imgs.length > 0) { 
                const formData = new FormData();
                formDataProduct.imgs.forEach((file, index) => {
                    formData.append('files', file);
                });
                console.log(formData);
                
                const response = await axiosInstanceFile.post('api/v1/products/seller/files',  formData, {
                    timeout: 20000 // Tăng thời gian chờ lên 15 giây (15000ms)
                });
                // updateFormDataProduct({ imgsurl: response.data });
                formDataProduct.imgsurl = response.data; 
                console.log(formDataProduct)
                await fetchUpProduct();
                console.log(response)
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
                <ThongtinCoBan updateFormDataProduct={updateFormDataProduct}/>
            </Col>
        </div>
        <div className='bg-gray-100 rounded-lg shadow-md mt-4 p-2'>
            <Col>
            <h1 className='text-4xl fw-bold'>Thông tin Chi tiết</h1>
                <ThongtinChiTiet updateFormDataProduct={updateFormDataProduct}/>
            </Col>
        </div>
        <div className='bg-gray-100 rounded-lg shadow-md mt-4 p-2'>
            <Col>
            <h1 className='text-4xl fw-bold'>Bán Hàng</h1>
                <ThongtinBanHang updateFormDataProduct={updateFormDataProduct}/>
            </Col>
        </div>
        <div className='bg-gray-100 rounded-lg shadow-md mt-4 p-2'>
            <Col>
            <h1 className='text-4xl fw-bold'>Vận Chuyển</h1>
            <ThongtinVanChuyen updateFormDataProduct={updateFormDataProduct}/>
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
