package com.product.productservice.service.impl;

import com.example.commonservice.DTO.BrandDTO;
import com.product.productservice.entity.Brand;
import com.product.productservice.repository.BrandRepository;
import com.product.productservice.service.IBrand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrandImpl implements IBrand {
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private final ModelMapper mapper;
    @Override
    public List<Brand> getAllBrand() {
        return brandRepository.findAll();
    }

    @Override
    public Brand addBrand(BrandDTO brandDTO) {
        Brand brand = mapper.map(brandDTO,Brand.class);
        return brandRepository.save(brand);
    }

    @Override
    public Brand getById(Long id) {
        Optional<Brand> brandOptional = brandRepository.findById(id);
        if(brandOptional.isPresent()){
            return  brandOptional.get();
        }
        return null;
    }
}
