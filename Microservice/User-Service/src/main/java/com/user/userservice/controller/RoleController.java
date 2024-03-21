package com.user.userservice.controller;

import com.user.userservice.entity.Role;
import com.user.userservice.service.IRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class RoleController {

    @Autowired
    private IRole roleService;

    @PostMapping("/add-roles")
    public ResponseEntity<Role> addRole(@RequestParam String roleName) {
        Role newRole = roleService.addRole(roleName);
        return new ResponseEntity<>(newRole, HttpStatus.CREATED);
    }
}
