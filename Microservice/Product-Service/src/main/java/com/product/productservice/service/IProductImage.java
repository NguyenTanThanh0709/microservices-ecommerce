package com.product.productservice.service;

import com.example.commonservice.DTO.ProductDTO;
import com.product.productservice.entity.ProductImage;

import java.util.List;

public interface IProductImage {
    ProductImage addProductImage(String img);
    void deleteImageByIdInProduct(Long id);
}
