package com.sys.project.online_sales_management_system.controller;

import com.sys.project.online_sales_management_system.dto.LoginRequest;
import com.sys.project.online_sales_management_system.dto.LoginResponse;
import com.sys.project.online_sales_management_system.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import com.sys.project.online_sales_management_system.dto.RegisterRequest;
import com.sys.project.online_sales_management_system.entity.User;
import com.sys.project.online_sales_management_system.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
private final PasswordEncoder passwordEncoder;

    public AuthenticationController(
        AuthenticationManager authenticationManager,
        JwtService jwtService,
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
) {
    this.authenticationManager = authenticationManager;
    this.jwtService = jwtService;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
}

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(request.getUsername(), user.getRole());

        return new LoginResponse(token, user.getRole());
    }

    @PostMapping("/register")
public String register(@RequestBody RegisterRequest request) {

    if (userRepository.findByUsername(request.getUsername()).isPresent()) {
        return "Username already exists";
    }

    User user = new User();
    user.setUsername(request.getUsername());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole("USER");

    userRepository.save(user);

    return "User registered successfully";
}
}