import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [authToken, setAuthToken] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [darkMode, setDarkMode] = useState();
  const [headerShown, setHeaderShown] = useState(true);
  const [footerShown, setFooterShown] = useState(true);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  let sharedState = {
    authToken,
    setAuthToken,
    currentUser,
    setCurrentUser,
    darkMode,
    setDarkMode,
    headerShown,
    setHeaderShown,
    footerShown,
    setFooterShown,
    breadcrumbs,
    setBreadcrumbs,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
