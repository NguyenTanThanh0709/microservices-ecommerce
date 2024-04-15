package com.order.orderservice.controller;

import com.example.commonservice.DTO.OrderDTO;
import com.order.orderservice.entity.OrderEntity;
import com.order.orderservice.event.EventProducer;
import com.order.orderservice.reponse.OrderReponse;
import com.order.orderservice.service.IOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    private IOrder iOrder;

    @Autowired
    private EventProducer eventProducer;


    @PostMapping("/")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO) {
        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (!orderDTO.isValid()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid order data");
        }

        // Gọi phương thức để tạo đơn hàng
        OrderEntity createdOrder = iOrder.createOder(orderDTO);

        // Kiểm tra nếu đơn hàng đã được tạo thành công
        if (createdOrder != null) {
            eventProducer.send("demokafka", "message")
                    .subscribe(
                            result -> {
                                // Xử lý kết quả nếu cần
                                System.out.println("Message sent successfully: " + result);
                            },
                            error -> {
                                // Xử lý lỗi nếu gửi message không thành công
                                System.err.println("Error sending message to Kafka: " + error.getMessage());
                            }
                    );
            return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create order");
        }
    }

    @PutMapping("/update/{orderId}/status")
    public ResponseEntity<Void> updateStatusOrder(@PathVariable Long orderId, @RequestParam String statusOrder) {
        iOrder.updateStatusOrder(orderId, statusOrder);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{orderId}/delivery")
    public ResponseEntity<Void> updateStatusDeliveryOrder(@PathVariable Long orderId, @RequestParam String statusDelivery) {
        iOrder.updateStatusDeliveryOrder(orderId, statusDelivery);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{phoneNumber}/{status}")
    public ResponseEntity<?> getOrdersByUser(@PathVariable String phoneNumber,@PathVariable String status, @RequestHeader("Authorization") String token) {
        List<OrderReponse> orders = iOrder.getOrderByUser(phoneNumber,status, token);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderEntity> getOrderById(@PathVariable Long orderId) {
        OrderEntity order = iOrder.getOneOder(orderId);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
