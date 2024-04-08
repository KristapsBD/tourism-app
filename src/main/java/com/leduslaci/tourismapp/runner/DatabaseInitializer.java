package com.leduslaci.tourismapp.runner;

import com.leduslaci.tourismapp.models.Location;
import com.leduslaci.tourismapp.models.Route;
import com.leduslaci.tourismapp.models.User;
import com.leduslaci.tourismapp.security.WebSecurityConfig;
import com.leduslaci.tourismapp.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserService userService;

    @Override
    public void run(String... args) {
        if (!userService.getUsers().isEmpty()) {
            return;
        }
        // Populate users
        USERS.forEach(userService::saveUser);

        // Populate routes
        ROUTES.forEach(route -> {
            // Populate locations for each route
            route.setLocations(LOCATIONS);
        });

        log.info("Database initialized");
    }

    private static final List<User> USERS = Arrays.asList(
            new User("admin", "admin", "Admin", "admin@mycompany.com", WebSecurityConfig.ADMIN),
            new User("user", "user", "User", "user@mycompany.com", WebSecurityConfig.USER)
    );
    private static final List<Route> ROUTES = Arrays.asList(
            new Route("Route1"),
            new Route("Route 2")
    );
    private static final List<Location> LOCATIONS = Arrays.asList(
            new Location("Location 1", 56.95 , 24.11),
            new Location("Location 2", 56.51, 21.02),
            new Location("Location 3", 55.87, 26.52),
            new Location("Location 4", 57.39, 21.56)
    );
}
