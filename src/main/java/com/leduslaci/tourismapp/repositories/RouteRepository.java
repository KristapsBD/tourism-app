package com.leduslaci.tourismapp.repositories;


import org.springframework.data.jpa.repository.JpaRepository;


import com.leduslaci.tourismapp.models.Route;
public interface RouteRepository extends JpaRepository<Route, Integer> {

}
