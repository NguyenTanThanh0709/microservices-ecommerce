package com.user.userservice.service;

import com.example.commonservice.DTO.UserDTO;
import com.user.userservice.entity.UserEntity;
import com.user.userservice.reponse.UserReponseMessage;

public interface IUser {
    public UserEntity addUser(UserDTO user);
    public UserReponseMessage getByid(Long id);
    public Boolean checkUserExist(String email, String phone);
    void updateUser(Long id, String phone, String address);
    Boolean updatePassword(Long id, String passwordnew, String passwordOld);
}
