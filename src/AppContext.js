import { createContext } from "react";
import { useState } from "react";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCountryID, setSelectedCountryID] = useState();
  const [currentYear, setCurrentYear] = useState();

  const value = {
     selectedcountry: selectedCountry,
     setselectedcountry: setSelectedCountry,
     selectedCountryID: selectedCountryID,
     setSelectedCountryID: setSelectedCountryID,
     setCurrentYear: setCurrentYear,
     currentYear: currentYear,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
export { AppContextProvider };

