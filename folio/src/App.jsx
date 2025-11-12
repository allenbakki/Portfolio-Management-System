import { BrowserRouter, Routes, Route,  Navigate,
} from "react-router-dom";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";
import Landing from "./pages/landing/landing";
import Portfolio from "./pages/portfolio/portfolio";
import Account from "./pages/account";
import { useGlobalContext } from "./context/GlobalContext";
import LaunchPad from "./pages/launchPad/launchPad";

function App() {
  const { isLogggedIn } = useGlobalContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Landing />} />
        {!isLogggedIn && <Route path="/signIn" element={<SignIn />} />}
        {!isLogggedIn && <Route path="/signUp" element={<SignUp />} />}
        {isLogggedIn && <Route path="/portfolio" element={<Portfolio />} />}
        {isLogggedIn &&   <Route path="/account" element={<Account />} />}
        {isLogggedIn && <Route path="/launchpad" element={<LaunchPad/>}/>}
        <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
