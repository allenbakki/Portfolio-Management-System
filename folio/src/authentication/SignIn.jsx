import "./style.css";
import googleIcon from "../assets/google.svg";
import { useState } from "react";
import { signUpCred } from "../apis/auth";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../apis/firebase";
import { useGlobalContext } from "../context/GlobalContext";

function SignIn() {
  const { updateUserDetails } = useGlobalContext();
  const [SignInDetails, setSignInDetails] = useState({
    username: "reshma2001d",
    email: "reshma2001d@gmail.com",
    password: "reshma@1412",
    fullname: "reshma dudekula",
  });
  const history = useNavigate();

  const handleChange = (name) => (e) => {
    setSignInDetails((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User:", user);
      const newUserDetails = {
        isLogggedIn: true,
        ...user.email,...user.displayName,...user.accessToken      };
      updateUserDetails(newUserDetails);
      history("/");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signUpCred(SignInDetails)
      .then((response) => {
        console.log("respomse", response)
        if (response.status == 200) {
          const newUserDetails = {
            isLogggedIn: true,
            ...response.data,
          };
          updateUserDetails(newUserDetails);
          history("/");
        }
        return <Navigate to="/landing" />;
      })
      .catch((error) => {
        console.error("An error occurred during login:", error);
      });
  };

  return (
    <div className="backgroundContainer">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="header">
            <div className="subheader1">Welcome Back!</div>
            <div className="subheader2">Please signIn to continue</div>
          </div>
          <div className="inputContainer">
            <div>Name</div>
            <input
              type="text"
              placeholder="Enter Full Name"
              name="uFullName"
              required
              className="inputBox"
              onChange={handleChange("fullname")}
            />
          </div>
          <div className="inputContainer">
            <div>Email</div>
            <input
              type="email"
              placeholder="Enter Email"
              name="upassword"
              required
              className="inputBox"
              onChange={handleChange("email")}
            />
          </div>
          <div className="inputContainer">
            <div>Username</div>
            <input
              type="text"
              placeholder="Enter Username"
              name="upassword"
              required
              className="inputBox"
              onChange={handleChange("username")}
            />
          </div>
          <div className="inputContainer">
            <div>Password</div>
            <input
              type="password"
              placeholder="Enter Password"
              name="upassword"
              required
              className="inputBox"
              onChange={handleChange("password")}
            />
          </div>

          <button type="submit" className="btn">
            SignUp
          </button>
          <div
            className="inward-border"
            style={{ cursor: "pointer" }}
            onClick={handleGoogleLogin}
          >
            <img
              src={googleIcon}
              width={18}
              height={18}
              style={{ marginTop: 3 }}
            />{" "}
            Continue with Google
          </div>
          <div className="textCenter">
            Already have an account?{" "}
            <Link to="/signIn" style={{ color: "gray" }}>
              SignIn
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
