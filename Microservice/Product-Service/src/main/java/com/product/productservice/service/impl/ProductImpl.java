
package com.product.productservice.service.impl;
import com.product.productservice.DTO.Reponse.Pagination;
import com.product.productservice.DTO.Reponse.ProductData;
import com.product.productservice.DTO.Reponse.ProductReponSingle;
import com.product.productservice.DTO.Reponse.ProductReponse;
import com.product.productservice.entity.ProductImage;
import com.product.productservice.entity.ProductSize;
import com.product.productservice.utils.ProductMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.commonservice.DTO.ProductDTO;
import com.product.productservice.entity.Brand;
import com.product.productservice.entity.ProductEntity;
import com.product.productservice.repository.ProductRepository;
import com.product.productservice.service.IBrand;
import com.product.productservice.service.IProduct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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



    @PersistenceContext
    private EntityManager entityManager;


    @Override
    @Transactional
    public ProductEntity addProduct(ProductDTO productDTO,  List<MultipartFile> files, MultipartFile file) {
        ProductEntity productEntity = mapper.map(productDTO,ProductEntity.class);

        List<ProductImage> productImages = new ArrayList<>();
        for(String urlimg: productDTO.getImgsurl()){
            ProductImage productImage = new ProductImage();
            productImage.setUrlimg(urlimg);
            productImage.setProduct(productEntity);
            productImages.add(productImage);
        }
        productEntity.setProductImages(productImages);

        for(ProductSize productSize: productEntity.getProductSize()){
            productSize.setProduct(productEntity);
        }

        Brand brand = iBrand.getById(productDTO.getIdBrand());
        brand.addProdcut(productEntity);
        productEntity.setBrand(brand);

        entityManager.persist(productEntity);

        return productEntity;
    }

    @Override
    public ProductReponse findAll(Pageable pageable, String name, String category,
                                  int price_min, int price_max) {
        ProductReponse productReponse = new ProductReponse();
        productReponse.setMessage("Lấy các sản phẩm thành công");
        Pagination pagination = new Pagination();
        pagination.setPage(pagination.getPage());
        pagination.setPage_size(pagination.getPage_size());
        pagination.setLimit(pagination.getLimit());

        ProductData productData  = new ProductData();



        if(name != null && !name.isEmpty() && category != null && !category.isEmpty() ){
            productData.setProducts(productRepository.findByNameContainingIgnoreCaseAndCategoryContainingIgnoreCase(name,category,pageable).getContent());
            productData.setPagination(pagination);
            productReponse.setData(productData);
            return  productReponse;
        }

        if(category != null && !category.isEmpty() ){
            productData.setProducts(productRepository.findByCategoryContainingIgnoreCase(category,pageable).getContent());
            productData.setPagination(pagination);
            productReponse.setData(productData);
            return  productReponse;
        }

        if(name != null && !name.isEmpty()){
            productData.setProducts(getAllByLikeName(name,pageable));
            productData.setPagination(pagination);
            productReponse.setData(productData);
            return  productReponse;
        }

        productData.setProducts(productRepository.findAll(pageable).getContent());
        productData.setPagination(pagination);
        productReponse.setData(productData);
        return productReponse;
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

    @Override
    public ProductReponSingle findOneById(Long id) {
        Optional<ProductEntity> product = productRepository.findById(id);
        if(product.isPresent()){
            ProductReponSingle productReponSingle = new ProductReponSingle(
                    "Lấy sản phẩm thành công",
                    product.get()
            );
            return  productReponSingle;

        }else {
            ProductReponSingle productReponSingle = new ProductReponSingle(
                    "Lấy sản phẩm không thành công",
                    null
            );
            return  productReponSingle;
        }
    }

    @Override
    public ProductEntity findOneByIdone(Long id) {
        Optional<ProductEntity> product = productRepository.findById(id);
        if(product.isPresent()){
            return  product.get();
        }else {
            return  null;
        }
    }
}
