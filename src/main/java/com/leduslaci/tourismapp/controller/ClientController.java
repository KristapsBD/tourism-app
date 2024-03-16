package com.leduslaci.tourismapp.controller;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@RestController
public class ClientController {
    @GetMapping("/")
    public String index() {
        return "index";
    }

    @CrossOrigin
    @GetMapping("/test")
    public String test(@RequestParam(value = "name", defaultValue = "springboot") String name) {
        return String.format("Hello from %s", name);
    }
}
