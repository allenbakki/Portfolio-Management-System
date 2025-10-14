import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";
import Landing from "./pages/landing/landing";
import Portfolio from "./pages/portfolio/portfolio";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
