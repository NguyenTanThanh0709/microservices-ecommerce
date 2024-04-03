package com.example.commonservice.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Configuration
public class MyService {
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                //.defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxQGdtYWlsLmNvbSIsImlhdCI6MTcxMjA0NDU5MSwiZXhwIjoxNzEyMTMwOTkxfQ.owLrfs1E-EtkNVpk9Y4xOuxs0g37ncw5nwXk3TVe-kY")
                .build();
    }
}
