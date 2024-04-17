package com.leduslaci.tourismapp.runner;

import com.leduslaci.tourismapp.models.Location;
import com.leduslaci.tourismapp.models.Route;
import com.leduslaci.tourismapp.models.User;
import com.leduslaci.tourismapp.security.WebSecurityConfig;
import com.leduslaci.tourismapp.service.LocationService;
import com.leduslaci.tourismapp.service.RouteService;
import com.leduslaci.tourismapp.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.ArrayList;


import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserService userService;
    private final RouteService routeService;
    private final LocationService locationService;

    @Override
    public void run(String... args) {
        if (!userService.getUsers().isEmpty()) {
            return;
        }
        // Populate users
        USERS.forEach(userService::saveUser);
        Route route = new Route("Route1");
        routeService.saveRoute(route);
        // Populate locations and associate them with the route
        List<Location> savedLocations = new ArrayList<>();
        LOCATIONS.forEach(location -> {
            // Save the location
            Location savedLocation = locationService.saveLocation(location);
            // Save the location after associating it with the route
            locationService.saveLocation(savedLocation);
            savedLocations.add(savedLocation);
        });
        // Create and save the route
        route.setLocations(savedLocations);
        List<Route> routes = new ArrayList<>();
        routes.add(route);
        savedLocations.forEach(location -> {
            location.setRoutes(routes);
            locationService.saveLocation(location);
        });

        log.info("Database initialized");
    }

    private static final List<User> USERS = Arrays.asList(
            new User("admin", "admin", "Admin", "admin@mycompany.com", WebSecurityConfig.ADMIN),
            new User("user", "user", "User", "user@mycompany.com", WebSecurityConfig.USER)
    );

    private static final List<Location> LOCATIONS = Arrays.asList(
            new Location("Location 1", 56.95, 24.11),
            new Location("Location 2", 56.51, 21.02),
            new Location("Location 3", 55.87, 26.52),
            new Location("Location 4", 57.39, 21.56)
    );
}
