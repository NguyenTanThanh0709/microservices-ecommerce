package com.user.userservice.service.impl;


import com.example.commonservice.DTO.UserDTO;
import com.user.userservice.entity.Role;
import com.user.userservice.entity.UserEntity;
import com.user.userservice.reponse.UserReponse;
import com.user.userservice.reponse.UserReponseMessage;
import com.user.userservice.repository.UserRepository;
import com.user.userservice.service.IRole;
import com.user.userservice.service.IUser;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserImpl implements IUser{

    @Autowired
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserEntity addUser(UserDTO user) {
        return null;
    }

    @Override
    public UserReponseMessage getByid(Long id) {
        Optional<UserEntity> user = userRepository.findById(id);
        if(user.isPresent()){
            UserEntity userEntity = user.get();
            UserReponse userReponse = new UserReponse();
            userReponse.set_id(userEntity.getId().toString());
            userReponse.setPhone(userEntity.getPhoneNumber());
            userReponse.setEmail(userEntity.getEmail());
            userReponse.setAddress(userEntity.getAddress());
            Set<Role> userRoles = userEntity.getRoles();

// Khởi tạo mảng roles với độ dài bằng với số lượng phần tử trong userRoles
            String[] roles = new String[userRoles.size()];

// Sao chép các phần tử từ tập hợp userRoles vào mảng roles
            int index = 0;
            for (Role role : userRoles) {
                roles[index++] = role.getName();
            }
            userReponse.setRoles(roles);
            UserReponseMessage u = new UserReponseMessage(
                    "Lấy thành coong",
                    userReponse
            );
            return u;
        }

        UserReponseMessage u1 = new UserReponseMessage(
                "Lấy thành không thành công",
                null
        );

        return u1;
    }

    @Override
    public Boolean checkUserExist(String email, String phone) {
        if(userRepository.existsByEmail(email) || userRepository.existsByPhoneNumber(phone)){
            return true;
        }
        return  false;
    }

    @Override
    @Transactional
    public void updateUser(Long id, String phone, String address) {
        userRepository.updateUserContactInfo(id,phone,address);
    }

    @Override
    @Transactional
    public Boolean updatePassword(Long id, String passwordnew, String passwordOld) {
        Optional<UserEntity> user = userRepository.findById(id);
        if(user.isPresent()){
            UserEntity userEntity = user.get();
            if(passwordEncoder.matches(passwordOld, userEntity.getPassword())) {
                userRepository.updatePasswordById(id, passwordEncoder.encode(passwordnew));
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
