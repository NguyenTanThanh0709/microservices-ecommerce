package com.order.orderservice.repository;


import com.order.orderservice.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    // Lấy đơn hàng bằng số điện thoại
    List<OrderEntity> findByPhoneNumberAndStatusOrder(String phoneNumber, String statusOrder);
    @Modifying
    @Query("UPDATE OrderEntity o SET o.statusDelivery = :statusDelivery WHERE o.id = :orderId")
    int updateStatusDelivery(@Param("orderId") Long orderId, @Param("statusDelivery") String statusDelivery);

    // Cập nhật trạng thái đơn hàng dựa trên ID đơn hàng
    @Modifying
    @Query("UPDATE OrderEntity o SET o.statusOrder = :statusOrder WHERE o.id = :orderId")
    int updateStatusOrder(@Param("orderId") Long orderId, @Param("statusOrder") String statusOrder);
}
