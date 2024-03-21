package com.user.userservice.service.impl;


import com.example.commonservice.DTO.UserDTO;
import com.user.userservice.entity.Role;
import com.user.userservice.entity.UserEntity;
import com.user.userservice.repository.UserRepository;
import com.user.userservice.service.IRole;
import com.user.userservice.service.IUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserImpl implements IUser {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private final ModelMapper mapper;
    @Autowired
    private IRole iRole;

    @Override
    public UserEntity addUser(UserDTO user) {
        Role role = iRole.findRoleByName(user.getRole());
        UserEntity userEntity = mapper.map(user, UserEntity.class);
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        userEntity.setRoles(roles);
        return userRepository.save(userEntity);
    }
}
