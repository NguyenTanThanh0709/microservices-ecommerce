package com.cart.cartservice.reponse;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartReponseWithMessage {
    private String message;
    private List<CartReponse> data;
}
