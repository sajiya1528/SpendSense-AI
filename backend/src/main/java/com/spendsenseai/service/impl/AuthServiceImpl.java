package com.spendsenseai.service.impl;

import com.spendsenseai.dto.AuthResponse;
import com.spendsenseai.dto.LoginRequest;
import com.spendsenseai.dto.RegisterRequest;
import com.spendsenseai.entity.Role;
import com.spendsenseai.entity.User;
import com.spendsenseai.exception.BadRequestException;
import com.spendsenseai.repository.UserRepository;
import com.spendsenseai.security.JwtUtils;
import com.spendsenseai.security.UserDetailsImpl;
import com.spendsenseai.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Error: Email is already in use!");
        }

        Role userRole = Role.ROLE_USER;
        if (request.getRole() != null) {
            try {
                userRole = Role.valueOf("ROLE_" + request.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Error: Invalid Role specified!");
            }
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(userRole)
                .build();

        userRepository.save(user);

        // Authenticate the registered user automatically to generate a token
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new AuthResponse(
                jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                userDetails.getFullName(),
                userRole.name()
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(item -> item.getAuthority())
                .orElse("ROLE_USER");

        return new AuthResponse(
                jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                userDetails.getFullName(),
                role
        );
    }
}
