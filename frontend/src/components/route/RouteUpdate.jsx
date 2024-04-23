import { useState } from "react";
import { tourismApi } from "../misc/TourismApi.jsx";


//TODO
//Jāpieliek, lai parāda datus no datubāzes ierakstam, kuru vēlamies uzlabot
export default function RouteUpdate({ routeId }) {
    const [formFields, setFormFields] = useState({
        routeName: "",
        routeDescription: "",
        coordinates: [{ latitude: "", longitude: "" }]
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

    const handleCoordinateChange = (e, index) => {
        const { name, value } = e.target;
        const newCoordinates = formFields.coordinates.map((coordinate, i) => {
            if (i === index) {
                return { ...coordinate, [name]: value };
            }
            return coordinate;
        });
        setFormFields((prev) => ({
            ...prev,
            coordinates: newCoordinates
        }));
        setFormErrors((prev) => ({
            ...prev,
            errorMsg: ""
        }));
    };

    const handleAddCoordinate = () => {
        setFormFields((prev) => ({
            ...prev,
            coordinates: [...prev.coordinates, { latitude: "", longitude: "" }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await tourismApi.updateRoute(routeId, formFields);
            console.log("Route updated successfully:", response);
        } catch (error) {
            console.error('Form submission failed:', error);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-200">
            <div className="max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl mb-4 text-center">Update Route</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="routeName" className="block mb-1">Route Name</label>
                        <input
                            type="text"
                            id="routeName"
                            name="routeName"
                            value={formFields.routeName}
                            onChange={handleTextFieldChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none"
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="routeDescription" className="block mb-1">Route Description</label>
                        <textarea
                            id="routeDescription"
                            name="routeDescription"
                            value={formFields.routeDescription}
                            onChange={handleTextFieldChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Coordinates</label>
                        {formFields.coordinates.map((coordinate, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    name="latitude"
                                    placeholder="Latitude"
                                    value={coordinate.latitude}
                                    onChange={(e) => handleCoordinateChange(e, index)}
                                    className="w-1/2 px-3 py-2 border rounded-md focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="longitude"
                                    placeholder="Longitude"
                                    value={coordinate.longitude}
                                    onChange={(e) => handleCoordinateChange(e, index)}
                                    className="w-1/2 px-3 py-2 border rounded-md focus:outline-none"
                                />
                            </div>
                        ))}
                        {/* Render the button outside of the map function */}
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={handleAddCoordinate}
                                className="ml-2 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md focus:outline-none"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="h-6" style={{color: formErrors.errorMsg ? "red" : "transparent"}}>
                        {formErrors.errorMsg || " "}
                    </div>
                    <button
                        type="submit"
                        disabled={!isSubmittable}
                        className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none"
                    >
                        Update Route
                    </button>
                </form>
            </div>
        </div>
    );
}
