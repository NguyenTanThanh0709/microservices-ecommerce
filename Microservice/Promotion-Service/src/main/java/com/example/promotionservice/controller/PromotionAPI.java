package com.example.promotionservice.controller;

import com.example.commonservice.DTO.PromotionDTO;
import com.example.promotionservice.entity.DiscountAppEntity;
import com.example.promotionservice.entity.DiscountCodeEntity;
import com.example.promotionservice.service.IDiscountCode;
import com.example.promotionservice.service.impl.PromitonImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/promotions")
public class PromotionAPI {
    @Autowired
    private PromitonImpl promiton;

    @Autowired
    private IDiscountCode discountCode;

    @GetMapping("/user/{userId}")
    public List<DiscountCodeEntity> getDiscountCodesByUserId(@PathVariable("userId") Long userId) {
        return discountCode.findDiscountCodesByUserId(userId);
    }

    @PostMapping("/")
    public ResponseEntity<?> add (@RequestBody PromotionDTO promotionDTO){
        List<DiscountAppEntity> list = promiton.addDiscount(promotionDTO);
        if (list == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add promotion.");
        } else {
            return ResponseEntity.ok(list);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePromotion(@PathVariable Long id, @RequestBody PromotionDTO promotionDTO) {
        promotionDTO.setId(id); // Set id cho PromotionDTO từ đường dẫn URL
        List<DiscountAppEntity> updatedDiscounts = promiton.updateDiscount(promotionDTO);
        if (updatedDiscounts == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update promotion.");
        } else {
            return ResponseEntity.ok(updatedDiscounts);
        }
    }

    @GetMapping("/product/{idProduct}")
    public List<DiscountAppEntity> getDiscountAppsByProductId(@PathVariable Long idProduct) {
        return promiton.findByProductId(idProduct);
    }

    @GetMapping("/{id}")
    public DiscountCodeEntity    getDiscountAppsById(@PathVariable Long id) {
        return promiton.findById(id);
    }

    @GetMapping("/product-between-day/{idProduct}")
    public List<DiscountAppEntity> getDiscountAppsByProductIdAndBetweenDay(@PathVariable Long idProduct) {
        return promiton.findByProductId(idProduct);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateDiscountCodeStatus(@PathVariable Long id, @RequestParam boolean isActive) {
        try {
            discountCode.updateDiscountCodeStatus(id, isActive);
            return new ResponseEntity<>("Discount code status updated successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update discount code status.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
