package com.order.orderservice.reponse;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Payment {
    private Double amount;
    private Long orderid;
    private String paymentMethod;
    private String paymentStatus;
    private String vnpPayDate;
    private String vnpTxnRef;
}
