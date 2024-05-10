import React, { useState, useEffect } from 'react';
import {  thongtinbanhang, ProductSize, Product } from 'src/constants/contant';

interface ThongtinBanHangProps {
  formDataProduct: any;
  changeCategory: number;
  updateFormDataProduct: (data: Partial<thongtinbanhang>) => void;
}


const ThongtinBanHang: React.FC<ThongtinBanHangProps> = ({ formDataProduct,changeCategory, updateFormDataProduct }) => {
  const [formDatathongtinbanhang, setFormDatathongtinbanhang] = useState<thongtinbanhang>({
    price: 0,
    stockQuantity: 0,
    productSize: [],
    colors: ''
  });

  const updatePrice = (price: number) => {
    setFormDatathongtinbanhang(prevState => ({
      ...prevState,
      price: price
    }));
  };

  const updateStockQuantity = (stockQuantity: number) => {
    setFormDatathongtinbanhang(prevState => ({
      ...prevState,
      stockQuantity: stockQuantity
    }));
  };



  // console.log(formDataProduct)
  useEffect(() => {
    if (formDataProduct) {
      updatePrice(formDataProduct.price);
      updateStockQuantity(formDataProduct.stockQuantity);
      if(formDataProduct.productSize){
        setProductSizes(formDataProduct.productSize);
      }
      if(formDataProduct.colors){
        setProductColor(formDataProduct.colors.split('-'));
      }
    }

  }, [formDataProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDatathongtinbanhang(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [size, setSize] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [productColor, setProductColor] = useState<String[]>([]);

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
};

const handleSubmit1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (color.trim() !== '') {
        setProductColor([...productColor, color]); // Thêm màu mới vào danh sách
        setColor(''); // Xóa giá trị trong input sau khi thêm
    }
};



  const [quantity, setQuantity] = useState<number>(0);
  const [productSizes, setProductSizes] = useState<ProductSize[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (size.trim() !== '' && quantity > 0) {
      const newProductSize: ProductSize = {
        size: size,
        quantity: quantity
      };
      setProductSizes([...productSizes, newProductSize]);
      setSize('');
      setQuantity(0);
      setFormDatathongtinbanhang(prevState => ({
        ...prevState,
        productSize: [...prevState.productSize, newProductSize]
    }));
    }
  };

  const handleClick = () => {
    const formattedProductColor = productColor.join('-'); 
    updateFormDataProduct({
        price: formDatathongtinbanhang.price,
        stockQuantity: formDatathongtinbanhang.stockQuantity,
        productSize: formDatathongtinbanhang.productSize,
        colors: formattedProductColor,
    });
    alert("Lưu Thành Công")
  }

  return (
    <div className='m-4 p-4'>
      <div className="mb-4">
        <label htmlFor="gia" className="block font-medium mb-2 text-red-500">Giá (VNĐ)</label>
        <input
          type="number"
          id="gia"
          name="price" // Thay đổi tên thành price
          value={formDatathongtinbanhang.price}
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
          name="stockQuantity" // Thay đổi tên thành stockQuantity
          value={formDatathongtinbanhang.stockQuantity}
          onChange={handleChange}
          className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:bg-white"
          placeholder="Nhập Tồn kho tổng"
        />
      </div>

      {changeCategory != 5 && 

      <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Thêm Size Sản Phẩm</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="size" className="text-sm text-gray-600">Size</label>
            <input type="text" id="size" value={size} onChange={e => setSize(e.target.value)} placeholder="Enter size (e.g., S, M, L)" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="quantity" className="text-sm text-gray-600">Số lượng</label>
            <input type="number" id="quantity" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} placeholder="Enter quantity" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Add</button>
        </form>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Product Sizes:</h3>
          <ul>
            {productSizes.map((productSize, index) => (
              <li key={index}>{productSize.size}: {productSize.quantity}</li>
            ))}
          </ul>
        </div>
      </div>
}
{changeCategory != 5 && 
      <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-4 mt-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Thêm Màu sản phẩm</h2>
            <form onSubmit={handleSubmit1} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="color" className="text-sm text-gray-600">Màu</label>
                    <input
                        type="text"
                        id="color"
                        value={color}
                        onChange={handleChange1}
                        placeholder="Enter color (e.g., S, M, L)"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Add</button>
            </form>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Product color:</h3>
                <ul>
                    {productColor.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
      </div>
    }

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

export default ThongtinBanHang;
