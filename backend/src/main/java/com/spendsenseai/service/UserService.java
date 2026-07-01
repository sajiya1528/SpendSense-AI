package com.spendsenseai.service;

import com.spendsenseai.dto.ChangePasswordRequest;
import com.spendsenseai.dto.UpdateProfileRequest;
import com.spendsenseai.dto.UserProfileResponse;
import com.spendsenseai.entity.User;

public interface UserService {
    UserProfileResponse getProfile(Long userId);
    UserProfileResponse updateProfile(Long userId, UpdateProfileRequest request);
    void changePassword(Long userId, ChangePasswordRequest request);
    void deleteUser(Long userId);
    User getUserById(Long userId);
}
