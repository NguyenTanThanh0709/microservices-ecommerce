package com.user.userservice.controller;


import com.example.commonservice.DTO.UserDTO;
import com.example.commonservice.utils.Constant;
import com.user.userservice.entity.Role;
import com.user.userservice.entity.UserEntity;
import com.user.userservice.event.EventProducer;
import com.user.userservice.service.IRole;
import com.user.userservice.service.IUser;
import com.user.userservice.service.impl.UserImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {


    @Autowired
    private EventProducer eventProducer;


    @GetMapping("/okok")
    public  String ok(){
        return "ok";
    }

}
