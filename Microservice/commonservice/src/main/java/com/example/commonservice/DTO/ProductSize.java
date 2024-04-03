package com.example.commonservice.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductSize {
    private Long id;
    private String size;
    private Integer quantity;
}