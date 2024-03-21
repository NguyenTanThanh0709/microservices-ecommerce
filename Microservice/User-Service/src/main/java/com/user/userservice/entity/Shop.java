package com.user.userservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imgShop;
    private String nameShop;
    private String des;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
