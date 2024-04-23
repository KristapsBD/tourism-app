import { useState } from "react";
import { tourismApi } from "../misc/TourismApi.jsx";

export default function TaskAnswer() {
    const [formFields, setFormFields] = useState({
        answerText: "",
        answerPicture: null,
        answerFile: null,
        submissionType: "text"
    });
    const [formErrors, setFormErrors] = useState({
        errorMsg: "",
    });
    const isSubmittable = formFields.submissionType === "text" ? formFields.answerText.trim() !== "" :
        formFields.submissionType === "photo" ? formFields.answerPicture !== null :
            formFields.submissionType === "file" ? formFields.answerFile !== null :
                false;

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

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        setFormFields((prev) => ({
            ...prev,
            answerPicture: file
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormFields((prev) => ({
            ...prev,
            answerFile: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (formFields.submissionType === "text") {
                formData.append("answerText", formFields.answerText);
            } else if (formFields.submissionType === "photo") {
                formData.append("answerPicture", formFields.answerPicture);
            } else if (formFields.submissionType === "file") {
                formData.append("answerFile", formFields.answerFile);
            }
            const response = await tourismApi.submitAnswer(formData);
            console.log("Answer submitted successfully:", response);
            setFormFields({
                answerText: "",
                answerPicture: null,
                answerFile: null,
                submissionType: "text"
            });
        } catch (error) {
            console.error('Form submission failed:', error);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-200">
            <div className="max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl mb-4 text-center">Submit Answer</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Submission Type</label>
                        <select
                            name="submissionType"
                            value={formFields.submissionType}
                            onChange={handleTextFieldChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        >
                            <option value="text">Text Input</option>
                            <option value="photo">Photo Upload</option>
                            <option value="file">File Upload</option>
                        </select>
                    </div>
                    {formFields.submissionType === "text" && (
                        <div className="mb-4">
                            <label htmlFor="answerText" className="block mb-1">Answer Text</label>
                            <textarea
                                id="answerText"
                                name="answerText"
                                value={formFields.answerText}
                                onChange={handleTextFieldChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                autoComplete="off"
                                rows="4"
                            ></textarea>
                        </div>
                    )}
                    {formFields.submissionType === "photo" && (
                        <div className="mb-4">
                            <label htmlFor="answerPicture" className="block mb-1">Answer Picture</label>
                            <input
                                type="file"
                                id="answerPicture"
                                name="answerPicture"
                                accept="image/*"
                                onChange={handlePictureChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                            />
                        </div>
                    )}
                    {formFields.submissionType === "file" && (
                        <div className="mb-4">
                            <label htmlFor="answerFile" className="block mb-1">Answer File</label>
                            <input
                                type="file"
                                id="answerFile"
                                name="answerFile"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                            />
                        </div>
                    )}
                    <div className="h-6" style={{color: formErrors.errorMsg ? "red" : "transparent"}}>
                        {formErrors.errorMsg || " "}
                    </div>
                    <button
                        type="submit"
                        disabled={!isSubmittable}
                        className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
