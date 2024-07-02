package com.plannerapp.backend.service;


import com.plannerapp.backend.entity.UserEntity;

import java.util.Optional;

public interface UserService {

    Optional<UserEntity> findByEmail(String email);

    void save(UserEntity user);
}