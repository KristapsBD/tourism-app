import {Map} from "@vis.gl/react-google-maps";
import Directions from "./Directions.jsx";
export default function MapRenderer(){

    return (
        <div className="flex justify-center items-center mt-5">
            <div style={{
                width: '600px',
                height: '600px'
            }}>
                <Map mapId={import.meta.env.VITE_MAP_ID}>
                    <Directions/>
                </Map>
            </div>
        </div>

    )
}
