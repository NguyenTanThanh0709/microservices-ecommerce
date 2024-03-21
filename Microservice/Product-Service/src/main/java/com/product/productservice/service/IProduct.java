package com.product.productservice.service;

import com.example.commonservice.DTO.ProductDTO;
import com.product.productservice.entity.ProductEntity;
import com.product.productservice.entity.ProductImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProduct {
    ProductEntity addProduct(ProductDTO productDTO);
    public Page<ProductEntity> findAll(Pageable pageable);
    List<ProductEntity> getAllByBrand(Long idBrand);
    List<ProductEntity> getAllByPhoneOwner(Long idOwner);
    List<ProductEntity> getAllByLikeName(String name, Pageable pageable);
    void deleteProductByid(Long id);
    ProductEntity updateProduct(ProductDTO productDTO);



}
