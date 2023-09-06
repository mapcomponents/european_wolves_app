/* eslint-disable eqeqeq */
import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import { Box, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import AppContext from "../AppContext";
import {
   AreaChart,
   ResponsiveContainer,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ReferenceLine,
   Area,
} from "recharts";
import DropDownMenu from "./dropdownMenu";
import CountUp from "react-countup";

const DrawerHeader = styled("div")(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   padding: theme.spacing(0, 1),
   ...theme.mixins.toolbar,
   justifyContent: "flex-start",
}));

export default function Sidebar(props) {
   const theme = useTheme();
   const mediaIsMobile = useMediaQuery("(max-width:900px)");
   const sideBarAnchor = mediaIsMobile ? "bottom" : "left";
   const appContext = useContext(AppContext);
   const [year, setYear] = useState(appContext.currentYear);
   const [selectedCountry, setSelectedCountry] = useState("None");
   function getCountry(value) {
      setSelectedCountry(value);
   }

   const [wolfSum, setWolfSum] = useState();

   useEffect(() => {
      fetch("assets/wolf_aggregate.json")
         .then(function (response) {
            return response.json();
         })
         .then(function (json) {
            setWolfSum(json);
         });
   }, []);

   useEffect(() => {
      setYear(appContext.currentYear);
   }, [appContext.currentYear]);

   var filteredData = wolfSum?.features.filter((item) => {
      if (selectedCountry === undefined) {
         return item.properties.Country === "all_of_europe";
      } else {
         return item.properties.Country === selectedCountry;
      }
   });

   var filteredYear = filteredData?.filter((item) => {
      return item.properties.Year == Math.floor(year);
   });
   var summe = filteredYear?.[0]?.properties?.Gesamt;
   var before = filteredData?.filter((item) => {
      if (year < 2013) {
         return item.properties.Year == Math.floor(year);
      } else {
         return item.properties.Year == Math.floor(year) - 1;
      }
   });

   var yearBefore = before?.[0]?.properties?.Gesamt;

   var WolfArray = [];
   const chartData = () => {
      filteredData?.forEach((element) => {
         WolfArray.push({
            Year: element.properties["Year"],
            Number: element.properties["Gesamt"],
            Country: element.properties["Country"],
         });
      });
      WolfArray.sort((a, b) => {
         return a.Year - b.Year;
      });
      return WolfArray;
   };
   const calculateMaxValue = () => {
      const maxValues = WolfArray.map((item) => Number(item.Number));
      const maxValue = Math.max(...maxValues);
      const buffer = maxValue / 10;
      return Math.floor(maxValue + buffer);
   };

   return (
      <>
         <Box className="numbersProvider">
            <Typography>
               Estimated Number of Wolves in {Math.floor(year)} in{" "}
               {selectedCountry !== undefined
                  ? selectedCountry
                  : "all of Europe"}
               :{" "}
            </Typography>
            {mediaIsMobile ? (
               <Typography variant="h4" marginLeft="80px" marginTop="-28px">
                  <CountUp start={yearBefore} end={summe}></CountUp>
               </Typography>
            ) : (
               <Typography variant="h2" paddingLeft="0px" marginTop="0px">
                  <CountUp start={yearBefore} end={summe}></CountUp>
               </Typography>
            )}
         </Box>
         <Drawer
            transitionDuration={800}
            sx={{
               width: mediaIsMobile ? 140 : 505,
               maxWidth: "50%",
               flexShrink: 0,

               "& .MuiDrawer-paper": {
                  width: mediaIsMobile ? 140 : 505,
                  height: mediaIsMobile ? 108 : 735,
                  opacity: 0.75,
                  marginTop: 2,
                  marginBottom: 5,
                  left: mediaIsMobile ? 38 : 5,
                  bottom: mediaIsMobile ? 64 : 5,
                  backgroundColor: "#353535",
                  color: "white",
               },
            }}
            variant="persistent"
            anchor={sideBarAnchor}
            open={props.open}
         >
            <DrawerHeader>
               {!mediaIsMobile && (
                  <IconButton
                     style={{
                        position: "absolute",
                        marginTop: mediaIsMobile ? 5 : 15,
                        marginRight: 30,
                        backgroundColor: "#353535",
                        color: "white",
                        right: "0",
                     }}
                     size={mediaIsMobile ? "small" : "medium"}
                     onClick={props.closeHandler}
                  >
                     {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
                  </IconButton>
               )}
               {mediaIsMobile ? (
                  <Typography
                     variant={"body2"}
                     paddingTop="25px"
                     paddingLeft="1px"
                  >
                     Select Country
                  </Typography>
               ) : (
                  <Typography variant={"h5"} paddingTop="5px">
                     {" "}
                     Information
                  </Typography>
               )}
            </DrawerHeader>
            <Divider />
            {mediaIsMobile ? (
               <br />
            ) : (
               <Typography
                  variant={"body1"}
                  paddingTop="5px"
                  paddingLeft="15px"
               >
                  Select Country
               </Typography>
            )}
            <Divider />
            <DropDownMenu paddingTop="25px" callback={getCountry} />
            {mediaIsMobile ? (
               <br />
            ) : (
               <Typography
                  variant={"body1"}
                  paddingTop="50px"
                  paddingLeft="15px"
               >
                  Wolf Population 2012-2022
               </Typography>
            )}
            {mediaIsMobile ? (
               <br />
            ) : (
               <ResponsiveContainer width={500} height={350}>
                  <AreaChart
                     data={chartData()}
                     margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                     <XAxis dataKey="Year" />
                     <YAxis domain={[0, calculateMaxValue()]} />
                     <CartesianGrid strokeDasharray="3 3" />
                     <Tooltip />
                     <ReferenceLine
                        x="Country"
                        stroke="green"
                        label="Min PAGE"
                     />
                     <Area
                        type="monotone"
                        dataKey="Number"
                        stroke="#882418"
                        fill="#009ee0"
                     />
                  </AreaChart>
               </ResponsiveContainer>
            )}
            {mediaIsMobile ? (
               <br />
            ) : (
               <Typography variant={"h7"} paddingTop="2px" paddingLeft="15px">
                  Notes:
               </Typography>
            )}
            {mediaIsMobile ? (
               <br />
            ) : (
               <Typography variant={"h7"} paddingTop="2px" paddingLeft="15px">
                  - For Belarus and the russian oblast Kaliningrad there is no
                  data available. Most likely, parts of the baltic population
                  are living in these countrys.
               </Typography>
            )}
            {mediaIsMobile ? (
               <br />
            ) : (
               <Typography variant={"h7"} paddingTop="2px" paddingLeft="15px">
                  - For Ukraine, only the population in the carpathian region
                  was included.
               </Typography>
            )}
         </Drawer>
      </>
   );
}
