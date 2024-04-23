package com.leduslaci.tourismapp.repositories;

import com.leduslaci.tourismapp.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
}
