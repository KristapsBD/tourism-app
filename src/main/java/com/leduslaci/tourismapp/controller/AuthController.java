package com.leduslaci.tourismapp.controller;

import com.leduslaci.tourismapp.models.Route;
import com.leduslaci.tourismapp.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import com.leduslaci.tourismapp.repositories.CustomUserRepository;

@RestController
@RequestMapping(path = "/auth")
public class PageController {

    @Autowired
    private CustomUserRepository CustomUserRepo;


    @GetMapping("/login")
    public String handleLogin(String email, String password) {
        return CustomUserRepo.findByEmail(email);
        return null;
    }

//    @GetMapping("/auth/login")
//    @CrossOrigin(origins = "http://localhost:3000")
//    public String handleLogin() {
//        return "custom_login";
//    }
}
