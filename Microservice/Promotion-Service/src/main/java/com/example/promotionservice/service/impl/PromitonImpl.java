package com.example.promotionservice.service.impl;

import com.example.commonservice.DTO.PromotionDTO;
import com.example.promotionservice.entity.DiscountAppEntity;
import com.example.promotionservice.entity.DiscountCodeEntity;
import com.example.promotionservice.repository.DiscountAppRepository;
import com.example.promotionservice.repository.DiscountCodeRepository;
import com.example.promotionservice.service.IDiscountCode;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class PromitonImpl implements IDiscountCode {

    @Autowired
    private final ModelMapper mapper;

    @Autowired
    private DiscountAppRepository discountAppRepository;

    @Autowired
    private DiscountCodeRepository discountCodeRepository;

    @PersistenceContext
    private EntityManager entityManager;



    @Override
    @Transactional
    public List<DiscountAppEntity> addDiscount(PromotionDTO promotionDTO) {
        if(!promotionDTO.isValid()){
            return null;
        }
        DiscountCodeEntity discountCodeEntity = mapper.map(promotionDTO,DiscountCodeEntity.class);

        List<DiscountAppEntity> discountAppEntities = new ArrayList<>();
        for(Long idproduct : promotionDTO.getIdProducts()){
            DiscountAppEntity discountAppEntity = new DiscountAppEntity();
            discountAppEntity.setDiscountCode(discountCodeEntity);
            discountAppEntity.setIdProduct(idproduct);
            discountAppEntities.add(discountAppEntity);
        }

        entityManager.persist(discountCodeEntity);
        saveDiscountAppEntities(discountAppEntities);

        return  discountAppEntities;
    }
    

    // Example of batch insert using EntityManager
    @Transactional
    public void saveDiscountAppEntities(List<DiscountAppEntity> discountAppEntities) {
        int batchSize = 50; // Batch size
        int i = 0;
        for (DiscountAppEntity discountAppEntity : discountAppEntities) {
            entityManager.persist(discountAppEntity);
            i++;
            if (i % batchSize == 0) {
                entityManager.flush();
                entityManager.clear();
            }
        }
    }

    @Override
    public List<DiscountAppEntity> findByProductId(Long idProduct) {
        return discountAppRepository.findByProductId(idProduct);
    }

    @Override
    public List<DiscountAppEntity> findByProductIdBetweenDate(Long idProduct) {
        // Lấy danh sách các DiscountAppEntity theo IdProduct
        List<DiscountAppEntity> list = discountAppRepository.findByProductId(idProduct);

        // Lấy ngày hiện tại
        ZonedDateTime currentDate = ZonedDateTime.now();

        // Khởi tạo danh sách kết quả
        List<DiscountAppEntity> result = new ArrayList<>();

        // Lọc các DiscountAppEntity theo ngày hiện tại nằm trong khoảng startDate và endDate
        for (DiscountAppEntity dis : list) {
            DiscountCodeEntity discountCode = dis.getDiscountCode();
            if (discountCode != null &&
                    discountCode.getStartDate().isBefore(currentDate) &&
                    discountCode.getEndDate().isAfter(currentDate)) {
                result.add(dis);
            }
        }

        return result;
    }

    @Transactional
    @Override
    public void updateDiscountCodeStatus(Long id, boolean isActive) {
        discountCodeRepository.updateDiscountCodeStatus(id, isActive);
    }
}
