import { Link } from "react-router-dom";
import "./style.css";
import googleIcon from "../assets/google.svg";


function SignUp() {
  return (
    <div className="backgroundContainer">
    <div className="container">
      <div className="header">
        <div className="subheader1">Hello!</div>
        <div className="subheader2">Please signup to continue</div>
      </div>
      <div className="inputContainer">
        <div>Username</div>
        <input
          type="text"
          placeholder="Enter Username"
          name="uname"
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

      <button className="btn">SignUp</button>
      <div
        className="inward-border"
      >
        <img src={googleIcon} width={18} height={18} style={{ marginTop: 3 }} />{" "}
        Continue with Google
      </div>
      <div className="textCenter">
        Already have an account? <Link to="/signIn" style={{color:"gray"}}>SignIn</Link>
      </div>
    </div>
    </div>
  );
}

export default SignUp;
