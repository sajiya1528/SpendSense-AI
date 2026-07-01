package com.spendsenseai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponse {
    private Long id;
    private String email;
    private String fullName;
    private String phone;
    private String profileImage;
    private String role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
