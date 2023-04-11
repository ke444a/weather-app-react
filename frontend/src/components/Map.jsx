import { useState } from "react";
import BingMapsReact from "bingmaps-react";

export default function Map(props) {
    const [bingMapReady, setBingMapReady] = useState(false);

    return (
        // Configuring Bing Maps React component to display map
        <BingMapsReact
            bingMapsKey={import.meta.env.VITE_BINGMAPS_API_KEY}
            viewOptions={
                bingMapReady
                    ? {
                        center: props.location,
                        mapTypeId: "canvasLight",
                    }
                    : null
            }
            mapOptions={{
                showMapTypeSelector: false,
                showLocateMeButton: false,
                showScalebar: false,
                showZoomButtons: false,
            }}
            onMapReady={() => setBingMapReady(true)}
        />
    );
}
