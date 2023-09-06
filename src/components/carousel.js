import React, { useEffect, useState } from "react";
import { Button, Box, useMediaQuery } from "@mui/material/";

export default function WmsCarousel(props) {
   const [showIndex, setShowIndex] = useState(props.current);
   const mediaIsLandscape = useMediaQuery("(max-height: 562px)");

   useEffect(() => {
      if (props.current !== showIndex) {
         props.setter(showIndex);
      }
   }, [showIndex, props]);

   function clickRight() {
      if (showIndex === props.options.length - 1) {
         setShowIndex(0);
      } else {
         setShowIndex(showIndex + 1);
      }
   }

   return (
      <>
         <Box
            sx={{
               position: "fixed",
               bottom: mediaIsLandscape ? 4 : 50,
               right: mediaIsLandscape ? 120 : 75,
               height: 100,
               width: 110,
               opacity: 0.8,
               zIndex: 110,
               display: "flex",
               justifyContent: "center",
               backgroundColor: "#353535",
            }}
         >
            <Button onClick={() => props.setter(showIndex)}>
               <img
                  src={props.options[showIndex].image}
                  alt={props.options[showIndex].title}
                  onClick={clickRight}
                  style={{
                     width: 88,
                     height: 88,
                     opacity: 1,
                  }}
               />
            </Button>
         </Box>
      </>
   );
}
