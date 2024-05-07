package com.product.productservice.controller.seller;

import com.example.commonservice.DTO.ProductDTO;
import com.product.productservice.entity.ProductEntity;
import com.product.productservice.service.impl.CloudinaryService;
import com.product.productservice.service.impl.ProductImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products/seller")
public class ProductApiSeller {

    @Autowired
    private ProductImpl productimpl;

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/")
    public ResponseEntity<?> addProduct(@RequestBody ProductDTO product) {
        if(!product.isValid()){
            return new ResponseEntity<>("Vui lòng điền đầy đủ thông tin của sản phẩm.", HttpStatus.BAD_REQUEST);
        }
        ProductEntity newProduct = productimpl.addProduct(product, null, null);
        return new ResponseEntity<>(newProduct.getId(), HttpStatus.CREATED);
    }


    @PostMapping("/files")
    public ResponseEntity<?> addFile(@RequestParam(value = "id", required = false) String id,
                                        @RequestParam(value = "files", required = false) List<MultipartFile> files) {
        if(files.size() == 0 || files == null){
            return new ResponseEntity<>("Vui lòng điền đầy đủ thông tin của sản phẩm.", HttpStatus.BAD_REQUEST);
        }

        List<String> listUrlImgs;
        listUrlImgs = cloudinaryService.upload(files, id);

        return new ResponseEntity<>(listUrlImgs, HttpStatus.CREATED);
    }

    @PostMapping("/file")
    public ResponseEntity<?> addFile(
            @RequestParam(value = "file", required = false) MultipartFile file) {
        if( file == null){
            return new ResponseEntity<>("Vui lòng điền đầy đủ thông tin của sản phẩm.", HttpStatus.BAD_REQUEST);
        }

        String urlImg = cloudinaryService.upload(file);
        return new ResponseEntity<>(urlImg, HttpStatus.CREATED);
    }




}
