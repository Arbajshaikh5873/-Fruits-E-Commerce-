import React, { useState } from "react";

export function Navbar(props) {
  let { cartList } = props;
  let { validUser } = props;
  let { view } = props;
  // let length = validUser.name.length;
  let [isMenuOpen, setIsMenuOpen] = useState(false);

  let total = 0;
  cartList.forEach((item) => {
    let mrp = item.mrp - (item.mrp * item.discount) / 100;
    total += item.qty * mrp;
  });

  function handleClick(view) {
    props.onViewChange(view);
    setIsMenuOpen(false);
  }

  function handleLogOutClick() {
    props.onLogOutClick();
    setIsMenuOpen(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger sticky-top shadow">
      <div className="container-fluid">
        {/* Logo */}
        <div
          className="navbar-brand"
          onClick={() => handleClick("products")}
          style={{ cursor: "pointer" }}
        >
          <img
            src="/logo/shop_logo.jpg"
            alt="Shop Logo"
            className="img-fluid rounded-circle"
            style={{ maxHeight: "50px", width: "auto" }}
          />
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbarContent"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarContent"
        >
          <div className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            {/* Auth Buttons */}
            <div className="d-flex flex-column flex-lg-row align-items-center">
              {validUser ? (
                <>
                  <span className="text-white fw-bold me-3">
                    {" "}
                    welcome {validUser.name}
                  </span>
                  <button
                    className="btn btn-light m-1 m-lg-2 px-3 py-2 fw-bold"
                    onClick={handleLogOutClick}
                  >
                    <i class="bi bi-door-open"></i>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-light m-1 m-lg-2 px-3 py-2 fw-bold"
                    onClick={() => handleClick("LogIn")}
                  >
                    <i className="bi bi-box-arrow-in-right"></i>
                    Login
                  </button>
                  <button
                    className="btn btn-light m-1 m-lg-2 px-3 py-2 fw-bold"
                    onClick={() => handleClick("SignUp")}
                  >
                    <i class="bi bi-person-plus"></i>
                    Signup
                  </button>
                </>
              )}
            </div>

            {/* Cart */}
            {view !== "admin" && (
              <>
                <div
                  className="d-flex flex-column align-items-center ms-lg-4 p-2 bg-white text-danger rounded shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClick("cart")}
                >
                  <div className="d-flex align-items-center">
                    <i className="bi bi-cart3 fs-4"></i>
                    <span className="ms-2 bg-danger text-white rounded-pill px-2 py-1 fw-bold">
                      {cartList.length}
                    </span>
                  </div>
                  <div className="mt-1 fw-bold">
                    <i className="bi bi-currency-rupee"></i>
                    {total.toFixed(2)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
