package com.product.productservice.DTO.UPDATE;



import com.example.commonservice.DTO.ProductSize;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTOu {

    private Long id;
    private String name; // ""
    private String shortDescription; //""
    private Double price; // 0
    private Long stockQuantity; // 0
    private String category; // ""
    private List<ProductSize> productSize; // size = 0
    private String colors; // ""

}
