import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";
import Landing from "./pages/landing";
import { useGlobalContext } from "./context/GlobalContext";


function App() {
  const { isLogggedIn } = useGlobalContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          {!isLogggedIn && <Route path="/signIn" element={<SignUp />} />}
          {!isLogggedIn && <Route path="/signUp" element={<SignIn />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
