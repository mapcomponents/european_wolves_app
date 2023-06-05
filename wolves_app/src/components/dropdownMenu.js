import * as React from "react";
import { useEffect, useState, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AppContext from "../AppContext";

const options = [
   "all_of_europe",
   "Albania",
   "Austria",
   "Belgium",
   "Bosnia and Herzegovina",
   "Bulgaria",
   "Croatia",
   "Czech Republic",
   "Denmark",
   "Estonia",
   "Finland",
   "France",
   "Germany",
   "Greece",
   "Hungary",
   "Italy_Alpine",
   "Italy_Main",
   "Kosovo",
   "Latvia",
   "Lithuania",
   "Luxembourg",
   "Montenegro",
   "Netherlands",
   "North Macedonia",
   "Norway",
   "Poland_Baltic",
   "Poland_Carpathian",
   "Poland_Central_European",
   "Portugal",
   "Romania",
   "Serbia",
   "Slovakia",
   "Slovenia",
   "Spain",
   "Sweden",
   "Switzerland",
   "Turkey_European_part",
   "Ukraine_Carpathian",
];

export default function DropDownMenu(props) {
   const [anchorEl, setAnchorEl] = useState(null);
   const [selectedIndex, setSelectedIndex] = useState(12);
   const open = Boolean(anchorEl);
   const handleClickListItem = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const appContext = useContext(AppContext);

   const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setAnchorEl(null);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   // eslint-disable-next-line react-hooks/exhaustive-deps
   function showAllEurope() {
      if (selectedIndex === 0) {
         setSelectedIndex();
      }
   }

   useEffect(() => {
      showAllEurope();
      props.callback(options[selectedIndex]);
      appContext.setselectedcountry(options[selectedIndex]);
      appContext.setSelectedCountryID(selectedIndex);
   }, [selectedIndex, props, appContext, showAllEurope]);

   return (
      <div>
         <List
            component="nav"
            aria-label="Device settings"
            sx={{ bgcolor: "black" }}
         >
            <ListItem
               id="lock-button"
               aria-haspopup="listbox"
               aria-controls="lock-menu"
               aria-expanded={open ? "true" : undefined}
               onClick={handleClickListItem}
               sx={{ paddingTop: 0, paddingBottom: 0 }}
            >
               <ListItemText primary={options[selectedIndex]} />
            </ListItem>
         </List>
         <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               "aria-labelledby": "lock-button",
               role: "listbox",
            }}
         >
            {options.map((option, index) => (
               <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
               >
                  {option}
               </MenuItem>
            ))}
         </Menu>
      </div>
   );
}
