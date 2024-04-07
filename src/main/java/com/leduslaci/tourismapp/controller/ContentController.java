package com.leduslaci.tourismapp.controller;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@RestController
public class ContentController {
    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }

    @GetMapping("/user")
    public String user() {
        return "user";
    }

    // TODO REMOVE BEFORE PROD
    @CrossOrigin
    @GetMapping("/test")
    public String test(@RequestParam(value = "name", defaultValue = "springboot") String name) {
        return String.format("Hello from %s", name);
    }
}
