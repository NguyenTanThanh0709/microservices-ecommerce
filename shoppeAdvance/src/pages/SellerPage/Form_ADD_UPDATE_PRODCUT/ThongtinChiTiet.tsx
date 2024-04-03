import React from 'react';
import FormQuanAo from './form/FormQuanAo';
import FormAoQuan from './form/FormAoQuan';
import FormGiay from './form/FormGiay';
import FoodForm from './form/FoodForm';
import WatchForm from './form/WatchForm';
import {  Product} from 'src/constants/contant';



const ThongtinChiTiet: React.FC<{ updateFormDataProduct: (data: Partial<Product>) => void }> = ({ updateFormDataProduct }) => {
  return (
    <>
      <FormQuanAo updateFormDataProduct={updateFormDataProduct}/>
      {/* <FormAoQuan/> */}
      {/* <FormGiay/> */}
      {/* <FoodForm/> */}
      {/* <WatchForm/> */}
    </>
  );
};

export default ThongtinChiTiet;
