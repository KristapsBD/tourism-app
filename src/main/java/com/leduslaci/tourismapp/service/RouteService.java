package com.leduslaci.tourismapp.service;

import com.leduslaci.tourismapp.models.Route;
import com.leduslaci.tourismapp.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RouteService {

    private final RouteRepository routeRepository;

    @Autowired
    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    @Transactional // Ensure the method is executed within a transaction
    public Route saveRoute(Route route) {
        // Make sure all associated locations are managed
        return this.routeRepository.save(route);
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }
}
