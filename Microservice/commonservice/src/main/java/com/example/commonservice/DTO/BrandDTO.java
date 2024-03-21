package com.example.commonservice.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BrandDTO {
    private Long id;
    private String name;
    private String slug;
    private String urlBrand;
}
