package com.product.productservice.DTO.ReponsCate;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CategoryResponse {
    private String message;
    private List<Category> data;
}
