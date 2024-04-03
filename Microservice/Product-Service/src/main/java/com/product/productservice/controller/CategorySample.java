package com.product.productservice.controller;

import com.product.productservice.DTO.ReponsCate.Category;
import com.product.productservice.DTO.ReponsCate.CategoryResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/products")
public class CategorySample {

    private List<Category> createSampleData() {
        List<Category> categories = new ArrayList<>();

        categories.add(Category.builder()
                ._id("1")
                .name("Thời Trang Nữ")
                .build());

        categories.add(Category.builder()
                ._id("2")
                .name("Thời Trang Nam")
                .build());

        categories.add(Category.builder()
                ._id("3")
                .name("Giày Dép Nam")
                .build());

        categories.add(Category.builder()
                ._id("4")
                .name("Giày Dép Nữ")
                .build());

        categories.add(Category.builder()
                ._id("5")
                .name("Đồng Hồ")
                .build());

        categories.add(Category.builder()
                ._id("6")
                .name("Thực Phẩm và Đồ Uống")
                .build());

        categories.add(Category.builder()
                ._id("7")
                .name("Điện Thoại & Phụ Kiện")
                .build());

        return categories;
    }

    @GetMapping("/categories")
    public ResponseEntity<CategoryResponse> getCategories() throws IOException {
        // JSON data
        CategoryResponse categoryResponse = new CategoryResponse(
                "lấy sản danh mục hàng thành công",
                createSampleData()
        );
        return ResponseEntity.ok(categoryResponse);
    }
}
