package com.user.userservice.reponse;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserReponse {
    private String _id;
    private String[] roles;
    private String email;
    private String address;
    private String phone;
}
