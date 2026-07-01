package com.spendsenseai.service.impl;

import com.spendsenseai.dto.ChangePasswordRequest;
import com.spendsenseai.dto.UpdateProfileRequest;
import com.spendsenseai.dto.UserProfileResponse;
import com.spendsenseai.entity.User;
import com.spendsenseai.exception.BadRequestException;
import com.spendsenseai.exception.ResourceNotFoundException;
import com.spendsenseai.mapper.UserMapper;
import com.spendsenseai.repository.UserRepository;
import com.spendsenseai.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfileResponse getProfile(Long userId) {
        User user = getUserById(userId);
        return UserMapper.toProfileResponse(user);
    }

    @Override
    @Transactional
    public UserProfileResponse updateProfile(Long userId, UpdateProfileRequest request) {
        User user = getUserById(userId);
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        if (request.getProfileImage() != null) {
            user.setProfileImage(request.getProfileImage());
        }
        User updatedUser = userRepository.save(user);
        return UserMapper.toProfileResponse(updatedUser);
    }

    @Override
    @Transactional
    public void changePassword(Long userId, ChangePasswordRequest request) {
        User user = getUserById(userId);
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new BadRequestException("Current password does not match!");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        userRepository.deleteById(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }
}
