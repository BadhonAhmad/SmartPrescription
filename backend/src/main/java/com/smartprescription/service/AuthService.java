package com.smartprescription.service;

import com.smartprescription.dto.LoginRequest;
import com.smartprescription.dto.LoginResponse;
import com.smartprescription.entity.User;
import com.smartprescription.repository.UserRepository;
import com.smartprescription.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Authentication Service
 * 
 * Handles user authentication operations:
 * - Login with username/password
 * - User registration
 * - Password validation
 * - JWT token generation
 */
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Authenticate user and generate JWT token
     */
    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Update login status
        user.setStatus(1);
        userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getUsername());

        return new LoginResponse(token, user.getUsername(), "Login successful");
    }

    /**
     * Register new user
     */
    public User register(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setStatus(0);
        
        return userRepository.save(user);
    }

    /**
     * Logout user
     */
    public void logout(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setStatus(0);
        userRepository.save(user);
    }
}
