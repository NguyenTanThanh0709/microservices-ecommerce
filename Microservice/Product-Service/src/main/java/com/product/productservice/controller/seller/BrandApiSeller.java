package com.product.productservice.controller.seller;

import com.example.commonservice.DTO.BrandDTO;
import com.product.productservice.entity.Brand;
import com.product.productservice.service.IBrand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products/seller")
public class BrandApiSeller {
    @Autowired
    private IBrand iBrand;

    @PostMapping("/add-brand")
    public ResponseEntity<?> addBrand(@RequestBody BrandDTO brandDTO) {
        if (brandDTO.getName() == null || brandDTO.getSlug() == null || brandDTO.getUrlBrand() == null) {
            return new ResponseEntity<>("Vui lòng điền đầy đủ thông tin của thương hiệu.", HttpStatus.BAD_REQUEST);
        }
        Brand newBrand = iBrand.addBrand(brandDTO);
        return new ResponseEntity<>(newBrand, HttpStatus.CREATED);
    }
}
