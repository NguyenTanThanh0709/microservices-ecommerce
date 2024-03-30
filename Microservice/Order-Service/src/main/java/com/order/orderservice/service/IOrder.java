package com.order.orderservice.service;

import com.example.commonservice.DTO.OrderDTO;
import com.order.orderservice.entity.OrderEntity;

import java.util.List;

public interface IOrder {
    OrderEntity createOder(OrderDTO orderDTO);
    void updateStatusOrder(Long orderid, String statusOrder);
    void updateStatusDeliveryOrder(Long orderid, String statusOrderDelivery);
    List<OrderEntity> getOrderByUser(String  phoneNumber);
    OrderEntity getOneOder(Long idOrder);

}
