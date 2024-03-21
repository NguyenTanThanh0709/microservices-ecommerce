package com.product.productservice.utils;

import com.example.commonservice.DTO.ProductDTO;
import com.product.productservice.entity.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mapping(target = "id", ignore = true) // Ignore mapping for id field
    ProductEntity updateFromDto(ProductDTO source, ProductEntity target);
}
