import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";
import Landing from "./pages/landing/landing";
import Portfolio from "./pages/portfolio/portfolio";
import Account from "./pages/account";
import { useGlobalContext } from "./context/GlobalContext";

function App() {
  const { isLogggedIn } = useGlobalContext();
  console.log("isLogggedIn",isLogggedIn)

  return (
    <div>
      <BrowserRouter>
        <Routes>
        {isLogggedIn && <Route path="/" element={<Landing />} />}
        {!isLogggedIn && <Route path="/signIn" element={<SignUp />} />}
        {!isLogggedIn && <Route path="/signUp" element={<SignIn />} />}
        {isLogggedIn && <Route path="/portfolio" element={<Portfolio />} />}
        {isLogggedIn &&   <Route path="/account" element={<Account />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
