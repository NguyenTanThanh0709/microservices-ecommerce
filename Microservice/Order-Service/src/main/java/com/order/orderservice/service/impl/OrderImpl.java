package com.order.orderservice.service.impl;

import com.example.commonservice.configuration.test;
import com.order.orderservice.service.IOrder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.kafka.sender.KafkaSender;

@Service
@Slf4j
public class OrderImpl implements IOrder {

    @Autowired
    private KafkaSender<String,String> sender;


}
