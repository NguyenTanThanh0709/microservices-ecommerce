package com.example.promotionservice.repository;

import com.example.promotionservice.entity.DiscountCodeEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;

import java.time.ZonedDateTime;
import java.util.Optional;

@Repository
public interface DiscountCodeRepository extends JpaRepository<DiscountCodeEntity, Long > {


    @Query("SELECT p FROM DiscountCodeEntity p " +
            "WHERE p.name LIKE %:name% " +
            "AND p.code LIKE %:couponCode% " +
            "AND p.startDate >= :startDate " +
            "AND p.endDate <= :endDate")
    Page<DiscountCodeEntity> findPromotions(@Param("name") String name,
                                            @Param("couponCode") String couponCode,
                                            @Param("startDate") ZonedDateTime startDate,
                                            @Param("endDate") ZonedDateTime endDate,
                                            Pageable pageable);

    @Transactional
    @Modifying
    @Query("UPDATE DiscountCodeEntity d SET d.isActive = :isActive WHERE d.id = :id")
    void updateDiscountCodeStatus(Long id, boolean isActive);
}
