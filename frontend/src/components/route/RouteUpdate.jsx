import { useState, useEffect } from "react";
import { tourismApi } from "../misc/TourismApi.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {Route} from "../../models/Route.js";


//TODO
//jāsakārto, lai padod to id kuru grib editot
export default function RouteUpdate() {
    const routeId = 1;
    const Auth = useAuth()
    const [formFields, setFormFields] = useState({
        routeName: "",
        routeDescription: "",
        coordinates: [{ name: "", latitude: "", longitude: "" }]
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
                    const response = await tourismApi.getRoute(routeId, Auth.user);
                    const routeData = response.data;

                    // Populate form fields with route data
                    setFormFields({
                        routeName: routeData.name,
                        routeDescription: routeData.about,
                        coordinates: routeData.locations.map(location => ({
                            name: location.name,
                            latitude: location.latitude,
                            longitude: location.longitude
                        }))
                    });
                }
            } catch (error) {
                console.error('Error fetching route data:', error);
            }
        };

        fetchDataAndPopulateForm();
    }, [routeId, Auth]);


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
            coordinates: [...prev.coordinates, { name: "", latitude: "", longitude: "" }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const coordinates = formFields.coordinates.map(coord => ({
                name: coord.name,
                latitude: coord.latitude,
                longitude: coord.longitude
            }));
            const route = new Route(formFields.routeName, formFields.routeDescription, coordinates);
            route.displayInfo();
            await route.updateRoute(routeId, Auth.user);
        } catch (error) {
            console.error('Form submission failed:', error);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-200">
            <div className="max-w-lg bg-white p-8 rounded-lg shadow-md" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
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
                                    name="name"
                                    placeholder="Location name"
                                    value={coordinate.name}
                                    onChange={(e) => handleCoordinateChange(e, index)}
                                    className="w-1/3 px-3 py-2 border rounded-md focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="latitude"
                                    placeholder="Latitude"
                                    value={coordinate.latitude}
                                    onChange={(e) => handleCoordinateChange(e, index)}
                                    className="w-1/3 px-3 py-2 border rounded-md focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="longitude"
                                    placeholder="Longitude"
                                    value={coordinate.longitude}
                                    onChange={(e) => handleCoordinateChange(e, index)}
                                    className="w-1/3 px-3 py-2 border rounded-md focus:outline-none"
                                />
                            </div>
                        ))}
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