package com.leduslaci.tourismapp.controller;


import com.leduslaci.tourismapp.models.Route;
import com.leduslaci.tourismapp.repositories.RouteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@SpringBootApplication
@RestController
@RequestMapping(path="/route")
public class RouteController {
    @Autowired
    private RouteRepository routeRepo;

    @GetMapping("/get/{id}")
    public Route getRoute(@PathVariable(name = "id") Integer id) {
        return new Route("route 1");
        //return routeRepo.findById(id).orElse(null);
    }

}
