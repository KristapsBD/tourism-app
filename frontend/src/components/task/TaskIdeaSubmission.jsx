import { useState } from "react";
import { tourismApi } from "../misc/TourismApi.jsx";

export default function TaskIdeaSubmission() {
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
            const response = await tourismApi.submitTaskIdea(formFields);
            console.log("Task idea submitted successfully:", response);
            setFormFields({
                taskText: "",
                taskAnswer: ""
            });
        } catch (error) {
            console.error('Form submission failed:', error);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-200">
            <div className="max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl mb-4 text-center">Submit Task Idea</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="taskText" className="block mb-1">Task Text</label>
                        <textarea
                            id="taskText"
                            name="taskText"
                            value={formFields.taskText}
                            onChange={handleTextFieldChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none"
                            autoComplete="off"
                            rows="4"
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
                        Submit Task Idea
                    </button>
                </form>
            </div>
        </div>
    );
}
