package com.order.orderservice.event;

import com.example.commonservice.utils.Constant;
import com.google.gson.Gson;
import com.order.orderservice.service.impl.OrderImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Service;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.ReceiverRecord;

import java.util.Collections;

@Service
@Slf4j
public class EventConsumer {
    Gson gson = new Gson();
    @Autowired
    private OrderImpl order;

    public EventConsumer(ReceiverOptions<String,String> receiverOptions){
        KafkaReceiver.create(receiverOptions.subscription(Collections.singleton(Constant.orderCancel)))
                .receive().subscribe(this::demoKafka);
    }

    public void demoKafka(ReceiverRecord<String,String> receiverRecord){
        log.info("Profile Onboarding event payment " + receiverRecord.value());
        String split = receiverRecord.value();
        Long idOrder = Long.parseLong(split);
        order.updateStatusOrder(idOrder,"Đã hủy");
    }
}
