package com.spendsenseai.mapper;

import com.spendsenseai.dto.UserProfileResponse;
import com.spendsenseai.entity.User;

public class UserMapper {

    public static UserProfileResponse toProfileResponse(User user) {
        if (user == null) {
            return null;
        }
        return UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .profileImage(user.getProfileImage())
                .role(user.getRole().name())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
