package com.product.productservice.repository;

import com.product.productservice.entity.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize,Long> {
}
