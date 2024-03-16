package com.leduslaci.tourismapp;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @RequestMapping
    public String helloWorld() {
        return "Hello world from Spring Boot";
    }

    @RequestMapping("/about")
    public String about() {
        return "About secondary page";
    }
}
