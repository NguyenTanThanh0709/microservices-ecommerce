package com.example.promotionservice.repository;

import com.example.promotionservice.entity.DiscountAppEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscountAppRepository extends JpaRepository<DiscountAppEntity, Long> {
    @Query("SELECT da FROM DiscountAppEntity da WHERE da.IdProduct = :idProduct")
    List<DiscountAppEntity> findByProductId(Long idProduct);
}
