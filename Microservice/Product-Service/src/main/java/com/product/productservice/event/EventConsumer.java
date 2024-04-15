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

        KafkaReceiver.create(receiverOptions.subscription(Collections.singleton(Constant.rating_add_topic)))
                .receive().subscribe(this::handleRatingAddEvent);

        KafkaReceiver.create(receiverOptions.subscription(Collections.singleton(Constant.rating_sub_topic)))
                .receive().subscribe(this::handleRatingAddEvent1);
    }

    public void handleRatingAddEvent(ReceiverRecord<String,String> receiverRecord){
        log.info("Rating add event received: " + receiverRecord.value());
        String[] split = receiverRecord.value().split("-");
        Long idp = Long.parseLong(split[0]);
        int rating = Integer.parseInt(split[1]);
        iProduct.recalculateAndSetAverageRating(idp,rating);
    }

    public void handleRatingAddEvent1(ReceiverRecord<String,String> receiverRecord){
        log.info("Rating add event received: " + receiverRecord.value());
        String[] split = receiverRecord.value().split("-");
        Long idp = Long.parseLong(split[0]);
        int rating = Integer.parseInt(split[1]);
        iProduct.subtractAndSetAverageRating(idp,rating);
    }

    public void demoKafka(ReceiverRecord<String,String> receiverRecord){
        log.info("Profile Onboarding event payment " + receiverRecord.value());
        iProduct.updateStockAndSoldQuantity(receiverRecord.value());
    }

}
