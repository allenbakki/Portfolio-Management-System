import "./style.css";
import googleIcon from "../assets/google.svg";
import { useState } from "react";
import { loginCred } from "../apis/auth";
import { auth, provider, signInWithPopup } from "../apis/firebase";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

function SignIn() {
  const { updateUserDetails } = useGlobalContext();
  const [loginDetails, setLoginDetails] = useState({
    email: "reshma2001d@gmail.com",
    password: "reshma@1412",
  });
  const history = useNavigate();

  const handleChange = (name) => (e) => {
    setLoginDetails((prev) => {
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
        email: user.email,
        displayName: user.displayName,
        displayImage: user.photoURL || "/images/profile-placeholder.png",
        createDate: new Date(+user.reloadUserInfo.createdAt).toLocaleDateString() || "",
        accessToken: user.accessToken || "",
      };
      console.log(newUserDetails)
      updateUserDetails(newUserDetails);
      history("/"); 
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCred(loginDetails)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const newUserDetails = {
            isLogggedIn: true,
            ...response.data,
          };
          updateUserDetails(newUserDetails);
          history("/");
        }
        return <Navigate to="/" />;
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
            <div className="subheader1">Hello!</div>
            <div className="subheader2">Please signup to continue</div>
          </div>
          <div className="inputContainer">
            <div>Email</div>
            <input
              type="email"
              placeholder="Enter Email"
              name="uname"
              required
              className="inputBox"
              onChange={handleChange("email")}
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
            SignIn
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
            Don't have an account?{" "}
            <Link to="/signUp" style={{ color: "gray" }}>
              SignUp
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
