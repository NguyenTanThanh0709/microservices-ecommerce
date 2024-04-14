package com.product.productservice.event;

import com.example.commonservice.utils.Constant;
import com.google.gson.Gson;
import com.product.productservice.service.IProduct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    private IProduct iProduct;

    public EventConsumer(ReceiverOptions<String,String> receiverOptions){
        KafkaReceiver.create(receiverOptions.subscription(Collections.singleton(Constant.payment_topic)))
                .receive().subscribe(this::demoKafka);
    }

    public void demoKafka(ReceiverRecord<String,String> receiverRecord){
        log.info("Profile Onboarding event payment " + receiverRecord.value());
        iProduct.updateStockAndSoldQuantity(receiverRecord.value());
    }

}
