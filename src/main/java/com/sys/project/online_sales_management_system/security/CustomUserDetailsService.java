package com.sys.project.online_sales_management_system.security;

import com.sys.project.online_sales_management_system.entity.User;
import com.sys.project.online_sales_management_system.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username)
        .orElseThrow(() -> {
            System.out.println("USER IS NOT FOUND: " + username);
            return new UsernameNotFoundException("User not found");
        });

System.out.println("USER IS FOUND: " + user.getUsername());
System.out.println("ROLE: " + user.getRole());

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }
}