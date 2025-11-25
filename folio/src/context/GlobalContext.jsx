import React, { useContext, useEffect, useState, createContext } from "react";

const GlobalContext = createContext({});

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

  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem("portfolio");
    return saved ? JSON.parse(saved) : null;
  });

  const [professionalPortfolioLaunchId, setProfessionalPortfolioLaunchId] = useState(
    () => localStorage.getItem("professionalPortfolioLaunchId") || ""
  );
  const [creativePortfolioLaunchId, setCreativePortfolioLaunchId] = useState(
    () => localStorage.getItem("creativePortfolioLaunchId") || ""
  );

  useEffect(() => {
    const savedDetails = localStorage.getItem("userDetails");
    if (savedDetails) setUserDetails(JSON.parse(savedDetails));

    const savedPortfolio = localStorage.getItem("portfolio");
    if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem("professionalPortfolioLaunchId", professionalPortfolioLaunchId);
  }, [professionalPortfolioLaunchId]);

  useEffect(() => {
    localStorage.setItem("creativePortfolioLaunchId", creativePortfolioLaunchId);
  }, [creativePortfolioLaunchId]);

  const updateUserDetails = (newUserDetails) => {
    setUserDetails((prev) => {
      const updated = { ...prev, ...newUserDetails };
      localStorage.setItem("userDetails", JSON.stringify(updated));
      return updated;
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
    setCreativePortfolioLaunchId("");
    setProfessionalPortfolioLaunchId("");
  };

  return (
    <GlobalContext.Provider
      value={{
        ...userDetails,
        updateUserDetails,
        signOut,

        mode,
        setToDarkMode: setMode,

        portfolio,
        setPortfolio,

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
