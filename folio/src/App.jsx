import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";
import Landing from "./pages/landing/landing";
import Portfolio from "./pages/portfolio/portfolio";
import Account from "./pages/account";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signIn" element={<SignUp />} />
          <Route path="/signUp" element={<SignIn />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
