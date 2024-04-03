package com.product.productservice.DTO.Reponse;

import com.product.productservice.entity.ProductEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductReponSingle {
    private String message;
    private ProductEntity data;
}
