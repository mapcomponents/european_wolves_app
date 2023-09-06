import { useMap } from "@mapcomponents/react-maplibre";
import React, { useState, useEffect } from "react";
import WmsCarousel from "./carousel";
import DataLayer from "./dataLayer";
import OSM_Bright from "../assets/OSM_Bright.json";
import OSM_Brightpic from "../assets/OSM_Brightpic.png";
import OSM_Fiord from "../assets/OSM_Fiord.json";
import OSM_Fiordpic from "../assets/OSM_Fiordpic.png";

const styleOptions = [
   { style: OSM_Fiord, image: OSM_Brightpic, title: "Fiord" },
   { style: OSM_Bright, image: OSM_Fiordpic, title: "Bright" },
];

export default function LayerSwitcher() {
   const mapHook = useMap({ mapId: "map_1" });
   const [currentIndex, setCurrentIndex] = useState(1);
   const [disableWms, setDisableWms] = useState(false);
   const [mapReady, setMapReady] = useState(false);

   useEffect(() => {
      styleOptions[currentIndex].style.layers.forEach((el) => {
         if (mapHook.map?.map.getLayer(el.id)) {
            mapHook.map?.removeLayer(el.id);
         }
         mapHook.map?.addLayer(el, "Wolf_map");
         setMapReady(true);
      });
   }, [currentIndex, mapHook.map]);

   const wmsSetter = (index) => {
      if (index === currentIndex) {
         if (disableWms) {
            setDisableWms(false);
         } else {
            setDisableWms(true);
         }
      } else {
         setCurrentIndex(index);
         setDisableWms(false);
      }
   };

   return (
      <>
         {!disableWms}
         <DataLayer ready={mapReady} />
         <WmsCarousel
            options={styleOptions}
            setter={wmsSetter}
            current={currentIndex}
         />
      </>
   );
}
