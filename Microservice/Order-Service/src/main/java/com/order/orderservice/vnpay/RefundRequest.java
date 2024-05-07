package com.order.orderservice.vnpay;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefundRequest {
    private String orderId;
    private String transDate;
    private int amount;
    private String user;
}
