package com.example.commonservice.DTO;

import lombok.*;

import java.time.ZonedDateTime;
import java.util.List;
import javax.persistence.ElementCollection;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PromotionDTO {
    private Long id;
    private String name;
    private String description;
    private String code; // Mã giảm giá
    private Boolean isActive;
    private ZonedDateTime startDate;
    private ZonedDateTime endDate;
    private double discountValue; // Giá trị ưu đãi
    @ElementCollection
    private List<Long> idProducts;

    public boolean isValid() {
        return
                name != null && !name.isEmpty() &&
                description != null && !description.isEmpty() &&
                code != null && !code.isEmpty() &&
                isActive != null &&
                startDate != null &&
                endDate != null &&
                discountValue != 0 &&
                        idProducts != null && !idProducts.isEmpty();
    }


}
