
package com.product.productservice.service.impl;
import com.product.productservice.DTO.Reponse.Pagination;
import com.product.productservice.DTO.Reponse.ProductData;
import com.product.productservice.DTO.Reponse.ProductReponSingle;
import com.product.productservice.DTO.Reponse.ProductReponse;
import com.product.productservice.DTO.UPDATE.ProductDTOu;
import com.product.productservice.entity.ProductImage;
import com.product.productservice.entity.ProductSize;
import com.product.productservice.repository.ProductImageRepository;
import com.product.productservice.repository.ProductSizeRepository;
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
public  class ProductImpl implements IProduct {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private final ModelMapper mapper;
    @Autowired
    private IBrand iBrand;
    @Autowired
    private ProductImageRepository productImageRepository;
    @Autowired
    private ProductSizeRepository productSizeRepository;



    @PersistenceContext
    private EntityManager entityManager;


    public void addProductImages(ProductEntity product, List<String> imageUrls) {
        for (String imageUrl : imageUrls) {
            ProductImage productImage = new ProductImage();
            productImage.setUrlimg(imageUrl);
            productImage.setProduct(product);
            productImageRepository.save(productImage);
        }
    }

    @Override
    public void updateQuantityById(String ordersize) {
        String[] orders = ordersize.split("_");
        for (String item : orders) {
            String[] orderInfo = item.split("-");
            Long id = Long.parseLong(orderInfo[0]);
            Integer count = Integer.parseInt(orderInfo[1]);
            ProductSize productSize = productSizeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("ProductSize not found with id: " + id));
            int oldQuantity = productSize.getQuantity();
            productSize.setQuantity(oldQuantity - count);
            productSizeRepository.save(productSize);
        }
    }

    @Override
    public void update(ProductDTOu productDTOu) {
        ProductEntity product = productRepository.findById(productDTOu.getId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productDTOu.getId()));

        if (productDTOu.getName() != null && !productDTOu.getName().isEmpty()) {
            product.setName(productDTOu.getName());
        }

        if (productDTOu.getShortDescription() != null && !productDTOu.getShortDescription().isEmpty()) {
            product.setShortDescription(productDTOu.getShortDescription());
        }

        if (productDTOu.getPrice() != null && productDTOu.getPrice() > 0) {
            product.setPrice(productDTOu.getPrice());
        }

        if (productDTOu.getStockQuantity() != null && productDTOu.getStockQuantity() > 0) {
            product.setStockQuantity(productDTOu.getStockQuantity());
        }

        if (productDTOu.getCategory() != null && !productDTOu.getCategory().isEmpty()) {
            product.setCategory(productDTOu.getCategory());
        }

        if (productDTOu.getProductSize() != null && !productDTOu.getProductSize().isEmpty()) {
            List<ProductSize> productSizes = new ArrayList<>();
            for (com.example.commonservice.DTO.ProductSize p : productDTOu.getProductSize()) {
                ProductSize productSize = new ProductSize();
                productSize.setSize(p.getSize());
                productSize.setQuantity(p.getQuantity());
                productSize.setProduct(product);
                productSizes.add(productSize);
            }
            product.setProductSize(productSizes);
        }

        if (productDTOu.getColors() != null && !productDTOu.getColors().isEmpty()) {
            product.setColors(productDTOu.getColors());
        }

        productRepository.save(product);
    }


    @Override
    @Transactional
    public ProductEntity addProduct(ProductDTO productDTO,  List<MultipartFile> files, MultipartFile file) {
        ProductEntity productEntity = mapper.map(productDTO,ProductEntity.class);

        if(productDTO.getImgsurl() != null){
            List<ProductImage> productImages = new ArrayList<>();
            for(String urlimg: productDTO.getImgsurl()){
                ProductImage productImage = new ProductImage();
                productImage.setUrlimg(urlimg);
                productImage.setProduct(productEntity);
                productImages.add(productImage);
            }
            productEntity.setProductImages(productImages);
        }

        if(productDTO.getProductSize() != null){
            for(ProductSize productSize: productEntity.getProductSize()){
                productSize.setProduct(productEntity);
            }
        }

        Brand brand = iBrand.getById(productDTO.getIdBrand());
        brand.addProdcut(productEntity);
        productEntity.setBrand(brand);

        entityManager.persist(productEntity);

        return productEntity;
    }

    @Override
    public ProductReponse findAll(Pageable pageable, String name, String category,
                                  Double price_min, Double price_max,
                                  String  sort_by,String order, Integer rating_filter) {
        ProductReponse productReponse = new ProductReponse();
        productReponse.setMessage("Lấy các sản phẩm thành công");
        Pagination pagination = new Pagination();
        pagination.setPage(pageable.getPageNumber());
        pagination.setPage_size(pageable.getPageSize());
        pagination.setLimit(0);

        ProductData productData  = new ProductData();

        productData.setProducts(productRepository.findAllWithFiltersAndSorting(name,category,price_min,price_max,sort_by,order,rating_filter,pageable).getContent());
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

    @Override
    @Transactional
    public void updateStockAndSoldQuantity(String content) {
        // Split the content by "-" to get individual items

        if(content.contains("y")){
        String[] items = content.split("y");
        log.error(content);
        for (String item : items){
            // Split each item by ":" to get product ID and quantity
            String[] i = item.split("t");
            if (i.length != 2) {
                // Skip invalid items
                continue;
            }
            long id;
            long quantity;
            try {
                // Parse product ID and quantity from string to long
                id = Long.parseLong(i[0]);
                quantity = Long.parseLong(i[1]);
            } catch (NumberFormatException e) {
                // Log and skip invalid items
                log.error("Invalid ID or quantity format: " + item);
                continue;
            }
            // Update stock and sold quantity for the product
            updateStockAndSoldQuantity(id, quantity);
        }
    }
        else {
            // Split each item by ":" to get product ID and quantity
            String[] i = content.split("t");
            if (i.length != 2) {
                return;
            }
            long id;
            long quantity;
            try {
                // Parse product ID and quantity from string to long
                id = Long.parseLong(i[0]);
                quantity = Long.parseLong(i[1]);
            } catch (NumberFormatException e) {
                // Log and skip invalid items
                log.error("Invalid ID or quantity format: " + content);
                return;
            }
            // Update stock and sold quantity for the product
            updateStockAndSoldQuantity(id, quantity);
        }
    }

    @Override
    @Transactional
    public void incrementProductView(Long productId) {
        productRepository.incrementViewCount(productId);
    }

    @Override
    public void recalculateAndSetAverageRating(Long productId, int newRating) {
        // Lấy trung bình của các đánh giá hiện có
        Integer averageRating = productRepository.getFirstRatingByProductId(productId);

        // Nếu không có đánh giá nào trước đó, sử dụng đánh giá mới làm trung bình
        if (averageRating == null) {
            averageRating = (Integer) newRating;
        } else {
            // Tính toán trung bình mới với đánh giá mới
            averageRating = (averageRating + newRating) / 2;
        }

        // Cập nhật đánh giá trung bình mới cho sản phẩm
        updateRatingById_(productId, averageRating);
    }

    @Override
    public void subtractAndSetAverageRating(Long productId, int deletedRating) {
        if(deletedRating >= 4){ 
            updateRatingById_(productId, 3);
        }else {
            updateRatingById_(productId, 4);

        }
    }

    public void updateStockAndSoldQuantity(Long productId, Long quantity) {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        product.setStockQuantity(product.getStockQuantity() - quantity);
        product.setSold(product.getSold() + quantity.intValue());

        productRepository.save(product);
    }

    public ProductEntity updateRatingById_(Long id, int newRating) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        product.setRating(newRating);
        return productRepository.save(product);
    }

}
