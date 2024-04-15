package com.order.orderservice.service;

import com.example.commonservice.DTO.OrderDTO;
import com.order.orderservice.entity.OrderEntity;
import com.order.orderservice.reponse.OrderReponse;

import java.util.List;

public interface IOrder {
    OrderEntity createOder(OrderDTO orderDTO);
    void updateStatusOrder(Long orderid, String statusOrder);
    void updateStatusDeliveryOrder(Long orderid, String statusOrderDelivery);
    List<OrderReponse> getOrderByUser(String  phoneNumber, String  status, String token);
    OrderEntity getOneOder(Long idOrder);

}
