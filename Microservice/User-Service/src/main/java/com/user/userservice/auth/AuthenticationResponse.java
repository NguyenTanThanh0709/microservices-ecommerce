package com.user.userservice.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.user.userservice.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    @JsonProperty("id")
    private Long id;
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;
    @JsonProperty("role")
    private Set<Role> role;
    @JsonProperty("phone")
    private String phone;
    @JsonProperty("email")
    private String email;
    @JsonProperty("address")
    private String address;

}