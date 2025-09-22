import { Link } from "react-router-dom";
import "./style.css";
import googleIcon from "../assets/google.svg";

function SignIn() {
  return (
    <div className="backgroundContainer">
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
        />
      </div>

      <button className="btn">SignIn</button>
      <div
        className="inward-border"
      >
        <img src={googleIcon} width={18} height={18} style={{ marginTop: 3 }} />{" "}
        Continue with Google
      </div>
      <div className="textCenter">
        Don't have an account? <Link to="/signUp" style={{color:"gray"}}>SignUp</Link>
      </div>
    </div>
    </div>
  );
}

export default SignIn;
