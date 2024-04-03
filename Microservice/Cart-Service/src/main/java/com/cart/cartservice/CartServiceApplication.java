package com.cart.cartservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
@ComponentScan({"com.cart.cartservice", "com.example.commonservice"})

public class CartServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CartServiceApplication.class, args);
	}

}
