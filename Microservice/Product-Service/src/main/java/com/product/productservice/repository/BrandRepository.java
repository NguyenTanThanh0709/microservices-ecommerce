package com.product.productservice.repository;

import com.product.productservice.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand,Long> {
    Optional<Brand> findBySlug(String slug);

    @Query("select e from Brand e where e.name = ?1 and (?2 is null or e.id != ?2)")
    Brand findExistedName(String name, Long id);
}