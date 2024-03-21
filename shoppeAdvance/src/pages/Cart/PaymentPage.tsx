import { Form, Radio } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import { Label, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight } from './style';

const PaymentPage = () => {
  const [delivery, setDelivery] = useState('fast');
  const [payment, setPayment] = useState('later_money');
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  });
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    city: '',
    name: '',
    address: '',
    phone: ''
  });
  const [order, setOrder] = useState({
    orderItemsSlected: [
      { id: 1, price: 100, amount: 2, discount: 10 },
      { id: 2, price: 50, amount: 3, discount: 0 }
    ]
  });

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      });
    }
  }, [isOpenModalUpdateInfo]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0;
      return total + (priceMemo * (totalDiscount * cur.amount) / 100);
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order, priceMemo]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 200000) {
      return 10000;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo);
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleAddOrder = () => {
    if (
      // user?.access_token &&
      order?.orderItemsSlected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      user?.city &&
      priceMemo
      // user?.id
    ) {
      // eslint-disable-next-line no-unused-expressions
    }
  };





  return (
    <div>
      <WrapperLeft>
        <WrapperInfo>
          <div>
            <Label>Chọn phương thức giao hàng</Label>
            <WrapperRadio  value={delivery}>
              <Radio value="fast">
                <span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng tiết kiệm
              </Radio>
              <Radio value="gojek">
                <span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span> Giao hàng tiết kiệm
              </Radio>
            </WrapperRadio>
          </div>
        </WrapperInfo>
        <WrapperInfo>
          <div>
            <Label>Chọn phương thức thanh toán</Label>
            <WrapperRadio  value={payment}>
              <Radio value="later_money"> Thanh toán tiền mặt khi nhận hàng</Radio>
              <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
            </WrapperRadio>
          </div>
        </WrapperInfo>
      </WrapperLeft>
      <WrapperRight></WrapperRight>
    </div>
  );
};

export default PaymentPage;
