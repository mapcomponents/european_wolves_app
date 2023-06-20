import { MlWmsLayer } from "@mapcomponents/react-maplibre";
import React, { useState } from "react";
import { Button, Box, useMediaQuery } from "@mui/material/";
import terrainpic from "../assets/terrainpic.png";

export default function LayerSwitcher() {
   const [showWMS, setShowWMS] = useState(false);
   const mediaIsMobile = useMediaQuery("(max-width:900px)");
   const mediaIsSmallScreen = useMediaQuery("(max-width:1450px)");

   function opacitySetter() {
      if (showWMS === true) {
         return 0.5;
      } else {
         return 1.0;
      }
   }

   return (
      <>
         <Box
            sx={
               mediaIsMobile
                  ? {
                       position: "fixed",
                       bottom: 35,
                       left: 5,
                       height: 60,
                       width: 60,
                       opacity: 1.0,
                       zIndex: 110,
                       display: "flex",
                       border: 3,
                       borderColor: "#000",
                       justifyContent: "center",
                    }
                  : {
                       position: "fixed",
                       bottom: mediaIsSmallScreen ? 40 : 60,
                       right: mediaIsSmallScreen ? 60 : 90,
                       height: 84,
                       width: 84,
                       opacity: 1.0,
                       zIndex: 110,
                       display: "flex",
                       border: 3,
                       borderColor: "#000",
                       justifyContent: "center",
                    }
            }
         >
            <Button
               onClick={() => {
                  setShowWMS(!showWMS);
               }}
               sx={{ display: "flex", alignItems: "stretch", padding: 0 }}
            >
               <img
                  src={terrainpic}
                  alt="terrainImage"
                  style={{ opacity: opacitySetter() }}
               />
            </Button>
         </Box>

         {showWMS && (
            <MlWmsLayer
               url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
               insertBeforeLayer="Wolf_map"
            />
         )}
      </>
   );
}
