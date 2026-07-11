package com.sys.project.online_sales_management_system;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordGenerator {

    @Bean
    CommandLineRunner printPassword(PasswordEncoder passwordEncoder) {
        return args -> {
            System.out.println("HASH: " + passwordEncoder.encode("123456"));
        };
    }
}