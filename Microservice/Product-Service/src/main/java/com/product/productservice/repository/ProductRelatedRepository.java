package com.product.productservice.repository;

import com.product.productservice.entity.ProductEntity;
import com.product.productservice.entity.ProductRelated;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRelatedRepository extends JpaRepository<ProductRelated, Long> {
    Page<ProductRelated> findAllByProduct(ProductEntity product, Pageable pageable);
}
