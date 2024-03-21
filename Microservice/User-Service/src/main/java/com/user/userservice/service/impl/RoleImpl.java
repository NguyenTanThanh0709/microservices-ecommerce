package com.user.userservice.service.impl;

import com.user.userservice.entity.Role;
import com.user.userservice.repository.RoleRepository;
import com.user.userservice.service.IRole;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RoleImpl  implements IRole {
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public Role findRoleByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public Role addRole(String roleName) {
        Role existingRole = findRoleByName(roleName);
        if (existingRole != null) {
            return existingRole;
        }

        Role newRole = Role.builder()
                .name(roleName)
                .build();
        return roleRepository.save(newRole);
    }
}
