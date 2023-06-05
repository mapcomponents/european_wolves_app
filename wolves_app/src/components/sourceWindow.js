import * as React from "react";
import { useState } from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";

export default function SourceWindow() {
   const [open, setOpen] = useState(true);

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <Dialog open={open}>
         <DialogTitle> Information on Data and Sources </DialogTitle>
         <Typography variant={"body1"} paddingTop="5px" paddingLeft="15px">
            Note: The purpose of this application is to provide an example of
            components from the Mapcomponents Catalogue, such as MlGeojsonLayer,
            which was used for the heatmap, and the TemporalController. The Data
            displayed in this application is highly uncertain and does not claim
            to be correct. The numbers used were extrapolated from the following
            sources:
         </Typography>
         <Typography variant={"body2"} paddingTop="5px" paddingLeft="15px">
            1. "Recovery of large carnivores in Europe’s modern human-dominated
            landscapes" in Science, 346. Available online at:
         </Typography>
         <Typography variant={"body2"} paddingTop="5px" paddingLeft="15px">
            https://www.researchgate.net/publication/269709443_Recovery_of_large_carnivores_in_Europe%27s_modern_human-dominated_landscapes
         </Typography>
         <Typography variant={"body2"} paddingTop="5px" paddingLeft="15px">
            2. Convention on the conservation of european wildlife and natural
            habitats: "Assessment of the conservation status of the Wolf Canis
            lupus in Europe"
         </Typography>
         <Typography variant={"body2"} paddingTop="5px" paddingLeft="15px">
            Available online at:
         </Typography>
         <Typography variant={"body2"} paddingTop="5px" paddingLeft="15px">
            https://rm.coe.int/inf45e-2022-wolf-assessment-bern-convention-2791-5979-4182-1-2/1680a7fa47
         </Typography>
         <Typography
            variant={"body2"}
            paddingTop="5px"
            paddingLeft="15px"
         ></Typography>
         <Typography variant={"body2"} paddingTop="5px" paddingLeft="15px">
            The displayed distribution area was determined by using the source
            below, aswell as from various local reportings.
         </Typography>
         <Typography
            variant={"body2"}
            paddingTop="5px"
            paddingLeft="15px"
            gutterBottom={true}
         >
            1.
            https://www.nabu.de/tiere-und-pflanzen/saeugetiere/wolf/europa/index.html
         </Typography>
         <IconButton
            onClick={handleClose}
            sx={{
               position: "absolute",
               right: 8,
               bottom: 8,
            }}
         >
            <CheckIcon />
         </IconButton>
      </Dialog>
   );
}
