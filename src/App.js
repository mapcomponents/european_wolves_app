import "./App.css";
import { MapLibreMap, MlNavigationTools } from "@mapcomponents/react-maplibre";
import { useState } from "react";
import DataLayer from "./components/dataLayer";
import "maplibre-gl/dist/maplibre-gl.css";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import LayerSwitcher from "./components/LayerSwitcher";
import LabelLayer from "./components/test";
import SourceWindow from "./components/sourceWindow";
import Sidebar from "./components/Sidebar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import { getTheme } from "@mapcomponents/react-maplibre";


const theme = createTheme(getTheme("light"), {
   palette: {
      primary: { main: "#353535" },
      secondary: { main: "#009ee0" },
   },
   components: {
      MuiDrawer: {
         defaultProps: {
            PaperProps: {
               sx: {
                  marginBottom: "1.5%",
                  backgroundColor: "#009ee0",
                  color: "black",
               },
            },
         },
      },
   },
});
const buttonSize = {
   width: 80,
   height: 80,
};

const imageStyle = {
   width: 206,
   height: 140,
};

function App() {
   const mediaIsMobile = useMediaQuery("(max-width:900px)");
   const mediaIsSmallScreen = useMediaQuery("(max-width:1750px)");
   const [open, setOpen] = useState(false);

   function toolTipSetter() {
      if (open === true) {
         return "Click to close Information";
      } else {
         return "Click to open Information";
      }
   }

   return (
      <>
         <ThemeProvider theme={theme}>
            <SourceWindow />
            <MapLibreMap
               mapId="map_1"
               options={{
                  zoom: 3,
                  style: "https://wms.wheregroup.com/tileserver/style/osm-fiord-color.json",
                  center: [7.0, 45.0],
               }}
            ></MapLibreMap>
            {mediaIsMobile ? (
               <MlNavigationTools mapId="map1" showZoomButtons={false} />
            ) : (
               <MlNavigationTools mapId="map1" showZoomButtons={true} />
            )}

            <Sidebar
               open={open}
               closeHandler={() => {
                  setOpen(false);
               }}
            ></Sidebar>
            <DataLayer />
            {mediaIsSmallScreen ? (
               <></>
            ) : (
               <img
                  src={"assets/howling_wolf.jpg"}
                  alt="HowlingWolf"
                  className="image-overlay-new"
                  style={{ opacity: 0.9, ...imageStyle }}
               />
            )}

            <LayerSwitcher />
            <Tooltip title={toolTipSetter()}>
               <IconButton
                  className="Info1"
                  sx={
                     mediaIsSmallScreen
                        ? {
                             position: "absolute",
                             left: "65px",
                             bottom: "25px",
                             backgroundColor: "transparent",
                             "&:hover": {
                                padding: 1,
                                backgroundColor: "#009ee0",
                             },
                          }
                        : {
                             position: "absolute",
                             right: "186px",
                             bottom: "58px",
                             backgroundColor: "transparent",
                             "&:hover": {
                                padding: 1,
                                backgroundColor: "#009ee0",
                             },
                          }
                  }
                  onClick={() => {
                     if (open !== true) {
                        setOpen(true);
                     } else {
                        setOpen(false);
                     }
                  }}
               >
                  <InfoIcon className="Info2" sx={{ ...buttonSize }} />
               </IconButton>
            </Tooltip>
            <LabelLayer />
         </ThemeProvider>
      </>
   );
}

export default App;
