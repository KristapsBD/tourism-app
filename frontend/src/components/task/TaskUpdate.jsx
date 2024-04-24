import {useEffect, useState} from "react";
import { tourismApi } from "../misc/TourismApi.jsx";
import {Task} from "../../models/Task.js";
import {useAuth} from "../../context/AuthContext.jsx";

export default function TaskUpdate({ taskId }) {
    const Auth = useAuth()
    const [formFields, setFormFields] = useState({
        taskText: "",
        taskAnswer: ""
    });
    const [formErrors, setFormErrors] = useState({
        errorMsg: "",
    });
    const isSubmittable =
        Object.values(formFields).every((field) => field !== "") &&
        Object.values(formErrors).every((error) => error === "");

    useEffect(() => {
        const fetchDataAndPopulateForm = async () => {
            try {
                // Ensure Auth object exists and user is available
                if (Auth && Auth.user) {
                    const response = await tourismApi.getTask(taskId, Auth.user);
                    const taskData = response.data;
                    console.log(response)
                    // Populate form fields with route data
                    setFormFields({
                        taskText: taskData.task,
                        taskAnswer: taskData.answer
                    });
                }
            } catch (error) {
                console.error('Error fetching route data:', error);
            }
        }
         fetchDataAndPopulateForm();
    }, [taskId, Auth]);
    const handleTextFieldChange = (e) => {
        const { name, value } = e.target;
        setFormFields((prev) => ({
            ...prev,
            [name]: value,
        }));
        setFormErrors((prev) => ({
            ...prev,
            errorMsg: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const task = new Task(formFields.taskText, formFields.taskAnswer)
            task.displayInfo();
            await task.updateTask(taskId, Auth.user);
        } catch (error) {
            console.error('Form submission failed:', error);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-200">
            <div className="max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl mb-4 text-center">Update Task</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="taskText" className="block mb-1">Task Text</label>
                        <textarea
                            id="taskText"
                            name="taskText"
                            value={formFields.taskText}
                            onChange={handleTextFieldChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none"
                            rows="4"
                            autoComplete="off"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="taskAnswer" className="block mb-1">Task Answer</label>
                        <input
                            type="text"
                            id="taskAnswer"
                            name="taskAnswer"
                            value={formFields.taskAnswer}
                            onChange={handleTextFieldChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none"
                            autoComplete="off"
                        />
                    </div>
                    <div className="h-6" style={{color: formErrors.errorMsg ? "red" : "transparent"}}>
                        {formErrors.errorMsg || " "}
                    </div>
                    <button
                        type="submit"
                        disabled={!isSubmittable}
                        className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none"
                    >
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
}
