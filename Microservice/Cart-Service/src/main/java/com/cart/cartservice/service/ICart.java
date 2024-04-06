package com.cart.cartservice.service;

import com.cart.cartservice.entity.CartEntity;
import com.cart.cartservice.entity.CartItemEntity;
import com.cart.cartservice.reponse.CartReponse;
import com.cart.cartservice.reponse.CartReponseWithMessage;
import com.example.commonservice.DTO.CartDTO;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Set;

public interface ICart {
    CartEntity createCartIExitsAddProduct(CartDTO cartDTO);
    CartEntity findCartByUser(Long iduser);
    void deleteCartItemById(Long id);
    List<CartReponse> findCartByUserHave(Long idUser, String token);

    CartReponseWithMessage getCartWithMessage(Long idUser, String token);

     void deleteByCartIdAndProductId(Long cartId, Long productId);
    void deleteByCartIdAndProductIdIn(Long cartId, List<Long> productIds);
    Long countItemInCart(Long cartId);
    Set<CartItemEntity> findAllByCart(CartEntity cart);

    CartItemEntity findByCartIdAndProductId(Long cartId, Long productId);

    void updateQuantityById(Long id, int quantity);
}
