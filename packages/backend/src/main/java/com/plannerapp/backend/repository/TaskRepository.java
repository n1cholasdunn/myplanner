package com.plannerapp.backend.repository;
import com.plannerapp.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserEmail(String email);
    Optional<Task> findByIdAndUserEmail(Long id, String email);
}