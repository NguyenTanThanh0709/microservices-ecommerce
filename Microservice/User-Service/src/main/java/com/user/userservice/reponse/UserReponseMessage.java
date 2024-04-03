package com.user.userservice.reponse;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserReponseMessage {
    private String message;
    private UserReponse data;
}
