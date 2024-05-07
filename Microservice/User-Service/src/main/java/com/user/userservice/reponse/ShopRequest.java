package com.user.userservice.reponse;

import com.user.userservice.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShopRequest {
    private String nameShop;
    private String des;
    private Long user_id;
    private String address;
}
