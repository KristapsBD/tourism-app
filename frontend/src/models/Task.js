import {tourismApi} from "../components/misc/TourismApi.jsx";


export class Task {
    constructor (task, answer) {
        this.task = task;
        this.answer = answer;

    }

    displayInfo() {
        console.log(this);
    }
    //ID ir konkreatas lokacijas id
    //TODO
    //Jaizdoma, ka un kur id tiks ieguts un padots
    async createNew(user, id) {
        try {
            // Prepare route data to send to the API
            const taskData = {
                task: this.task,
                answer: this.answer
            };



            // Call the API to create the task
            const response = await tourismApi.createTask(taskData, user, id);

            // Log the response
            console.log("Task created successfully:", response.data);
        } catch (error) {
            console.error("Error creating task:", error);
            throw error;
        }
    }

    async updateTask(taskId, user) {
        try {
            // Prepare route data to send to the API
            const updatedTaskData = {
                task: this.task,
                answer: this.answer
            };

            // Call the API to update the route
            const response = await tourismApi.updateTask(taskId, updatedTaskData, user);

            // Log the response
            console.log("Task updated successfully:", response.data);
        } catch (error) {
            console.error("Error creating task:", error);
            throw error;
        }
    }
}