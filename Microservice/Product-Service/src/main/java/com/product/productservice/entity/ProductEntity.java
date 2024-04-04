package com.product.productservice.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
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
    @Column(columnDefinition = "TEXT") // Sử dụng kiểu dữ liệu TEXT
    private String shortDescription;
    @Column(columnDefinition = "TEXT") // Sử dụng kiểu dữ liệu TEXT
    private String description;
    private Double price;
    private Long phoneOwner;
    @Column(columnDefinition = "boolean default true")
    @ColumnDefault("true")
    private boolean isPublished;
    private boolean isFeatured;
    private Long stockQuantity;
    private int sold;
    private int view;
    // Thay đổi kiểu dữ liệu của urlVideo thành TEXT hoặc VARCHAR(LONG)
    @Column(columnDefinition = "TEXT") // Sử dụng kiểu dữ liệu TEXT
    private String urlVideo;
    private String category;
    private Double cannangdonggoi;
    private Double thetich_dai;
    private Double thetich_rong;
    private Double thetich_cao;
    private String colors;
    private int rating;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;


    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Builder.Default
    private List<ProductImage> productImages = new ArrayList<>();

    @OneToMany(mappedBy = "product",  fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Builder.Default
    private List<ProductSize> productSize = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    @Builder.Default
    List<ProductRelated> relatedProducts = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

}
