package com.product.productservice.controller;

import com.example.commonservice.DTO.BrandDTO;
import com.product.productservice.entity.Brand;
import com.product.productservice.service.IBrand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/products")
public class BrandController {
    @Autowired
    private IBrand iBrand;

    @GetMapping("/brand-list")
    public ResponseEntity<List<Brand>> getList() {
        List<Brand> brands = iBrand.getAllBrand();
        return ResponseEntity.ok().body(brands);
    }


}
