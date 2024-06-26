package com.example.commonservice.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductReponse {
    private int id;
    private String name;
    private String shortDescription;
    private String description;
    private double price;
    private int phoneOwner;
    private int stockQuantity;
    private int sold;
    private int view;
    private String urlVideo;
    private String category;
    private double cannangdonggoi;
    private double thetich_dai;
    private double thetich_rong;
    private double thetich_cao;
    private String colors;
    private String createdAt;
    private List<ProductImage> productImages;
    private List<ProductSize> productSize;
    private List<Object> relatedProducts; // Assuming relatedProducts can be of any type
    private BrandDTO brand;
    private boolean published;
    private boolean featured;

}





