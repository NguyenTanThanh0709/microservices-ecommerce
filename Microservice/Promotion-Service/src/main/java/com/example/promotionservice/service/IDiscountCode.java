package com.example.promotionservice.service;

import com.example.commonservice.DTO.PromotionDTO;
import com.example.promotionservice.entity.DiscountAppEntity;
import com.example.promotionservice.entity.DiscountCodeEntity;

import java.util.List;

public interface IDiscountCode {
    List<DiscountAppEntity> addDiscount(PromotionDTO promotionDTO);
    List<DiscountAppEntity> findByProductId(Long idProduct);
    DiscountCodeEntity findById(Long id);
    List<DiscountAppEntity> findByProductIdBetweenDate(Long idProduct);
    public void updateDiscountCodeStatus(Long id, boolean isActive);
    List<DiscountCodeEntity> findDiscountCodesByUserId(Long idUser);
    List<DiscountAppEntity> updateDiscount(PromotionDTO promotionDTO);


}
