package com.cart.cartservice.service.impl;

import com.cart.cartservice.entity.CartEntity;
import com.cart.cartservice.entity.CartItemEntity;
import com.cart.cartservice.repository.CartItemRepository;
import com.cart.cartservice.repository.CartRepository;
import com.cart.cartservice.service.ICart;
import com.example.commonservice.DTO.CartDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
@RequiredArgsConstructor
@Transactional
public class CartImpl implements ICart {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public CartEntity createCartIExitsAddProduct(CartDTO cartDTO) {
        // Kiểm tra xem người dùng đã có giỏ hàng hay không
        CartEntity cartExist = findCartByUser(cartDTO.getCustomerId());
        CartEntity cart;
        if(cartExist != null){
            cart = cartExist;
        }else {
            cart = new CartEntity();
            cart.setCustomerId(cartDTO.getCustomerId());
        }
        CartItemEntity cartItem = new CartItemEntity();
        cartItem.setProductId(cartDTO.getProductId());
        cartItem.setPrice(cartDTO.getPrice());
        cartItem.setQuantity(cartDTO.getQuantity());
        cart.getCartItems().add(cartItem);
        cart.setPriceTotal(cart.getPriceTotal() + cartDTO.getQuantity() * cartDTO.getPrice());

        return cartRepository.save(cart);
    }


    @Override
    public CartEntity findCartByUser(Long iduser) {
        Optional<CartEntity> optionalCartEntity = cartRepository.findByCustomerId(iduser);
        if(optionalCartEntity.isPresent()){
            return  optionalCartEntity.get();
        }
        return null;
    }

    @Override
    public void deleteByCartIdAndProductId(Long cartId, Long productId) {
        cartItemRepository.deleteByCartIdAndProductId(cartId, productId);
    }

    @Override
    public void deleteByCartIdAndProductIdIn(Long cartId, List<Long> productIds) {
        cartItemRepository.deleteByCartIdAndProductIdIn(cartId, productIds);
    }

    @Override
    public Long countItemInCart(Long cartId) {
        return cartItemRepository.countItemInCart(cartId);
    }

    @Override
    public Set<CartItemEntity> findAllByCart(CartEntity cart) {
        return cartItemRepository.findAllByCart(cart);
    }

    @Override
    public CartItemEntity findByCartIdAndProductId(Long cartId, Long productId) {
        Optional<CartItemEntity> optionalCartItemEntity = cartItemRepository.findByCartIdAndProductId(cartId, productId);
        if(optionalCartItemEntity.isPresent()){
            return optionalCartItemEntity.get();
        }
        return null;
    }


}
