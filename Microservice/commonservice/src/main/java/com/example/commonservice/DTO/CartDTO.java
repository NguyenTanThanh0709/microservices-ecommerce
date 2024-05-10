package com.example.commonservice.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartDTO {
    private Long customerId;
    private Long productId;
    private int quantity;
    private String color;
    private String size;
}
