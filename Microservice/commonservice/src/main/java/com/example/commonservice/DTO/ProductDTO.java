package com.example.commonservice.DTO;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private String shortDescription;
    private String description;
    private Double price;
    private Long phoneOwner;
    private boolean isPublished;
    private boolean isFeatured;
    private Long stockQuantity;
    private String metaTitle;
    private String metaKeyword;
    private String metaDescription;
    private String category;
    private int countSell;
    private List<String> productImages = new ArrayList<>();
    private Long idBrand;

    public boolean isValid() {
        return name != null && shortDescription != null && description != null
                && price != null && phoneOwner != null && stockQuantity != null
                && metaTitle != null && metaKeyword != null && metaDescription != null
                && category != null && idBrand != null;
    }
}
