import {tourismApi} from "../components/misc/TourismApi.jsx";

export class Route {
    constructor(name, about, coordinates) {
        this.name = name;
        this.about = about;
        this.coordinates = coordinates;

    }

    displayInfo() {
        console.log(`Name: ${this.name}, about: ${this.about}`);
        console.log("Coordinates:", this.coordinates);
    }

    async createNew() {
        try {
            // Check if the route meets requirements (you can add your own validation logic here)

            // Prepare route data to send to the API
            const routeData = {
                name: this.name,
                about: this.about,
                coordinates: this.coordinates
            };

            // Call the API to create the route
            const response = await tourismApi.createRoute(routeData);

            // Log the response
            console.log("Route created successfully:", response);
        } catch (error) {
            console.error("Error creating route:", error);
            throw error;
        }
    }
}
