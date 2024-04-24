import {Map} from "@vis.gl/react-google-maps";
import Directions from "./Directions.jsx";
export default function MapRenderer({width, height, id}){

    return (
        <div className="flex justify-center items-center mt-5">
            <div style={{
                width: `${width}px`,
                height: `${height}px`
            }}>
                <Map mapId={import.meta.env.VITE_MAP_ID}>
                    <Directions id={id}/>
                </Map>
            </div>
        </div>

    )
}
