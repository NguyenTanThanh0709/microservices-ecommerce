package com.user.userservice.controller;

import com.user.userservice.entity.Shop;
import com.user.userservice.reponse.ShopRequest;
import com.user.userservice.service.impl.ShopImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class ShopController {
    private final ShopImpl shopService;

    @Autowired
    public ShopController(ShopImpl shopService) {
        this.shopService = shopService;
    }

    @PostMapping("/shop")
    public ResponseEntity<Shop> addShop(@RequestBody ShopRequest shop) {
        Shop newShop = shopService.addShop(shop);
        return new ResponseEntity<>(newShop, HttpStatus.CREATED);
    }

    @GetMapping("/shop/{id}")
    public ResponseEntity<Shop> getShopById(@PathVariable("id") Long id) {
        Optional<Shop> shop = shopService.getShopById(id);
        return shop.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/users/{userId}/shop/exist")
    public ResponseEntity<Boolean> doesShopExistForUser(@PathVariable Long userId) {
        boolean shopExists = shopService.doesShopExistForUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body(shopExists);
    }
}
