package com.user.userservice.service;

import com.example.commonservice.DTO.UserDTO;
import com.user.userservice.entity.UserEntity;

public interface IUser {
    public UserEntity addUser(UserDTO user);
}
