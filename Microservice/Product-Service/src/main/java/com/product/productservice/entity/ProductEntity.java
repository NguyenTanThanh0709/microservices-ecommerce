package com.product.productservice.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String shortDescription;
    private String description;
    private Double price;
    private Long phoneOwner;
    @Column(columnDefinition = "boolean default true")
    @ColumnDefault("true")
    private boolean isPublished;
    private boolean isFeatured;
    private Long stockQuantity;
    private String metaTitle;
    private String metaKeyword;
    private String metaDescription;
    private String category;
    private int countSell;

    @OneToMany(mappedBy = "product", cascade = {CascadeType.REMOVE})
    @Builder.Default
    private List<ProductImage> productImages = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    @Builder.Default
    List<ProductRelated> relatedProducts = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

}
