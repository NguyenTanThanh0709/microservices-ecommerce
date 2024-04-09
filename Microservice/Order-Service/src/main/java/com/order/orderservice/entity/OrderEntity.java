package com.order.orderservice.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String phoneNumber;
    private String address;
    private String statusDelivery; // Đóng hàng, Lấy hàng, giao hàng, đã giao
    private String statusOrder; // Chờ thanh toán, Vận chuyển, Chờ giao hàng, Hoàn thành, Đã hủy, Trả hàng/Hoàn tiền
    private Double totalMoney;

    @OneToMany(mappedBy = "orderId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<OrderItemsEntity> orderItems;
}
