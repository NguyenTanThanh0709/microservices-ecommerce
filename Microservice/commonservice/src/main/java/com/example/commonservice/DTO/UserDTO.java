package com.example.commonservice.DTO;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String email;
    private String phoneNumber;
    private String password;
    private String address;
    private String role; // customer || seller
}
