import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>welocme to folio website!</>} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
