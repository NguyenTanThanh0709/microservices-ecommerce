package com.cart.cartservice.reponse;

import com.example.commonservice.DTO.ProductReponse;
import lombok.*;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartReponse {
    private String _id;
    private int buy_count;
    private double price;
    private double price_before_discount;
    private ProductReponse product;
    private int status;
    private String user;
    private String color;
    private String size;
}
