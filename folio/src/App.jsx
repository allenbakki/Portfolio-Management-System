import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";
import Landing from "./pages/landing";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
