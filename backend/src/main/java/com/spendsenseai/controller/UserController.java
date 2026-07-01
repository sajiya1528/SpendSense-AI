package com.spendsenseai.controller;

import com.spendsenseai.dto.ChangePasswordRequest;
import com.spendsenseai.dto.UpdateProfileRequest;
import com.spendsenseai.dto.UserProfileResponse;
import com.spendsenseai.security.UserDetailsImpl;
import com.spendsenseai.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "User Profile", description = "Endpoints for managing user accounts and updating passwords")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    @Operation(summary = "Get current authenticated user profile details")
    public ResponseEntity<UserProfileResponse> getUserProfile(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        UserProfileResponse response = userService.getProfile(userDetails.getId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/profile")
    @Operation(summary = "Update current user profile information")
    public ResponseEntity<UserProfileResponse> updateUserProfile(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody UpdateProfileRequest updateProfileRequest) {
        UserProfileResponse response = userService.updateProfile(userDetails.getId(), updateProfileRequest);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/change-password")
    @Operation(summary = "Change password for the current authenticated user")
    public ResponseEntity<String> changePassword(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        userService.changePassword(userDetails.getId(), changePasswordRequest);
        return ResponseEntity.ok("Password changed successfully.");
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Permanently delete the current user account")
    public ResponseEntity<String> deleteUserAccount(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        userService.deleteUser(userDetails.getId());
        return ResponseEntity.ok("User account deleted successfully.");
    }
}
