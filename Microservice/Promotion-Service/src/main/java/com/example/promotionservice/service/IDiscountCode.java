package com.example.promotionservice.service;

import com.example.commonservice.DTO.PromotionDTO;
import com.example.promotionservice.entity.DiscountAppEntity;

import java.util.List;

public interface IDiscountCode {
    List<DiscountAppEntity> addDiscount(PromotionDTO promotionDTO);
    List<DiscountAppEntity> findByProductId(Long idProduct);
    List<DiscountAppEntity> findByProductIdBetweenDate(Long idProduct);
    public void updateDiscountCodeStatus(Long id, boolean isActive);
}
