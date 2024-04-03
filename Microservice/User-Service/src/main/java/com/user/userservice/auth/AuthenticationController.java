package com.user.userservice.auth;


import com.example.commonservice.DTO.LoginDTO;
import com.example.commonservice.DTO.UserDTO;
import com.user.userservice.service.IUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.security.auth.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @Autowired
    private IUser iUser;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO request) {
        if (iUser.checkUserExist(request.getEmail(), request.getPhoneNumber())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Người dùng với thông tin này đã tồn tại");
        }
        return ResponseEntity.ok(service.register(request));
    }


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody LoginDTO request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request, response);
    }
}