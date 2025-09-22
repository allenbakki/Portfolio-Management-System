import "./style.css";
import googleIcon from "../assets/google.svg";
import { useState } from "react";
import { loginCred } from "../apis/auth";
import { Navigate, useNavigate, Link } from "react-router-dom";

function SignIn() {
  const [loginDetails, setLoginDetails] = useState({
    username: "reshma2001d",
    email: "reshma2001d@gmail.com",
    password: "reshma@1412",
    fullname: "reshma dudekula",
  });
  const history = useNavigate();

  const handleChange = (name) => (e) => {
    setLoginDetails((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCred(loginDetails)
      .then((response) => {
        if (response.status == 200) {
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
            SignIn
          </button>
          <div className="inward-border">
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
