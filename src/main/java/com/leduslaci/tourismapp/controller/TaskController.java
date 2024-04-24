package com.leduslaci.tourismapp.controller;

import com.leduslaci.tourismapp.models.Task;
import com.leduslaci.tourismapp.models.Task;
import com.leduslaci.tourismapp.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
@RequestMapping(path="/task")
public class TaskController {
    @Autowired
    private TaskRepository taskRepo;

    @GetMapping("/get/{id}")
    public Task getTask(@PathVariable(name = "id") Integer id) {
        //return new Task("task 1");

        return taskRepo.findById(id).orElse(null);
    }

    @PostMapping("/{taskId}/update")
    public Task updateTask(@PathVariable(name = "taskId") Integer taskId, @RequestBody Task updatedData) {
        // Retrieve the existing task from the database
        Task existingTask = taskRepo.findById(taskId).orElse(null);

        if (existingTask != null) {
            // Update the existing task with the updated data
            // Assuming Task class has appropriate setters for the fields to be updated
            existingTask.setTask(updatedData.getTask());
            existingTask.setAnswer(updatedData.getAnswer());

            // Save the updated task to the database
            return taskRepo.save(existingTask);
        } else {
            // Handle the case where the task with the provided ID does not exist
            // You can throw an exception or return an appropriate response based on your application's logic
            // For simplicity, I'm returning null here
            return null;
        }
    }
}
