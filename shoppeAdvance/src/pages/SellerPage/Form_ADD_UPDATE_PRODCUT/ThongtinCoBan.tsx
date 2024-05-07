import React, { useState, useEffect } from "react";
import { categories, ThongtinCoBan_ , Product} from 'src/constants/contant';

interface ThongtinCoBanProps {
  formDataProduct: any;
  updateFormDataProduct: (data: Partial<Product>) => void;
  update_Category: (data: Partial<number>) => void;
}

const ThongtinCoBan: React.FC<ThongtinCoBanProps> = ({ formDataProduct, updateFormDataProduct, update_Category }) => {
  // console.log(formDataProduct)
  useEffect(() => {

    if (Object.keys(formDataProduct).length !== 0 ) {
      // Tiến hành xử lý

      if (formDataProduct.productImages && formDataProduct.productImages.length > 0) {
        // Tạo một mảng hình ảnh mới từ formDataProduct.images
        const newImages: string[] = formDataProduct.productImages.map((image: any) => {
            return image.urlimg
        });
        setImagePreviews(newImages);
    }

    setProductName(formDataProduct.name);
    setProductDescription(formDataProduct.shortDescription);
    let category = formDataProduct.category.split("-");
    setSelectedCategory(category[0]);
    setSelectedSubcategory(category[1]);
    setSelectedItem(category[2]);
  }

}, [formDataProduct]);




  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imgs, setImgs] = useState<File[] | null>(null);
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedSubcategorys, setSelectedSubcategorys] = useState<any>({});
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [formData, setFormData] = useState<ThongtinCoBan_>({
    name: '',
    shortDescription: '',
    category: '',
    images: [],
    videourl: null
  });

  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles: File[] = Array.from(event.target.files); // Chuyển HTMLCollection thành mảng File
      setImgs(selectedFiles); // Cập nhật state imgs với danh sách các file đã chọn
  
      const images: string[] = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        images.push(URL.createObjectURL(selectedFiles[i]));
      }
      setImagePreviews(images);
    }
  };
  




  const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  const handleProductDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProductDescription(event.target.value);
  };

  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategorys(categories[category]);
    setSelectedItem('');
  };
  
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setSelectedItems(categories[selectedCategory][subcategory]);
    setSelectedItem('');

  };
  

  const handleItemChange = (item: string) => {
    setSelectedItem(item);
  };

  const handlesavecategory = () => {
    console.log(selectedCategory, selectedSubcategory, selectedItem)
    setShowModal(false)
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: productName,
    }));
  }, [productName]);
  
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      shortDescription: productDescription,
    }));
  }, [productDescription]);
  
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: `${selectedCategory} - ${selectedSubcategory} - ${selectedItem}`,
    }));
  }, [selectedCategory, selectedSubcategory, selectedItem]);
  
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: imgs || [],
    }));
  }, [imgs]);
  


  const handleClick = () => {

    if (
      !productName.trim() ||
      !productDescription.trim() ||
      !selectedCategory.trim() ||
      !selectedSubcategory.trim() ||
      !selectedItem.trim() ||
      !imgs
    ) {
      // Hiển thị cảnh báo nếu có trường nào đó rỗng, null hoặc trống
      alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
      return;
    }


    setFormData({
      name: productName,
      shortDescription: productDescription,
      category: `${selectedCategory} - ${selectedSubcategory} - ${selectedItem}`,
      images: imgs || [], // Sử dụng imgs nếu có, nếu không sử dụng mảng rỗng
      videourl: null,
    });

    updateFormDataProduct({
      name: productName,
      shortDescription: productDescription,
      category: `${selectedCategory} - ${selectedSubcategory} - ${selectedItem}`,
      imgs: imgs || [], // Sử dụng imgs nếu có, nếu không sử dụng mảng rỗng
      video: null,
  });


    console.log(formData);

    if(selectedCategory.includes('Thời Trang') && (selectedSubcategory.includes('Quần') || selectedSubcategory.includes('Váy'))){
      update_Category(1)
    }else{
      update_Category(2)
    }

    if( selectedCategory.includes('Giày')){
      update_Category(3)
    }
    if( selectedCategory.includes('Đồng Hồ')){
      update_Category(4)
    }
    if( selectedCategory.includes('Thực Phẩm')){
      update_Category(5)
    }
  };

  // console.log(categories  )
  return (
    <>
      <div className="m-4 p-4">
        <h1 className="text-red-500 text-xl font-semibold mb-4">Chọn ảnh sản phẩm</h1>
        <div className="row m-4 p-4">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={selectFiles}
              />
            </label>
          </div>
          <ul className="divide-y divide-gray-200">
            <li className="py-4 flex items-center">
              <span className="h-2 w-2 bg-gray-500 rounded-full mr-3"></span>
              <p className="text-gray-700">Tải lên hình ảnh 1:1</p>
            </li>
            <li className="py-4 flex items-center">
              <span className="h-2 w-2 bg-gray-500 rounded-full mr-3"></span>
              <p className="text-gray-700">Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm, Gợi ý hôm nay,... Việc sử dụng ảnh bìa đẹp sẽ thu hút thêm lượt truy cập vào sản phẩm của bạn</p>
            </li>
          </ul>
        </div>
        {imagePreviews && (
          <div className="grid grid-cols-4 gap-4">
            {imagePreviews.map((img, i) => {
              return (
                <img className="w-64 h-32" src={img} alt={"image-" + i} key={i} />
              );
            })}
          </div>
        )}
      </div>



      <div className="m-4 p-4">
        <h1 className="text-red-500 text-xl font-semibold mb-4">Chọn tên sản phẩm</h1>
        <div className="row m-4 p-4">
          <input
            type="text"
            placeholder="Nhập tên sản phẩm"
            value={productName}
            onChange={handleProductNameChange}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>

      <div className="m-4 p-4">
        <h1 className="text-red-500 text-xl font-semibold mb-4">Mô tả sản phẩm</h1>
        <div className="row m-4 p-4">
          <textarea
            placeholder="Nhập mô tả sản phẩm"
            value={productDescription}
            onChange={handleProductDescriptionChange}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>

      <div className="m-4 p-4">
        <h1 className="text-red-500 text-xl font-semibold mb-4">Ngành hàng sản phẩm</h1>
        <div className="row m-4 p-4">
          <div className="cursor-pointer text-xl" onClick={() => setShowModal(true)}>Click Chọn nhành hàng</div>
          <div>{selectedCategory} - {selectedSubcategory} - {selectedItem}</div>
        </div>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6" style={{ width: '900px !important' }}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Danh sách các ngành hàng</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                <div className="flex">
                  <div className="w-1/3 p-4 bg-gray-200 mr-4">
                    <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                      <option value="">Chọn category</option>
                      {Object.keys(categories).map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/3 p-4 bg-gray-200 mr-4">
                    <select value={selectedSubcategory} onChange={(e) => handleSubcategoryChange(e.target.value)}>
                      <option value="">Chọn subcategory</option>
                      {Object.keys(selectedSubcategorys).map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/3 p-4 bg-gray-200">
                    <select value={selectedItem} onChange={(e) => handleItemChange(e.target.value)}>
                      <option value="">Chọn mục</option>
                      {selectedItems.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handlesavecategory}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClick}
                  >
                    Save
                  </button>
    </>
  );
};

export default ThongtinCoBan;
