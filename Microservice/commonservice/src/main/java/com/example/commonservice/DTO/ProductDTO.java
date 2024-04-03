package com.example.commonservice.DTO;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private int sold;
    private int view;
    private String category;
    private Double cannangdonggoi;
    private Double thetich_dai;
    private Double thetich_rong;
    private Double thetich_cao;
    private List<ProductSize> productSize;
    private Long idBrand;
    private String urlVideo;
    private List<String> imgsurl;
    private String colors;


    public boolean isValid() {
        return name != null && shortDescription != null && description != null
                && price != null && phoneOwner != null && stockQuantity != null
                && cannangdonggoi != null && thetich_dai != null
                && thetich_rong != null && thetich_cao != null
                && urlVideo != null
                && imgsurl != null
                && category != null && idBrand != null;
    }
}
