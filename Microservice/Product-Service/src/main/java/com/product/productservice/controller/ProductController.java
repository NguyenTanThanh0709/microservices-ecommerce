package com.product.productservice.controller;

import com.example.commonservice.DTO.ProductDTO;
import com.product.productservice.DTO.Reponse.ProductReponSingle;
import com.product.productservice.DTO.Reponse.ProductReponse;
import com.product.productservice.entity.ProductEntity;
import com.product.productservice.event.EventProducer;
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
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductImpl productimpl;

    @Autowired
    private EventProducer eventProducer;

    @PatchMapping("/update-quantity")
    public ResponseEntity<String> updateQuantity( @RequestParam("ordersize") String ordersize) {
        try {
            productimpl.updateQuantityById(ordersize);
            return new ResponseEntity<>("Quantity updated successfully.", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/update-quantity-cancel")
    public ResponseEntity<String> updateQuantitycancel( @RequestParam("ordersize") String ordersize) {
        try {
            productimpl.updateQuantityByIdByCancelOrder(ordersize);
            return new ResponseEntity<>("Quantity updated successfully.", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/brand")
    public ResponseEntity<?> getBYBrand(@RequestParam Long idbrand) {
        List<ProductEntity> newProduct = productimpl.getAllByBrand(idbrand);
        return new ResponseEntity<>(newProduct, HttpStatus.OK);
    }


    @GetMapping("/")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "5") int size,
                                    @RequestParam(required = false) String name,
                                    @RequestParam(required = false) String category,
                                    @RequestParam(required = false) Double price_min,
                                    @RequestParam(required = false) Double price_max,
                                    @RequestParam(required = false) String sort_by,
                                    @RequestParam(required = false) String order,
                                    @RequestParam(required = false) Integer rating_filter
                                    ) {
        Pageable pageable = PageRequest.of(page, size);
        ProductReponse productPage = productimpl.findAll(pageable,name, category, price_min, price_max, sort_by,order, rating_filter);
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        ProductReponSingle productOptional = productimpl.findOneById(id);
        return new ResponseEntity<>(productOptional, HttpStatus.OK);
    }

    @GetMapping("/one/{id}")
    public ResponseEntity<?> getOneone(@PathVariable Long id) {
        ProductEntity productOptional = productimpl.findOneByIdone(id);
        return new ResponseEntity<>(productOptional, HttpStatus.OK);
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

    @PatchMapping("/delete-product")
    public ResponseEntity<?> deleteProduct(@RequestParam Long id){
        productimpl.deleteProductByid(id);
        return new ResponseEntity<>("Xóa Thành Công Sản Phẩm", HttpStatus.OK);
    }

    @PatchMapping("/show-product")
    public ResponseEntity<?> showProduct(@RequestParam Long id){
        productimpl.deleteProductByid1(id);
        return new ResponseEntity<>("Xóa Thành Công Sản Phẩm", HttpStatus.OK);
    }

    @PutMapping("/update-product/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO ){
        return new ResponseEntity<>(productimpl.updateProduct(productDTO), HttpStatus.OK);
    }

    @PutMapping("/{productId}/views/increment")
    public void incrementProductView(@PathVariable Long productId) {
        productimpl.incrementProductView(productId);
    }

    @PostMapping("/update-stock-and-sold-quantity/{content}")
    public ResponseEntity<String> updateStockAndSoldQuantity(@PathVariable String content) {
        try {
            String[] split = content.split("z");
            boolean check = productimpl.updateStockAndSoldQuantity(split[0]);
            if(!check){
                eventProducer.send("order_Cancel_topic", split[1])
                        .subscribe(
                                result -> {
                                    // Xử lý kết quả nếu cần
                                    System.out.println("Message sent successfully: " + result);
                                },
                                error -> {
                                    // Xử lý lỗi nếu gửi message không thành công
                                    System.err.println("Error sending message to Kafka: " + error.getMessage());
                                }
                        );
            }
            return new ResponseEntity<>("Stock and sold quantity updated successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update stock and sold quantity: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
