package com.product.productservice.service.impl;

import com.cloudinary.Cloudinary;
import com.product.productservice.entity.ProductEntity;
import com.product.productservice.service.IProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {
    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private IProduct productService;


    public String upload(MultipartFile file)  {
        try{
            Map data = this.cloudinary.uploader().upload(file.getBytes(), Map.of());
            return data.get("url").toString();
        }catch (IOException io){
            throw new RuntimeException("Image upload fail");
        }
    }

    public List<String> upload(List<MultipartFile> files, String id) {
        List<String> urls = new ArrayList<>();
        try {
            for (MultipartFile file : files) {
                Map data = this.cloudinary.uploader().upload(file.getBytes(), Map.of());
                urls.add(data.get("url").toString());
            }

            Long number = Long.parseLong(id);
            ProductEntity pr = productService.findOneByIdone(number);
            if(pr != null){
                productService.addProductImages(pr,urls);
            }
            return urls;
        } catch (IOException io) {
            throw new RuntimeException("Image upload failed", io);
        }catch (NumberFormatException e) {
            throw new RuntimeException("Image upload failed");
        } catch (NullPointerException e) {
            throw new RuntimeException("Image upload failed");
        }
    }
}