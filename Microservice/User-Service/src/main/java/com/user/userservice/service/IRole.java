package com.user.userservice.service;

import com.user.userservice.entity.Role;

public interface IRole {
    Role findRoleByName(String name);
    Role addRole(String roleName);

}
