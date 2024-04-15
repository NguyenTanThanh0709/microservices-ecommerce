package com.order.orderservice.reponse;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductOrderReponse {
    private String note;
    private Long productId;
    private String name;
    private String img;
    private int quantity;
    private Double price;
}
