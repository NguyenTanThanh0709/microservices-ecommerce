package com.user.userservice.reponse;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InfoUpdate {
    private String phoneNumber;
    private String address;
}
