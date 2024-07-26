package com.plannerapp.backend.controller;

import com.plannerapp.backend.dto.TaskDTO;
import com.plannerapp.backend.entity.Task;
import com.plannerapp.backend.entity.UserEntity;
import com.plannerapp.backend.repository.TaskRepository;
import com.plannerapp.backend.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private static final Logger logger = Logger.getLogger(TaskController.class.getName());

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserEntityRepository userEntityRepository;

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks(Authentication authentication) {
        if (authentication == null) {
            logger.warning("Unauthorized access attempt to get all tasks.");
            return ResponseEntity.status(401).build();
        }

        UserEntity user = getUserFromAuthentication(authentication);
        if (user == null) {
            logger.warning("User not found for authentication: " + authentication.getDetails());
            return ResponseEntity.status(401).build();
        }

        List<Task> tasks = taskRepository.findByUserEmail(user.getEmail());

        List<TaskDTO> taskDTOs = tasks.stream()
                .map(task -> new TaskDTO(task.getId(), task.getTitle(), task.getNotes(),
                        task.getPriority().name(), task.getDueDate(),
                        task.isCompleted(), task.getCategory().name(), task.getOrder()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(taskDTOs);
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody Task task, Authentication authentication) {
        if (authentication == null) {
            logger.warning("Unauthorized access attempt to create a task.");
            return ResponseEntity.status(401).build();
        }

        UserEntity user = getUserFromAuthentication(authentication);
        if (user == null) {
            logger.warning("User not found for authentication: " + authentication.getName());
            return ResponseEntity.status(401).build();
        }
        task.setUser(user);

        Integer maxOrder = taskRepository.findMaxOrderByUserId(user.getId());
        task.setOrder(maxOrder != null ? maxOrder + 1 : 0);


        Task savedTask = taskRepository.save(task);
        TaskDTO taskDTO = new TaskDTO(savedTask.getId(), savedTask.getTitle(), savedTask.getNotes(),
                savedTask.getPriority().name(), savedTask.getDueDate(),
                savedTask.isCompleted(), savedTask.getCategory().name(), savedTask.getOrder());
        return ResponseEntity.ok(taskDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id, Authentication authentication) {
        if (authentication == null) {
            logger.warning("Unauthorized access attempt to get a task by id.");
            return ResponseEntity.status(401).build();
        }

        UserEntity user = getUserFromAuthentication(authentication);
        if (user == null) {
            logger.warning("User not found for authentication: " + authentication.getName());
            return ResponseEntity.status(401).build();
        }

        Optional<Task> task = taskRepository.findByIdAndUserEmail(id, user.getEmail());
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask, Authentication authentication) {
        if (authentication == null) {
            logger.warning("Unauthorized access attempt to update a task.");
            return ResponseEntity.status(401).build();
        }

        UserEntity user = getUserFromAuthentication(authentication);
        if (user == null) {
            logger.warning("User not found for authentication: " + authentication.getName());
            return ResponseEntity.status(401).build();
        }

        Optional<Task> optionalTask = taskRepository.findByIdAndUserEmail(id, user.getEmail());
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setTitle(updatedTask.getTitle());
            task.setNotes(updatedTask.getNotes());
            task.setPriority(updatedTask.getPriority());
            task.setDueDate(updatedTask.getDueDate());
            task.setCompleted(updatedTask.isCompleted());
            task.setCategory(updatedTask.getCategory());
            taskRepository.save(task);
            return ResponseEntity.ok(task);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id, Authentication authentication) {
        if (authentication == null) {
            logger.warning("Unauthorized access attempt to delete a task.");
            return ResponseEntity.status(401).build();
        }

        UserEntity user = getUserFromAuthentication(authentication);
        if (user == null) {
            logger.warning("User not found for authentication: " + authentication.getName());
            return ResponseEntity.status(401).build();
        }

        Optional<Task> optionalTask = taskRepository.findByIdAndUserEmail(id, user.getEmail());
        if (optionalTask.isPresent()) {
            taskRepository.delete(optionalTask.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/updateTaskOrder")
    public ResponseEntity<?> updateTaskOrder(@RequestBody List<TaskDTO> taskDTOs, Authentication authentication) {
        if (authentication == null) {
            logger.warning("Unauthorized access attempt to update task order.");
            return ResponseEntity.status(401).build();
        }

        UserEntity user = getUserFromAuthentication(authentication);
        if (user == null) {
            logger.warning("User not found for authentication: " + authentication.getName());
            return ResponseEntity.status(401).build();
        }

        for (TaskDTO taskDTO : taskDTOs) {
            Optional<Task> optionalTask = taskRepository.findByIdAndUserEmail(taskDTO.getId(), user.getEmail());
            if (optionalTask.isPresent()) {
                Task task = optionalTask.get();
                task.setOrder(taskDTO.getOrder());
                taskRepository.save(task);
            }
        }

        return ResponseEntity.ok().build();
    }


    private UserEntity getUserFromAuthentication(Authentication authentication) {
        if (authentication == null) {
            return null;
        }
        DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = principal.getAttributes();
        String email = attributes.getOrDefault("email", "").toString();
        logger.info("Authenticating user: " + email);
        return userEntityRepository.findByEmail(email).orElse(null);
    }
}







/*package com.plannerapp.backend.controller;

import com.plannerapp.backend.model.Task;
import com.plannerapp.backend.model.User;
import com.plannerapp.backend.repository.TaskRepository;
import com.plannerapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(Authentication authentication) {
        User user = getUserFromAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        List<Task> tasks = taskRepository.findByUserId(user.getId());
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task, Authentication authentication) {
        User user = getUserFromAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        task.setUser(user);
        Task savedTask = taskRepository.save(task);
        return ResponseEntity.ok(savedTask);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id, Authentication authentication) {
        User user = getUserFromAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        Optional<Task> task = taskRepository.findByIdAndUserId(id, user.getId());
        if (task.isPresent()) {
            return ResponseEntity.ok(task.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask, Authentication authentication) {
        User user = getUserFromAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        Optional<Task> optionalTask = taskRepository.findByIdAndUserId(id, user.getId());
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setTitle(updatedTask.getTitle());
            task.setNotes(updatedTask.getNotes());
            task.setPriority(updatedTask.getPriority());
            task.setDueDate(updatedTask.getDueDate());
            task.setCompleted(updatedTask.isCompleted());
            task.setCategory(updatedTask.getCategory());
            taskRepository.save(task);
            return ResponseEntity.ok(task);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id, Authentication authentication) {
        User user = getUserFromAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        Optional<Task> optionalTask = taskRepository.findByIdAndUserId(id, user.getId());
        if (optionalTask.isPresent()) {
            taskRepository.delete(optionalTask.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private User getUserFromAuthentication(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username).orElse(null);
    }
}
*/















/*
import com.plannerapp.backend.model.Task;
import com.plannerapp.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;


    @GetMapping
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }
@GetMapping("/{id}")
public Task getTask(@PathVariable Long id){
        return taskRepository.findById(id).orElseThrow(()-> new RuntimeException("Task not found"));
}
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        if (task.getCategory() == null){
            task.setCategory(Task.Category.DAILY);
        }
        return taskRepository.save(task);
    }
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTitle(updatedTask.getTitle());
        task.setNotes(updatedTask.getNotes());
        task.setPriority(updatedTask.getPriority());
        task.setDueDate(updatedTask.getDueDate());
        task.setCompleted(updatedTask.isCompleted());
        task.setCategory(updatedTask.getCategory());
        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}
*/