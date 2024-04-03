package com.user.userservice.controller;


import com.example.commonservice.DTO.UserDTO;
import com.example.commonservice.utils.Constant;
import com.user.userservice.entity.Role;
import com.user.userservice.entity.UserEntity;
import com.user.userservice.event.EventProducer;
import com.user.userservice.reponse.InfoUpdate;
import com.user.userservice.reponse.UpdatePassword;
import com.user.userservice.reponse.UserReponseMessage;
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
    private IUser iUser;

    @Autowired
    private EventProducer eventProducer;

    @GetMapping("/get-id")
    public ResponseEntity<UserReponseMessage> getUserById(@RequestParam Long iduser) {
        UserReponseMessage userResponseMessage = iUser.getByid(iduser);
        if (userResponseMessage != null && userResponseMessage.getData() != null) {
            return ResponseEntity.ok(userResponseMessage);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PatchMapping("/update-user/{id}")
    public  ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody InfoUpdate infoUpdate){
        iUser.updateUser(id,infoUpdate.getPhoneNumber(),infoUpdate.getAddress());
        return ResponseEntity.ok("Update thành công");
    }

    @PatchMapping("/{id}/update-password")
    public ResponseEntity<String> updatePassword(@PathVariable Long id, @RequestBody UpdatePassword updatePassword) {
        boolean updated = iUser.updatePassword(id, updatePassword.getNew_password(), updatePassword.getPassword());
        if (updated) {
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to update password. Old password is incorrect.");
        }
    }
}
