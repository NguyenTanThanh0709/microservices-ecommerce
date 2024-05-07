package com.cart.cartservice.service.impl;

import com.cart.cartservice.entity.CartEntity;
import com.cart.cartservice.entity.CartItemEntity;
import com.cart.cartservice.reponse.CartReponse;
import com.cart.cartservice.reponse.CartReponseWithMessage;
import com.cart.cartservice.repository.CartItemRepository;
import com.cart.cartservice.repository.CartRepository;
import com.cart.cartservice.service.ICart;
import com.example.commonservice.DTO.CartDTO;

import com.example.commonservice.DTO.ProductReponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class CartImpl implements ICart {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private  WebClient webClient;
    @PersistenceContext
    private EntityManager entityManager;


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


        boolean check  = false;

        // Check if cartExist is not null and has cartItems
        if(cartExist != null && cartExist.getCartItems() != null && cartExist.getCartItems().size() > 0){
            for (CartItemEntity cartItem: cartExist.getCartItems()){
                if(cartItem.getProductId() == cartDTO.getProductId()){
                    check = true;
                    cartItem.setQuantity(cartItem.getQuantity() + 1);
                }
            }
        }

        if(check){
            entityManager.persist(cart);
            return cart;
        }

        CartItemEntity cartItem = new CartItemEntity();
        cartItem.setProductId(cartDTO.getProductId());
        cartItem.setQuantity(cartDTO.getQuantity());


        cart.getCartItems().add(cartItem);
        cartItem.setCart(cart);


// Lưu CartEntity và CartItemEntity vào cơ sở dữ liệu
        entityManager.persist(cart);
        entityManager.persist(cartItem);


        return cart;
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
    public void deleteCartItemById(Long id) {
        cartItemRepository.deleteById(id);
    }


    @Override
    public List<CartReponse> findCartByUserHave(Long idUser, String token) {
        CartEntity cartEntity = findCartByUser(idUser);
        List<CartReponse> cartReponseList = new ArrayList<>();

        if (cartEntity == null) {
            return cartReponseList;
        }

        cartReponseList = Flux.fromIterable(cartEntity.getCartItems())
                .flatMap(cartItem -> getProductResponse(cartItem.getProductId().toString(), token)
                        .map(productResponse -> {
                            CartReponse cartReponse = new CartReponse();
                            cartReponse.set_id(cartItem.getId().toString());
                            cartReponse.setBuy_count(cartItem.getQuantity());
                            cartReponse.setStatus(-1);
                            cartReponse.setUser(cartEntity.getCustomerId().toString());
                            cartReponse.setProduct(productResponse);
                            cartReponse.setPrice(productResponse.getPrice());
                            cartReponse.setPrice_before_discount(productResponse.getPrice());
                            return cartReponse;
                        }))
                .collectList()
                .block(); // Wait for all asynchronous calls to complete

        return cartReponseList;

    }

    private  Mono<ProductReponse> getProductResponse(String productId, String token) {
        return webClient.get()
                .uri("http://localhost:8222/api/v1/products/one/" + productId)
                .headers(headers -> headers.setBearerAuth(token.substring(7)))
                .retrieve()
                .bodyToMono(ProductReponse.class);
    }

    @Override
    public CartReponseWithMessage getCartWithMessage(Long idUser, String token) {
        CartReponseWithMessage cartReponseWithMessage = new CartReponseWithMessage();
        List<CartReponse> list = findCartByUserHave(idUser,token);
        if(list != null){
            cartReponseWithMessage.setMessage("Lấy giỏ hàng thành công");
            cartReponseWithMessage.setData(list);
            return cartReponseWithMessage;
        }
        return  null;
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

    @Override
    public void updateQuantityById(Long id, int quantity) {
         cartItemRepository.updateQuantityById(id, quantity);
    }


}
