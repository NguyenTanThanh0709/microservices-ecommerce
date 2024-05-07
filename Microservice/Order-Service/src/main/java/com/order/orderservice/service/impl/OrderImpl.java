package com.order.orderservice.service.impl;

import com.example.commonservice.DTO.OrderDTO;
import com.example.commonservice.DTO.ProductReponse;
import com.order.orderservice.entity.OrderEntity;
import com.order.orderservice.entity.OrderItemsEntity;
import com.order.orderservice.reponse.OrderReponse;
import com.order.orderservice.reponse.ProductOrderReponse;
import com.order.orderservice.repository.OrderRepository;
import com.order.orderservice.service.IOrder;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.kafka.sender.KafkaSender;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderImpl implements IOrder {

    @Autowired
    private KafkaSender<String,String> sender;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ModelMapper mapper;
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private WebClient webClient;

    @Override
    @Transactional
    public OrderEntity createOder(OrderDTO orderDTO) {
        OrderEntity orderEntity = new OrderEntity();

        orderEntity.setPhoneNumber(orderDTO.getPhoneNumber());
        orderEntity.setAddress(orderDTO.getAddress());
        orderEntity.setStatusDelivery(orderDTO.getStatusDelivery());
        orderEntity.setStatusOrder(orderDTO.getStatusOrder());
        orderEntity.setTotalMoney(orderDTO.getTotalMoney());
        orderEntity.setIdSeller(orderDTO.getIdSeller());

        // Tạo danh sách các mặt hàng của đơn hàng từ thông tin trong OrderDTO
        List<OrderItemsEntity> orderItemsEntityList = new ArrayList<>();

        for (Map.Entry<Long, Integer> entry : orderDTO.getProductIdsQuantitys().entrySet()) {
            Long productId = entry.getKey();
            Integer quantity = entry.getValue();

            OrderItemsEntity orderItemsEntity = new OrderItemsEntity();
            orderItemsEntity.setProductId(productId);
            orderItemsEntity.setQuantity(quantity);
            orderItemsEntity.setOrderId(orderEntity); // Gán orderEntity cho mỗi mặt hàng

            orderItemsEntityList.add(orderItemsEntity);
        }


        for (Map.Entry<Long, Double> entry : orderDTO.getProductIdsPrices().entrySet()) {
            Long productId = entry.getKey();
            Double prices = entry.getValue();
            for(OrderItemsEntity orderItems : orderItemsEntityList){
                if(productId.equals(orderItems.getProductId())){
                    orderItems.setPrice(prices);
                }
            }
        }

        for (Map.Entry<Long, String> entry : orderDTO.getProductIdsNotes().entrySet()) {
            Long productId = entry.getKey();
            String notes = entry.getValue();
            for(OrderItemsEntity orderItems : orderItemsEntityList){
                if(productId.equals(orderItems.getProductId())){
                    orderItems.setNote(notes);
                }
            }
        }

        orderEntity.setOrderItems(orderItemsEntityList);

        // Lưu OrderEntity và các OrderItemsEntity vào cơ sở dữ liệu
        entityManager.persist(orderEntity);

        // Trả về OrderEntity đã được lưu
        return orderEntity;
    }

    @Override
    public void updateStatusOrder(Long orderid, String statusOrder) {
        orderRepository.updateStatusOrder(orderid, statusOrder);
    }

    @Override
    public void updateStatusDeliveryOrder(Long orderid, String statusOrderDelivery) {
        orderRepository.updateStatusDelivery(orderid, statusOrderDelivery);
    }


    @Override
    public List<OrderReponse> getOrderByUser(String phoneNumber, String status, String token) {
        String query = getStatusQuery(status);
        List<OrderEntity> orderEntities = orderRepository.findByPhoneNumberAndStatusOrder(phoneNumber, query);
        List<OrderReponse> orderReponses = mapper.map(orderEntities, new TypeToken<List<OrderReponse>>() {}.getType());
        // Map each product asynchronously
        List<Mono<Void>> productMonos = orderReponses.stream()
                .flatMap(orderResponse -> orderResponse.getOrderItems().stream())
                .map(productOrderResponse -> getProductResponse(productOrderResponse.getProductId().toString(), token)
                        .doOnNext(productResponse -> {
                            productOrderResponse.setName(productResponse.getName());
                            productOrderResponse.setImg(productResponse.getProductImages().get(0).getUrlimg());
                        })
                        .then())
                .collect(Collectors.toList());

        // Wait for all async calls to complete
        Mono.when(productMonos).block();

        return orderReponses;
    }

    @Override
    public List<OrderReponse> getOrderBySeller(Long id, String status, String token) {
        String query = getStatusQuery(status);
        List<OrderEntity> orderEntities = orderRepository.findByIdSellerAndStatusOrder(id, query);
        List<OrderReponse> orderReponses = mapper.map(orderEntities, new TypeToken<List<OrderReponse>>() {}.getType());
        // Map each product asynchronously
        List<Mono<Void>> productMonos = orderReponses.stream()
                .flatMap(orderResponse -> orderResponse.getOrderItems().stream())
                .map(productOrderResponse -> getProductResponse(productOrderResponse.getProductId().toString(), token)
                        .doOnNext(productResponse -> {
                            productOrderResponse.setName(productResponse.getName());
                            productOrderResponse.setImg(productResponse.getProductImages().get(0).getUrlimg());
                        })
                        .then())
                .collect(Collectors.toList());

        // Wait for all async calls to complete
        Mono.when(productMonos).block();

        return orderReponses;
    }
// Chờ xác nhận, Chờ lấy hàng, Chờ giao hàng, Hoàn thành, Đã hủy, Trả hàng/Hoàn tiền
    private String getStatusQuery(String status) {
        switch (status) {
            case "1":
                return "Chờ xác nhận";
            case "2":
                return "Chờ lấy hàng";
            case "3":
                return "Chờ giao hàng";
            case "4":
                return "Hoàn thành";
            case "5":
                return "Đã hủy";
            case "6":
                return "Trả hàng/Hoàn tiền";
            default:
                return "";
        }
    }

    private Mono<ProductReponse> getProductResponse(String productId, String token) {
        return webClient.get()
                .uri("http://localhost:8222/api/v1/products/one/" + productId)
                .headers(headers -> headers.setBearerAuth(token.substring(7)))
                .retrieve()
                .bodyToMono(ProductReponse.class);
    }


    @Override
    public OrderEntity getOneOder(Long idOrder) {
        return orderRepository.findById(idOrder).orElse(null);
    }
}
