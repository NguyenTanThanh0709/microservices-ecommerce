package com.order.orderservice.repository;

import com.order.orderservice.entity.OrderEntity;
import com.order.orderservice.entity.OrderItemsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemsRepository extends JpaRepository<OrderItemsEntity, Long> {
}
