package com.order.orderservice.service.impl;

import com.example.commonservice.DTO.OrderDTO;
import com.order.orderservice.entity.OrderEntity;
import com.order.orderservice.entity.OrderItemsEntity;
import com.order.orderservice.repository.OrderRepository;
import com.order.orderservice.service.IOrder;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.kafka.sender.KafkaSender;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class OrderImpl implements IOrder {

    @Autowired
    private KafkaSender<String,String> sender;

    @Autowired
    private OrderRepository orderRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public OrderEntity createOder(OrderDTO orderDTO) {
        OrderEntity orderEntity = new OrderEntity();

        orderEntity.setPhoneNumber(orderDTO.getPhoneNumber());
        orderEntity.setAddress(orderDTO.getAddress());
        orderEntity.setStatusDelivery(orderDTO.getStatusDelivery());
        orderEntity.setStatusOrder(orderDTO.getStatusOrder());

        // Tạo danh sách các mặt hàng của đơn hàng từ thông tin trong OrderDTO
        List<OrderItemsEntity> orderItemsEntityList = new ArrayList<>();

        for (Map.Entry<Long, Integer> entry : orderDTO.getProductIdsQuantitys().entrySet()) {
            Long productId = entry.getKey();
            Integer quantity = entry.getValue();

            OrderItemsEntity orderItemsEntity = new OrderItemsEntity();
            orderItemsEntity.setProductId(productId);
            orderItemsEntity.setQuantity(quantity);
            orderItemsEntity.setOrderId(orderEntity); // Gán orderEntity cho mỗi mặt hàng

            orderItemsEntityList.add(orderItemsEntity);
        }


        for (Map.Entry<Long, Double> entry : orderDTO.getProductIdsPrices().entrySet()) {
            Long productId = entry.getKey();
            Double prices = entry.getValue();
            for(OrderItemsEntity orderItems : orderItemsEntityList){
                if(productId.equals(orderItems.getProductId())){
                    orderItems.setPrice(prices);
                }
            }
        }

        for (Map.Entry<Long, String> entry : orderDTO.getProductIdsNotes().entrySet()) {
            Long productId = entry.getKey();
            String notes = entry.getValue();
            for(OrderItemsEntity orderItems : orderItemsEntityList){
                if(productId.equals(orderItems.getProductId())){
                    orderItems.setNote(notes);
                }
            }
        }

        orderEntity.setOrderItems(orderItemsEntityList);

        // Lưu OrderEntity và các OrderItemsEntity vào cơ sở dữ liệu
        entityManager.persist(orderEntity);

        // Trả về OrderEntity đã được lưu
        return orderEntity;
    }

    @Override
    public void updateStatusOrder(Long orderid, String statusOrder) {
        orderRepository.updateStatusOrder(orderid, statusOrder);
    }

    @Override
    public void updateStatusDeliveryOrder(Long orderid, String statusOrderDelivery) {
        orderRepository.updateStatusDelivery(orderid, statusOrderDelivery);
    }


    @Override
    public List<OrderEntity> getOrderByUser(String phoneNumber) {
        return orderRepository.findByPhoneNumber(phoneNumber);
    }

    @Override
    public OrderEntity getOneOder(Long idOrder) {
        return orderRepository.findById(idOrder).orElse(null);
    }
}
