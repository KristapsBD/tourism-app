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

    async createNew() {
        try {
            //TODO
            //SITAIS TIKAI PRIEKS TESTESANAS, JANOMAINA LAI TAS JAU IR FORMA
            let i = 1;
            this.locations.forEach(coordinate => {
                coordinate.name = `Location ${i}`
                i++
            })
            // Check if the route meets requirements (you can add your own validation logic here)

            // Prepare route data to send to the API
            const routeData = {
                name: this.name,
                about: this.about,
                locations: this.locations
            };

            // Call the API to create the route
            const response = await tourismApi.createRoute(routeData);

            // Log the response
            console.log("Route created successfully:", response.data);
        } catch (error) {
            console.error("Error creating route:", error);
            throw error;
        }
    }
}
