import axios from "axios";
import React, { useState } from "react";

function Login(props) {
  let [loginStatus, setLoginStatus] = useState("no");
  function handleLoginFormSubmit(event) {
    event.preventDefault(); // Stops the page from refreshing
    console.log("Login button clicked");
    let formData = new FormData(event.target); // Creates a FormData object from the form
    let user = {}; // Creates an empty user object

    for (let data of formData) {
      user[data[0]] = data[1];
    }
    checkUserExists(user);
  }
  async function checkUserExists(user) {
    try {
      let response = await axios.get("http://localhost:3000/users");
      let data = await response.data;
      let validUser = data.filter(
        (e) => e.email == user.email && e.password == user.password
      );
      if (validUser.length == 1) {
        console.log("User exists");
        console.log(validUser[0]);

        setLoginStatus("success");
        // Redirect to the dashboard page
        props.onLoginSuccess(validUser[0]);
      } else {
        console.log("User does not exist");
        setLoginStatus("failed");
        // Display an error message
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {loginStatus == "failed" && (
        <div className="alert alert-danger text-center" role="alert">
          Invalid email or password{" "}
        </div>
      )}

      {(loginStatus == "failed" || loginStatus == "no") && (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold">Welcome Back</h2>
                    <p className="text-muted">
                      Please enter your credentials to login
                    </p>
                  </div>

                  <form onSubmit={handleLoginFormSubmit}>
                    <div className="mb-4">
                      <label className="form-label fw-bold">Email</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-envelope-fill"></i>
                        </span>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="name@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <a href="#" className="text-decoration-none small">
                          Forgot password?
                        </a>
                      </div>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-lock-fill"></i>
                        </span>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>

                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary py-2">
                        Login
                      </button>
                    </div>
                  </form>

                  <div className="text-center mt-4">
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <a href="#" className="text-decoration-none">
                        Sign up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
