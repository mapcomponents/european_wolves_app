import {
   MlGeoJsonLayer,
   MlTemporalController,
   useLayerFilter,
   useMap,
} from "@mapcomponents/react-maplibre";
import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import mapboxgl from "mapbox-gl";

function DataLayer() {
   const [currentYear, setCurrentYear] = useState(2012);
   const mapHook = useMap({ mapId: "map_1" });

   const appContext = useContext(AppContext);

   function getValues(val) {
      setCurrentYear(val.current);
   }

   const [wolfData, setWolfData] = useState();
   const [selected, setSelected] = useState();
   const [countryID, setCountryID] = useState(12);
   const [countryData, setCountryData] = useState();

   // For Heatmap Data display
   useEffect(() => {
      fetch("assets/wolves_all.json")
         .then(function (response) {
            return response.json();
         })
         .then(function (json) {
            setWolfData(json);
         });
   }, []);

   useEffect(() => {
      setSelected(appContext.selectedcountry);
   }, [appContext.selectedcountry]);

   useEffect(() => {
      setCountryID(appContext.selectedCountryID);
   }, [appContext.selectedCountryID]);

   useEffect(() => {
      appContext.setCurrentYear(currentYear);
   }, [currentYear, appContext]);

   // For zoom function when a new country is selected
   useEffect(() => {
      fetch("assets/country_points.json")
         .then(function (response) {
            return response.json();
         })
         .then(function (json) {
            setCountryData(json);
         });
   }, []);

   useLayerFilter({
      layerId: "Wolf_map",
      filter: ["==", "Country", selected],
   });

   useEffect(() => {
      if (
         countryData &&
         countryData.features &&
         countryData.features[countryID]
      ) {
         setCurrentYear(2012);
         const { Longitude, Latitude } =
            countryData.features[countryID].properties;
         mapHook.map?.map.flyTo({
            center: new mapboxgl.LngLat(
               parseFloat(Longitude),
               parseFloat(Latitude)
            ),
            zoom: countryData.features[countryID].properties.Zoom,
         });
      }
   }, [countryID, countryData, mapHook.map]);

   return (
      <>
         {wolfData && (
            <MlGeoJsonLayer
               mapId="map_1"
               type="heatmap"
               layerId="Wolf_map"
               geojson={wolfData}
               paint={{
                  "heatmap-color": [
                     "interpolate",
                     ["exponential", 8],
                     ["heatmap-density"],
                     0,
                     "rgba(0, 0, 255, 0)",
                     0.1,
                     "#72ff62",
                     0.3,
                     "#c4ff40",
                     0.6,
                     "#ffc020",
                     0.75,
                     "#ff8500",
                     0.95,
                     "#F00",
                  ],
                  "heatmap-intensity": {
                     stops: [
                        [1, 0.1],
                        [2, 0.25],
                        [3, 0.3],
                        [4, 0.45],
                        [5, 0.7],
                        [7, 0.8],
                        [8, 0.9],
                        [10, 1.0],
                     ],
                  },
                  "heatmap-opacity": 0.5,
                  "heatmap-weight": 0.8,
                  "heatmap-radius": [
                     "interpolate",
                     ["linear"],
                     ["get", "Year"],
                     currentYear - 1,
                     0,
                     currentYear,
                     10,
                     currentYear + 1,
                     0,
                  ],
               }}
            />
         )}
         {wolfData && (
            <MlTemporalController
               className="TempController"
               fitBounds={false}
               step={1.0}
               interval={1000}
               displayCurrentValue={true}
               geojson={wolfData}
               initialVal={currentYear}
               timeField={"Year"}
               ownLayer={false}
               onStateChange={getValues}
            />
         )}
      </>
   );
}

export default DataLayer;
