import {useMap, useMapsLibrary} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";
import {tourismApi} from "./misc/TourismApi.jsx";
import {useAuth} from "../context/AuthContext.jsx";

export default function Directions({id}){
    console.log("id", id)
    const map = useMap()
    const routesLib = useMapsLibrary("routes")
    const [directionsService, setDirectionsService] = useState(null)
    const [directionsRenderer, setDirectionsRenderer] = useState(null)
    const Auth = useAuth()
    useEffect(()=>{
        if(!routesLib || !map) return
        setDirectionsService(new routesLib.DirectionsService())
        setDirectionsRenderer(new routesLib.DirectionsRenderer({map}))
    }, [routesLib, map])
    useEffect(() => {
        if (!directionsRenderer || !directionsService) return;
            tourismApi.getRoute(id, Auth.user)
            .then(res => {
                return res.data
            })
            .then(data => {
                const route = data;
                const origin = { lat: route.locations[0].latitude, lng: route.locations[0].longitude };
                const destination = { lat: route.locations[route.locations.length-1].latitude, lng: route.locations[route.locations.length-1].longitude };

                const waypoints = route.locations.slice(1, -1).map(location => {
                    return { location: { lat: location.latitude, lng: location.longitude }, stopover: true };
                });

                directionsService.route({
                    origin: origin,
                    destination: destination,
                    waypoints: waypoints,
                    travelMode: "WALKING",
                    provideRouteAlternatives: false
                }, (response, status) => {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(response);
                    } else {
                        console.error('Directions request failed due to: ', status);
                    }
                });
            })
            .catch(err => console.error(err));
    }, [directionsRenderer, directionsService]);
    return null;
}