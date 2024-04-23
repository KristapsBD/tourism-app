import {tourismApi} from "../components/misc/TourismApi.jsx";


export class Route {
    constructor(name, about, locations) {
        this.name = name;
        this.about = about;
        this.locations = locations;

    }

    displayInfo() {
        console.log(this);
    }

    async createNew(user) {
        try {
            // Prepare route data to send to the API
            const routeData = {
                name: this.name,
                about: this.about,
                locations: this.locations
            };

            // Call the API to create the route
            const response = await tourismApi.createRoute(routeData, user);

            // Log the response
            console.log("Route created successfully:", response.data);
        } catch (error) {
            console.error("Error creating route:", error);
            throw error;
        }
    }
}
