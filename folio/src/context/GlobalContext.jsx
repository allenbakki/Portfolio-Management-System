import React, { useContext, useEffect, useState, createContext } from "react";

const GlobalContext = createContext({
  isLogggedIn: false,
  displayName: "",
  email: "",
  displayImage: "",
  accessToken: "",
  refreshToken: "",
  signOut: () => {},
  updateUserDetails: () => {},
  mode: false,
  setToDarkMode: () => {},
  portfolio: null,
  setPortfolio: () => {},
  launchId:"",
  setLaunchId:()=>{},
});

export const GlobalProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    isLogggedIn: false,
    displayName: "",
    email: "",
    createDate: "",
    accessToken: "",
    refreshToken: "",
  });

  const [mode, setMode] = useState(false);
  const [launchId, setLaunchId] = useState('');

  const setToDarkMode = (modeChange) => setMode(modeChange);

  const [portfolio, setPortfolio] = useState(() => {
    // Initialize portfolio from localStorage if exists
    const savedPortfolio = localStorage.getItem("portfolio");
    return savedPortfolio ? JSON.parse(savedPortfolio) : null;
  });

  // Save portfolio to localStorage whenever it changes
  useEffect(() => {
    if (portfolio) {
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
    }
  }, []);
  useEffect(() => {
    if (launchId) {
      localStorage.setItem("launchId", JSON.stringify(launchId));
    }
  }, []);

  // Update user details and persist to localStorage
  const updateUserDetails = (newUserDetails) => {
    setUserDetails((prev) => {
      const updatedDetails = { ...prev, ...newUserDetails };
      localStorage.setItem("userDetails", JSON.stringify(updatedDetails));
      return updatedDetails;
    });
  };

  const signOut = () => {
    localStorage.clear();
    setUserDetails({
      isLogggedIn: false,
      displayName: "",
      email: "",
      accessToken: "",
      refreshToken: "",
    });
    setPortfolio(null);
    setLaunchId('');
  };

  useEffect(() => {
    const savedDetails = localStorage.getItem("userDetails");
    if (savedDetails) {
      setUserDetails(JSON.parse(savedDetails));
    }

    const savedPortfolio = localStorage.getItem("portfolio");
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
    const savedLaunchId = localStorage.getItem("launchId");
    if (savedLaunchId) {
      setLaunchId(savedLaunchId);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        signOut,
        ...userDetails,
        updateUserDetails,
        mode,
        setToDarkMode,
        portfolio,
        setPortfolio,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
