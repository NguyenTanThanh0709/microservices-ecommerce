package com.cart.cartservice.repository;

import com.cart.cartservice.entity.CartEntity;
import com.cart.cartservice.entity.CartItemEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface CartItemRepository extends JpaRepository<CartItemEntity, Long> {
    Set<CartItemEntity> findAllByCart(CartEntity cart);
    Optional<CartItemEntity> findByCartIdAndProductId(Long cartId, Long productId);
    @Transactional
    void deleteByCartIdAndProductId(Long cartId, Long productId);
    @Transactional
    void deleteByCartIdAndProductIdIn(Long cartId, List<Long> productIds);
    @Query("select sum(ci.quantity) from CartItemEntity ci where ci.cart.id = ?1")
    Long countItemInCart(Long cartId);
}
