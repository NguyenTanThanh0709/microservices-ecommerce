package com.order.orderservice.controller;

import com.example.commonservice.DTO.OrderDTO;
import com.order.orderservice.entity.OrderEntity;
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

    @GetMapping("/user/{phoneNumber}")
    public ResponseEntity<?> getOrdersByUser(@PathVariable String phoneNumber) {
        List<OrderEntity> orders = iOrder.getOrderByUser(phoneNumber);
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
