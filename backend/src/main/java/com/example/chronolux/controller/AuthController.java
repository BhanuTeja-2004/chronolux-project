package com.example.chronolux.controller;

import com.example.chronolux.model.User;
import com.example.chronolux.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository repo;

    public AuthController(UserRepository repo) {
        this.repo = repo;
    }

    // REGISTER
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        repo.save(user);
        return "User Registered Successfully";
    }

    // LOGIN
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        Optional<User> existingUser = repo.findByEmail(user.getEmail());

        if(existingUser.isPresent() &&
                existingUser.get().getPassword().equals(user.getPassword())) {
            return "Login Successful";
        }

        return "Invalid Credentials";
    }
}