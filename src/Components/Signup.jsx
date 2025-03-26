import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";

export function Signup(props) {
  let [message, setMessage] = useState("");
  let [signupStatus, setSignupStatus] = useState("no");
  function handleSignupFormSubmit(event) {
    event.preventDefault(); // Stops the page from refreshing

    console.log("button clicked");

    let formData = new FormData(event.target); // Creates a FormData object from the form
    let user = {}; // Creates an empty user object

    // Loops through all form fields and adds them to the user object
    for (let data of formData) {
      user[data[0]] = data[1]; // data[0] is the field name, data[1] is the value
    }

    // Sets a default role
    user["role"] = "user";

    // Logs the user object to console and checks if it exists
    console.log(user);
    checkUserExists(user);
  }

  async function checkUserExists(user) {
    // Gets all users from the server
    let response = await axios.get("http://localhost:3000/users");
    let data = await response.data;

    // Filters the users to find any with matching email
    let filteredData = data.filter((e, index) => e.email == user.email);

    // If there's 1 or more matches, the email is already registered
    if (filteredData.length >= 1) {
      console.log("Already exists");
      setSignupStatus("failed");
      setMessage("Sorry... This email-id is already registered.");
    }
    // If no matches, proceed with adding the new user
    else {
      console.log("New user");
      setMessage("");
      // setSignupStatus("success");
      addUser(user);
    }
  }
  async function addUser(user) {
    // Add user to the database
    try {
      await axios.post("http://localhost:3000/users", user);
      setSignupStatus("success");
    } catch (error) {
      console.log(error);
      setSignupStatus("failed");
    }
  }

  function handleLoginClick() {
    // Redirect to login page
    props.onLoginClick("LogIn");
  }
  return (
    <div className="container mt-5">
      {signupStatus == "success" && (
        <div className="text-center text-danger">
          Signed up successfully!
          <a href="#" onClick={handleLoginClick}>
            login
          </a>{" "}
          now.
        </div>
      )}

      {signupStatus == "failed" && (
        <div className="text-center text-danger">{message}</div>
      )}

      {(signupStatus == "no" || signupStatus == "failed") && (
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-header bg-primary text-white text-center py-3">
                <h2 className="fw-light mb-0">Create Account</h2>
              </div>
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSignupFormSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-bold">Username</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-person-fill"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter your username"
                        required
                      />
                    </div>
                  </div>

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
                    <label className="form-label fw-bold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Create a strong password"
                        required
                      />
                    </div>
                    <div className="form-text text-muted small">
                      Password must be at least 8 characters long
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terms"
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the{" "}
                      <a href="#" className="text-decoration-none">
                        Terms & Conditions
                      </a>
                    </label>
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      // onClick={handleSignupFormSubmit}
                    >
                      Sign Up
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <p>
                      Already have an account?{" "}
                      <a href="#" className="text-decoration-none">
                        Log In
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
