package com.example.promotionservice.repository;

import com.example.promotionservice.entity.DiscountAppEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountAppRepository extends JpaRepository<DiscountAppEntity, Long> {
}
