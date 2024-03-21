package com.order.orderservice.controller;

import com.order.orderservice.entity.OrderEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {



    @PostMapping("api/v1/orders")
    public void save(@RequestBody OrderEntity orderEntity){


    }

}
