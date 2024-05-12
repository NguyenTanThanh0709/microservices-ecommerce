package com.product.productservice.repository;

import com.product.productservice.entity.Brand;
import com.product.productservice.entity.ProductEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    List<ProductEntity> findAllByBrandAndIsPublishedTrue(Brand brand);
    Page<ProductEntity> findAll(Pageable pageable);
    List<ProductEntity> findByPhoneOwner(Long phoneOwner);
    Page<ProductEntity> findByNameContainingIgnoreCase(String name, Pageable pageable);
    @Modifying
    @Query("UPDATE ProductEntity p SET p.rating = :newRating WHERE p.id = :productId")
    void updateRatingById(@Param("productId") Long productId, @Param("newRating") int newRating);



    @Query("SELECT p.rating FROM ProductEntity p WHERE p.id = :productId ORDER BY p.createdAt ASC")
    Integer getFirstRatingByProductId(@Param("productId") Long productId);


    @Modifying
    @Transactional
    @Query("UPDATE ProductEntity p SET p.view = p.view + 1 WHERE p.id = :productId")
    void incrementViewCount(Long productId);

    @Modifying
    @Transactional
    @Query("UPDATE ProductEntity p SET p.stockQuantity = p.stockQuantity - :quantity, p.sold = p.sold + :quantity WHERE p.id = :productId")
    void updateStockAndSoldQuantity(@Param("productId") Long productId, @Param("quantity") Long quantity);

    @Query("SELECT p FROM ProductEntity p " +
            "WHERE (:name IS NULL OR lower(p.name) LIKE %:name%) " +
            "AND (:category IS NULL OR lower(p.category) LIKE %:category%) " +
            "AND (:price_min IS NULL OR p.price >= :price_min) " +
            "AND (:rating_filter IS NULL OR p.rating >= :rating_filter) " +
            "AND (:price_max IS NULL OR p.price <= :price_max) " +
            "AND p.isPublished = true " +
            "ORDER BY " +
            "CASE " +
            "  WHEN :sortBy = 'view' THEN p.view " +
            "  WHEN :sortBy = 'sold' THEN p.sold " +
            "  WHEN :sortBy = 'price' THEN " +
            "    CASE " +
            "      WHEN :order = 'desc' THEN -1 " +
            "      ELSE 1 " +
            "    END " +
            "  ELSE 0 " +
            "END DESC")
    Page<ProductEntity> findAllWithFiltersAndSorting(@Param("name") String name,
                                                     @Param("category") String category,
                                                     @Param("price_min") Double price_min,
                                                     @Param("price_max") Double price_max,
                                                     @Param("sortBy") String sortBy,
                                                     @Param("order") String order,
                                                     @Param("rating_filter") Integer rating_filter,
                                                     Pageable pageable);

    @Query(value = "SELECT p FROM ProductEntity p WHERE LOWER(p.name) LIKE %:productName% " +
            "AND (p.brand.name IN :brandName OR (:brandName is null OR :brandName = '')) " +
            "AND p.isPublished = TRUE ")
    List<ProductEntity> getExportingProducts(@Param("productName") String productName, @Param("brandName") String brandName);
}
