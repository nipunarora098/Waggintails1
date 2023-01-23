import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SignupPM.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import * as Loader from "react-loader-spinner";
function SignupPM() {
  const [loading, setLoading] = useState(false);
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [ConPass, setConPass] = useState("");
  const Navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      UserName: UserName,
      Password: Password,
    };
    setLoading(true);
    axios.post(`${process.env.REACT_APP_API_URL}/login`, user).then((res) => {
      setLoading(false);
      alert(res.data.message);
      if (res.data.user) {
        localStorage.setItem(process.env.User, JSON.stringify(res.data.user));
        // setLoginUser(res.data.user);
        Navigate("/MemberArea");
      }
    });
  };
  const handleRegister = (event) => {
    event.preventDefault();
    const user = {
      UserName: UserName,
      Password: Password,
      Email: Email,
    };
    if (UserName && Password && Email && Password === ConPass) {
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_API_URL}/register`, user)
        .then((res) => {
          setLoading(false);
          // console.log(res.data.message);
          alert(res.data.message);
          if (res.data.user) {
            localStorage.setItem(
              process.env.User,
              JSON.stringify(res.data.user)
            );
            // setLoginUser(res.data.user);
            Navigate("/MemberArea");
          }
        });
    } else {
      toast.error("password and confirm password must be same ", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        theme: "dark",
      });
    }
  };
  const [isActive, setIsActive] = useState(false);
  function LoginEvent() {
    setIsActive(false);
  }
  function RegisterEvent() {
    setIsActive(true);
  }
  return (
    <div>
      {loading && (
        <Loader type="Bounce" color="#somecolor" height={100} width={100} />
      )}
      {!loading && (
        <div>
          <div className="signupPM">
            <div className="container">
              <div className="blueBg">
                <div className="box signin">
                  <h2>Already Have An Account?</h2>
                  <button className="signinBtn" onClick={LoginEvent}>
                    Sign in
                  </button>
                </div>
                <div className="box signup">
                  <h2>Don't Have An Account?</h2>
                  <button className="signupBtn" onClick={RegisterEvent}>
                    Sign up
                  </button>
                </div>
              </div>
              <div className={isActive ? "formBx active" : "formBx"}>
                <div className="form signinForm">
                  <form onSubmit={handleSubmit} method="post">
                    <h3>Sign In</h3>
                    <input
                      type="text"
                      placeholder="UserName"
                      required
                      value={UserName}
                      onChange={(event) => setUserName(event.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={Password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type="submit" onClick={handleSubmit}>
                      {" "}
                      Log In
                    </button>
                    {/* <input type="submit" value="Login" /> */}
                    {/* <!-- <input type="submit" value="Login For Pet's Daycare"> --> */}
                    <a href="#" className="forgot">
                      Forgot Password
                    </a>
                  </form>
                  <ToastContainer />
                </div>

                <div className="form signupForm">
                  <form action="memberArea.html">
                    <h3>Sign Up</h3>
                    <input
                      type="text"
                      placeholder="UserName"
                      required
                      value={UserName}
                      onChange={(event) => setUserName(event.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={Email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={Password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={ConPass}
                      onChange={(event) => setConPass(event.target.value)}
                    />
                    <button type="submit" onClick={handleRegister}>
                      {" "}
                      Register{" "}
                    </button>
                    {/* <input type="submit" value="Register" /> */}
                    {/* <!-- <input type="submit" value="Register For Pet's Daycare"> --> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    // loading ? (): ()
    // loading ? (<Loader type="Bounce" color="#00c2cb" height={100} width={100} />):
    // (              
  );
}
export default SignupPM;
