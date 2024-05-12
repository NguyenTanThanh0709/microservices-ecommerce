package com.example.commonservice.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.HashMap;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDTO {

    private String phoneNumber;
    private String address;
    private String statusDelivery;
    private String statusOrder;
    private Double totalMoney;
    private Long idSeller;


    private HashMap<Long, Integer> productIdsQuantitys;
    private HashMap<Long, Double> productIdsPrices;
    private HashMap<Long, String> productIdsNotes;

    public boolean isValid() {
        return isPhoneNumberValid(this.phoneNumber)
                && isAddressValid(this.address)
                && isStatusValid(this.statusDelivery)
                && isStatusValid(this.statusOrder)
                && isProductIdsQuantitysValid(this.productIdsQuantitys)
                && isProductIdsQPricesValid(this.productIdsPrices);
    }

    private boolean isPhoneNumberValid(String phoneNumber) {
        return phoneNumber != null && !phoneNumber.isBlank();
    }

    private boolean isAddressValid(String address) {
        return address != null && !address.isBlank();
    }

    private boolean isStatusValid(String status) {
        return status != null && !status.isBlank();
    }

    private boolean isNoteValid(String note) {
        return true; // Ghi chú có thể là null hoặc rỗng
    }

    private boolean isProductIdsQuantitysValid(HashMap<Long, Integer> productIdsQuantitys) {
        return productIdsQuantitys != null && !productIdsQuantitys.isEmpty();
    }
    private boolean isProductIdsQPricesValid(HashMap<Long, Double> productIdsQuantitys) {
        return productIdsQuantitys != null && !productIdsQuantitys.isEmpty();
    }
    private boolean isProductIdsQNodeValid(HashMap<Long, String> productIdsQuantitys) {
        return productIdsQuantitys != null && !productIdsQuantitys.isEmpty();
    }


}
