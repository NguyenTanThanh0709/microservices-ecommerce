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
    private Integer id;
    private String phoneNumber;
    private String address;
    private String statusDelivery;
    private String statusOrder;
    private Double priceTotal;
    private String note;

    @OneToMany(mappedBy = "orderId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    Set<OrderItemsEntity> orderItems;
}
