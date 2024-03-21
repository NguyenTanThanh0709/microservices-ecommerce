package com.product.productservice.controller;

import com.example.commonservice.DTO.ProductDTO;
import com.product.productservice.entity.ProductEntity;
import com.product.productservice.service.impl.ProductImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/products")
public class ProductController {

    @Autowired
    private ProductImpl productimpl;


    @GetMapping("/hello1")
    public String hello(){
        return  "Hello ";
    }

    @PostMapping("/")
    public ResponseEntity<?> addProduct(@RequestBody ProductDTO product) {
        if(!product.isValid()){
            return new ResponseEntity<>("Vui lòng điền đầy đủ thông tin của sản phẩm.", HttpStatus.BAD_REQUEST);
        }
        ProductEntity newProduct = productimpl.addProduct(product);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    @GetMapping("/brand")
    public ResponseEntity<?> getBYBrand(@RequestParam Long idbrand) {
        List<ProductEntity> newProduct = productimpl.getAllByBrand(idbrand);
        return new ResponseEntity<>(newProduct, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductEntity> productPage = productimpl.findAll(pageable);
        return new ResponseEntity<>(productPage.getContent(), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getAll(@RequestParam Long iduser) {
        List<ProductEntity> productPage = productimpl.getAllByPhoneOwner(iduser);
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }

    @GetMapping("/like-name")
    public ResponseEntity<?> getAll(@RequestParam String name, @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(productimpl.getAllByLikeName(name,pageable), HttpStatus.OK);
    }

    @DeleteMapping("/delete-product")
    public ResponseEntity<?> deleteProduct(@RequestParam Long id){
        productimpl.deleteProductByid(id);
        return new ResponseEntity<>("Xóa Thành Công Sản Phẩm", HttpStatus.OK);
    }

    @PutMapping("/update-product/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO ){
        return new ResponseEntity<>(productimpl.updateProduct(productDTO), HttpStatus.OK);
    }
}
