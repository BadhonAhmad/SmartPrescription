package com.smartprescription.controller;

import com.smartprescription.dto.ApiResponse;
import com.smartprescription.dto.LoginRequest;
import com.smartprescription.dto.LoginResponse;
import com.smartprescription.entity.User;
import com.smartprescription.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication Controller
 * 
 * REST endpoints for authentication:
 * POST /auth/login - User login
 * POST /auth/register - User registration
 * POST /auth/logout - User logout
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Login endpoint
     * 
     * Request: { "username": "AbuNoyim", "password": "12345678" }
     * Response: { "token": "jwt_token", "username": "AbuNoyim", "message": "Login successful" }
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = authService.login(loginRequest);
            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Login failed: " + e.getMessage()));
        }
    }

    /**
     * Register endpoint
     * 
     * Request: { "username": "newuser", "password": "password123" }
     * Response: User object
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@RequestBody User user) {
        try {
            User newUser = authService.register(user);
            return ResponseEntity.ok(ApiResponse.success("User registered successfully", newUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Registration failed: " + e.getMessage()));
        }
    }

    /**
     * Logout endpoint
     * 
     * Request: Username in path parameter
     * Response: Success message
     */
    @PostMapping("/logout/{username}")
    public ResponseEntity<ApiResponse<String>> logout(@PathVariable String username) {
        try {
            authService.logout(username);
            return ResponseEntity.ok(ApiResponse.success("Logout successful", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Logout failed: " + e.getMessage()));
        }
    }
}
