package com.leduslaci.tourismapp.repositories;

import com.leduslaci.tourismapp.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Integer> {
}
