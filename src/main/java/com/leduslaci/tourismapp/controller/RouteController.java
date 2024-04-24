package com.leduslaci.tourismapp.controller;


import com.leduslaci.tourismapp.models.Location;
import com.leduslaci.tourismapp.models.Route;
import com.leduslaci.tourismapp.repositories.RouteRepository;

import com.leduslaci.tourismapp.service.LocationService;
import com.leduslaci.tourismapp.service.RouteService;
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
        //return new Route("route 1");

        return routeRepo.findById(id).orElse(null);
    }
    @PostMapping("/create")
    public Route createRoute(@RequestBody Route routeData) {
        return routeRepo.save(routeData);
    }
    @PostMapping("/update/{routeId}")
    public Route updateRoute(@PathVariable(name = "routeId") Integer routeId, @RequestBody Route updatedData) {
        // Retrieve the existing route from the database
        Route existingRoute = routeRepo.findById(routeId).orElse(null);

        if (existingRoute != null) {
            // Update the existing route with the updated data
            // Assuming Route class has appropriate setters for the fields to be updated
            existingRoute.setName(updatedData.getName());
            existingRoute.setAbout(updatedData.getAbout());
            existingRoute.setLocations(updatedData.getLocations());

            // Save the updated route to the database
            return routeRepo.save(existingRoute);
        } else {
            // Handle the case where the route with the provided ID does not exist
            // You can throw an exception or return an appropriate response based on your application's logic
            // For simplicity, I'm returning null here
            return null;
        }
    }
}
