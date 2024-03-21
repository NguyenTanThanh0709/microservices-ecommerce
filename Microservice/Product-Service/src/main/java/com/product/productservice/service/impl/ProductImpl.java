
package com.product.productservice.service.impl;
import com.product.productservice.utils.ProductMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.commonservice.DTO.ProductDTO;
import com.product.productservice.entity.Brand;
import com.product.productservice.entity.ProductEntity;
import com.product.productservice.entity.ProductImage;
import com.product.productservice.repository.ProductRepository;
import com.product.productservice.service.IBrand;
import com.product.productservice.service.IProduct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductImpl implements IProduct {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private final ModelMapper mapper;
    @Autowired
    private IBrand iBrand;



    @Override
    public ProductEntity addProduct(ProductDTO productDTO) {
        ProductEntity productEntity = mapper.map(productDTO,ProductEntity.class);
        List<ProductImage> productImages = new ArrayList<>();
        if(productDTO.getProductImages() != null){
            for (String img : productDTO.getProductImages()){
                ProductImage productImage = new ProductImage();
                productImage.setUrlImg(img);
                productImage.setProduct(productEntity);
                productImages.add(productImage);
            }
        }
        Brand brand = iBrand.getById(productDTO.getIdBrand());

        productEntity.setProductImages(productImages);
        productEntity.setBrand(brand);
        return productRepository.save(productEntity);
    }

    @Override
    public Page<ProductEntity> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }


    @Override
    public List<ProductEntity> getAllByBrand(Long idBrand) {
        Brand brand = iBrand.getById(idBrand);
        if(brand != null){
            return productRepository.findAllByBrandAndIsPublishedTrue(brand);
        }
        return null;
    }

    @Override
    public List<ProductEntity> getAllByPhoneOwner(Long idOwner) {
        return productRepository.findByPhoneOwner(idOwner);
    }

    @Override
    public List<ProductEntity> getAllByLikeName(String name, Pageable pageable) {
        return productRepository.findByNameContainingIgnoreCase(name,pageable).getContent();
    }

    @Override
    public void deleteProductByid(Long id) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        productRepository.delete(product);
    }

    @Override
    public ProductEntity updateProduct(ProductDTO productDTO) {
        ProductEntity existingProduct = productRepository.findById(productDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productDTO.getId()));
        ProductEntity updatedProduct = ProductMapper.INSTANCE.updateFromDto(productDTO, existingProduct);
        return productRepository.save(updatedProduct);
    }
}
