package com.spendsenseai.service;

import com.spendsenseai.dto.AuthResponse;
import com.spendsenseai.dto.LoginRequest;
import com.spendsenseai.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
