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
    private IUser userimpl;


    @Autowired
    private EventProducer eventProducer;
    @GetMapping("/hello1")
    public String hello(){
        Mono<String> result = eventProducer.send(Constant.DEMO_TOPIC, "Hello");
        result.subscribe(
                value -> {
                    // Xử lý kết quả thành công (nếu cần)
                    System.out.println("Message sent successfully: " + value);
                },
                error -> {
                    // Xử lý lỗi (nếu có)
                    System.err.println("Failed to send message: " + error.getMessage());
                }
        );
        return  "check ";
    }

    @PostMapping("/")
    public ResponseEntity<UserEntity> addUser(@RequestBody UserDTO user) {
        if (user.getEmail() == null || user.getPhoneNumber() == null || user.getPassword() == null || user.getAddress() == null || user.getAddress() == null || user.getRole() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        UserEntity userEntity =  userimpl.addUser(user);
        return  new ResponseEntity<>(userEntity, HttpStatus.CREATED);
    }

}
