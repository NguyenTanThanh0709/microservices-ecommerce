package com.product.productservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "product_related")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRelated {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @ManyToOne
    @JoinColumn(name = "related_product_id")
    private ProductEntity relatedProduct;
}
