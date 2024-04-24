package com.leduslaci.tourismapp.controller;

import com.leduslaci.tourismapp.models.Location;
import com.leduslaci.tourismapp.models.Task;


import com.leduslaci.tourismapp.repositories.LocationRepository;
import com.leduslaci.tourismapp.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;


@SpringBootApplication
@RestController
@RequestMapping(path="/location")
public class LocationController {
    @Autowired
    private TaskRepository taskRepo;
    @Autowired
    private LocationRepository locationRepo;

    @PostMapping("/{id}/task/create")
    public Location createTask(@RequestBody Task taskData,@PathVariable(name = "id") Integer id){
        //Location model vajag pielikt "TaskID kolonu" ar kuru sasaistit konkreto task
        //Tad nosaivot tasku
        //Pievienot tasku lokacijai un no saglabat
        //Izdomat ko darit ja jau ir task lokacijai
        Task savedTask = taskRepo.save(taskData);
        Location location = locationRepo.findById(id).orElse(null);
        if (location != null) {

            location.setTask(savedTask);

            location = locationRepo.save(location);
            savedTask.setLocation(location);
            taskRepo.save(savedTask);
        }

        return location;

    }
}
