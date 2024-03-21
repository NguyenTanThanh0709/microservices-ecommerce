import React, { useState, useEffect } from "react";
import { categories } from 'src/constants/contant';

const ThongtinCoBan: React.FC = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedSubcategorys, setSelectedSubcategorys] = useState<any>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const images: string[] = [];
      for (let i = 0; i < event.target.files.length; i++) {
        images.push(URL.createObjectURL(event.target.files[i]));
      }
      setImagePreviews(images);
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setVideo(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Uploaded video:', video);
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
  };
  

  const handleItemChange = (item: string) => {
    setSelectedItem(item);
  };

  const handlesavecategory = () => {
    console.log(selectedCategory, selectedSubcategory, selectedItem)
    setShowModal(false)
  };

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
        <h2 className="text-red-500 text-xl font-semibold">Upload Video</h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-2 flex items-start">
            <span className="h-2 w-2 bg-gray-500 rounded-full mt-1 mr-3"></span>
            <p className="text-gray-700">Kích thước: Tối đa 30Mb, độ phân giải không vượt quá 1280x1280px</p>
          </li>
          <li className="py-2 flex items-start">
            <span className="h-2 w-2 bg-gray-500 rounded-full mt-1 mr-3"></span>
            <p className="text-gray-700">Độ dài: 10s-60s</p>
          </li>
          <li className="py-2 flex items-start">
            <span className="h-2 w-2 bg-gray-500 rounded-full mt-1 mr-3"></span>
            <p className="text-gray-700">Định dạng: MP4 (không hỗ trợ vp9)</p>
          </li>
          <li className="py-2 flex items-start">
            <span className="h-2 w-2 bg-gray-500 rounded-full mt-1 mr-3"></span>
            <p className="text-gray-700">Lưu ý: sản phẩm có thể hiển thị trong khi video đang được xử lý. Video sẽ tự động hiển thị sau khi đã xử lý thành công.</p>
          </li>
        </ul>
        <form onSubmit={handleSubmit} className='m-4 p-4'>
          <div className="mb-4">
            <label htmlFor="video" className="block text-gray-700 font-medium mb-2">Select Video:</label>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoChange}
              className="border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-400"
            />
          </div>
        </form>
        {video && (
          <div className="mt-4">
            <video controls className="w-64 h-64">
              <source src={URL.createObjectURL(video)} type={video.type} />
              Your browser does not support the video tag.
            </video>
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
          <div>{selectedSubcategory} - {selectedSubcategory} - {selectedItem}</div>
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
    </>
  );
};

export default ThongtinCoBan;
