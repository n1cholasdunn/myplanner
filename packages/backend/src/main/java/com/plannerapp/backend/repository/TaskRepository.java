package com.plannerapp.backend.repository;
import com.plannerapp.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserEmail(String email);
    Optional<Task> findByIdAndUserEmail(Long id, String email);

    @Query("SELECT COALESCE(MAX(t.order), 0) FROM Task t WHERE t.user.id = :userId")
    Integer findMaxOrderByUserId(@Param("userId") Long userId);

}