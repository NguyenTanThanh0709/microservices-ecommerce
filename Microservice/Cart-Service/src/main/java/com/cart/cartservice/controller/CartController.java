package com.cart.cartservice.controller;

import com.cart.cartservice.entity.CartEntity;
import com.cart.cartservice.entity.CartItemEntity;
import com.cart.cartservice.reponse.CartReponse;
import com.cart.cartservice.reponse.CartReponseWithMessage;
import com.cart.cartservice.reponse.CartUpdateQuantiry;
import com.cart.cartservice.service.ICart;
import com.cart.cartservice.service.impl.CartImpl;
import com.example.commonservice.DTO.CartDTO;
import com.example.commonservice.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/carts")
public class CartController {

    @Autowired
    private ICart cartService;

    @PostMapping("/create")
    public ResponseEntity<CartEntity> createCartAndAddProduct(@RequestBody CartDTO cartDTO) {
        CartEntity createdCart = cartService.createCartIExitsAddProduct(cartDTO);
        return new ResponseEntity<>(createdCart, HttpStatus.CREATED);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<CartEntity> getCartByCustomerId(@PathVariable Long customerId) {
        CartEntity cart = cartService.findCartByUser(customerId);
        if (cart != null) {
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{cartId}/items/{productId}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long cartId, @PathVariable Long productId) {
        cartService.deleteByCartIdAndProductId(cartId, productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{cartId}/items")
    public ResponseEntity<Set<CartItemEntity>> getAllCartItems(@PathVariable Long cartId) {
        CartEntity cart = cartService.findCartByUser(cartId);
        if (cart != null) {
            Set<CartItemEntity> cartItems = cartService.findAllByCart(cart);
            return new ResponseEntity<>(cartItems, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{cartId}/items")
    public ResponseEntity<Void> deleteCartItems(@PathVariable Long cartId, @RequestBody List<Long> productIds) {
        cartService.deleteByCartIdAndProductIdIn(cartId, productIds);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{cartId}/items/count")
    public ResponseEntity<Long> countItemsInCart(@PathVariable Long cartId) {
        Long itemCount = cartService.countItemInCart(cartId);
        return ResponseEntity.ok(itemCount);
    }

    @GetMapping("/{cartId}/items/{productId}")
    public ResponseEntity<CartItemEntity> getCartItem(@PathVariable Long cartId, @PathVariable Long productId) {
        CartItemEntity cartItem = cartService.findByCartIdAndProductId(cartId, productId);
        if (cartItem != null) {
            return ResponseEntity.ok(cartItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/carts-user/{idUser}")
    public ResponseEntity<List<CartReponse>> findCartByUserHave(@PathVariable Long idUser, @RequestHeader("Authorization") String token) {
        List<CartReponse> cartResponseList = cartService.findCartByUserHave(idUser, token);
        return new ResponseEntity<>(cartResponseList, HttpStatus.OK);
    }

    @GetMapping("/carts-user-data")
    public ResponseEntity<CartReponseWithMessage> findCartByUserHavedata(@RequestParam Long iduser, @RequestHeader("Authorization") String token) {
        CartReponseWithMessage cartResponseWithMessage = cartService.getCartWithMessage(iduser, token);
        if (cartResponseWithMessage != null) {
            return ResponseEntity.ok()
                    .body(cartResponseWithMessage);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null); // You can customize the response body accordingly
        }
    }

    @DeleteMapping("/cart-item/{id}")
    public ResponseEntity<String> deleteCartItemById(@PathVariable Long id) {
        cartService.deleteCartItemById(id);
        return ResponseEntity.ok("CartItemEntity with ID " + id + " has been successfully deleted.");
    }


    @PutMapping("/update-purchase")
    public void updateQuantity(@RequestBody CartUpdateQuantiry cartUpdateQuantiry) {
        cartService.updateQuantityById(cartUpdateQuantiry.getProduct_id(), cartUpdateQuantiry.getBuy_count());
    }

}
