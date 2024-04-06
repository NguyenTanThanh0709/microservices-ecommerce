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
import java.util.List;
import java.util.Optional;

@Repository
public interface DiscountCodeRepository extends JpaRepository<DiscountCodeEntity, Long > {

    @Transactional
    @Modifying
    @Query("UPDATE DiscountCodeEntity d SET d.isActive = :isActive WHERE d.id = :id")
    void updateDiscountCodeStatus(Long id, boolean isActive);

    List<DiscountCodeEntity> findByIdUser(Long idUser);
}
