package com.product.productservice.DTO.Reponse;

import com.product.productservice.entity.ProductEntity;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductData {
    private List<ProductEntity> products;
    private Pagination pagination;
}
