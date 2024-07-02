package com.plannerapp.backend.service.impl;


import com.plannerapp.backend.entity.UserEntity;
import com.plannerapp.backend.repository.UserEntityRepository;
import com.plannerapp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserEntityRepository userEntityRepository;

    @Override
    public Optional<UserEntity> findByEmail(String email) {
        return userEntityRepository.findByEmail(email);
    }

    @Override
    public void save(UserEntity user) {
        userEntityRepository.save(user);
    }
}