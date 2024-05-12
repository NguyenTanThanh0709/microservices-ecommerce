package com.product.productservice.event;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.kafka.sender.KafkaSender;
import reactor.kafka.sender.SenderRecord;

@Service
@Slf4j
public class EventProducer {
    @Autowired
    private KafkaSender<String,String> sender;

    @Autowired
    private ObjectMapper objectMapper; // ObjectMapper for JSON serialization

    public Mono<String> send(String topic, Object data){
        String jsonData;
        try {
            jsonData = objectMapper.writeValueAsString(data); // Convert object to JSON
        } catch (JsonProcessingException e) {
            return Mono.error(e);
        }

        ProducerRecord<String, String> record = new ProducerRecord<>(topic, jsonData);

        return sender.send(Mono.just(SenderRecord.create(record, jsonData)))
                .then()
                .thenReturn("OK");
    }
    public Mono<String> send(String topic, String message){
        return sender.send(Mono.just(SenderRecord.create(new ProducerRecord<>(topic,message),message)))
                .then()
                .thenReturn("OK");
    }
}
