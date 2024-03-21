package com.cart.cartservice.repository;

import com.cart.cartservice.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
    Optional<CartEntity> findByCustomerId(Long customerId);
    CartEntity findByCustomerIdAndOrderIdIsNull(Long customerId);
}
