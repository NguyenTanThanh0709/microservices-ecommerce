package com.cart.cartservice.reponse;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartUpdateQuantiry {
    private Long product_id;
    private int buy_count;
}
