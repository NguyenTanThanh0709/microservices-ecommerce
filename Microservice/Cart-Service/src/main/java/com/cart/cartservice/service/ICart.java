package com.cart.cartservice.service;

import com.cart.cartservice.entity.CartEntity;
import com.cart.cartservice.entity.CartItemEntity;
import com.example.commonservice.DTO.CartDTO;

import java.util.List;
import java.util.Set;

public interface ICart {
    CartEntity createCartIExitsAddProduct(CartDTO cartDTO);
    CartEntity findCartByUser(Long iduser);
     void deleteByCartIdAndProductId(Long cartId, Long productId);
    void deleteByCartIdAndProductIdIn(Long cartId, List<Long> productIds);
    Long countItemInCart(Long cartId);
    Set<CartItemEntity> findAllByCart(CartEntity cart);

    CartItemEntity findByCartIdAndProductId(Long cartId, Long productId);
}
