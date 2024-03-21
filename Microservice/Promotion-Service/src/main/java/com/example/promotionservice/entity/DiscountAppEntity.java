package com.example.promotionservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiscountAppEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "discount_code_id", referencedColumnName = "id")
    private DiscountCodeEntity discountCode; // Tham chiếu đến mã giảm giá
    private String IdProduct;
}
