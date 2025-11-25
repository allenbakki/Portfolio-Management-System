import React, { useContext, useEffect, useState, createContext } from "react";

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  // ---------------- USER DETAILS -------------------
  const [userDetails, setUserDetails] = useState({
    isLogggedIn: false,
    displayName: "",
    email: "",
    createDate: "",
    accessToken: "",
    refreshToken: "",
  });

  // ---------------- MODE -------------------
  const [mode, setMode] = useState(false);

  // ---------------- PORTFOLIO -------------------
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem("portfolio");
    return saved ? JSON.parse(saved) : null;
  });

  // ---------------- LAUNCH IDS -------------------
  const [professionalPortfolioLaunchId, setProfessionalPortfolioLaunchId] = useState(
    () => localStorage.getItem("professionalPortfolioLaunchId") || ""
  );
  const [creativePortfolioLaunchId, setCreativePortfolioLaunchId] = useState(
    () => localStorage.getItem("creativePortfolioLaunchId") || ""
  );

  // ---------------- RESTORE FROM STORAGE -------------------
  useEffect(() => {
    const savedDetails = localStorage.getItem("userDetails");
    if (savedDetails) setUserDetails(JSON.parse(savedDetails));

    const savedPortfolio = localStorage.getItem("portfolio");
    if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
  }, []);

  // ---------------- SAVE ON CHANGE -------------------
  // Portfolio as JSON
  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  // Launch IDs as plain strings
  useEffect(() => {
    localStorage.setItem("professionalPortfolioLaunchId", professionalPortfolioLaunchId);
  }, [professionalPortfolioLaunchId]);

  useEffect(() => {
    localStorage.setItem("creativePortfolioLaunchId", creativePortfolioLaunchId);
  }, [creativePortfolioLaunchId]);

  // ---------------- UPDATE USER DETAILS -------------------
  const updateUserDetails = (newUserDetails) => {
    setUserDetails((prev) => {
      const updated = { ...prev, ...newUserDetails };
      localStorage.setItem("userDetails", JSON.stringify(updated));
      return updated;
    });
  };

  // ---------------- SIGN OUT -------------------
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
    setCreativePortfolioLaunchId("");
    setProfessionalPortfolioLaunchId("");
  };

  return (
    <GlobalContext.Provider
      value={{
        // User
        ...userDetails,
        updateUserDetails,
        signOut,

        // Theme
        mode,
        setToDarkMode: setMode,

        // Portfolio
        portfolio,
        setPortfolio,

        // Launch IDs
        professionalPortfolioLaunchId,
        setProfessionalPortfolioLaunchId,
        creativePortfolioLaunchId,
        setCreativePortfolioLaunchId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
