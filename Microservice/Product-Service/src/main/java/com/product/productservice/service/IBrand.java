package com.product.productservice.service;

import com.example.commonservice.DTO.BrandDTO;
import com.product.productservice.entity.Brand;

import java.util.List;

public interface IBrand {
    List<Brand> getAllBrand();
    Brand addBrand(BrandDTO brandDTO);
    Brand getById(Long id);

}
