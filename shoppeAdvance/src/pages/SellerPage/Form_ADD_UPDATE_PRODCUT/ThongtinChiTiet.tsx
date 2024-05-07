import React from 'react';
import FormQuanAo from './form/FormQuanAo';
import FormAoQuan from './form/FormAoQuan';
import FormGiay from './form/FormGiay';
import FoodForm from './form/FoodForm';
import WatchForm from './form/WatchForm';
import {  Product} from 'src/constants/contant';



interface ThongtinChiTietProps {
  formDataProduct: any;
  changeCategory: number;
  updateFormDataProduct: (data: Partial<Product>) => void;
}

const ThongtinChiTiet: React.FC<ThongtinChiTietProps> = ({ formDataProduct,changeCategory, updateFormDataProduct }) => {
  const test = () => {
    console.log(changeCategory)
  }
  return (
    <>
      {changeCategory == 1 && <FormQuanAo updateFormDataProduct={updateFormDataProduct}/>}
      {changeCategory == 2 && <FormAoQuan updateFormDataProduct={updateFormDataProduct}/>}
      {changeCategory == 3 && <FormGiay updateFormDataProduct={updateFormDataProduct}/>}
      {changeCategory == 5 && <FoodForm updateFormDataProduct={updateFormDataProduct}/>}
      {changeCategory == 4 && <WatchForm updateFormDataProduct={updateFormDataProduct}/>}
      <div>Thông tin được lưu: {formDataProduct.description}</div>
    </>
  );
};

export default ThongtinChiTiet;
