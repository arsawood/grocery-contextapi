import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import { cart } from "react-icons-kit/entypo/cart";
import { Icon } from "react-icons-kit";
import { CartContext } from "../../global/CartContext";

function Navbar() {
  const { totalQty } = useContext(CartContext);

  return (
    <>
      <nav
        className="navbar navbar-dark bg-dark"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <div className="container-fluid"></div>
        <div>
          <div style={{ display: "flex" }}>
            <Link
              className="navbar-brand"
              style={{ marginRight: "690px", fontWeight: "bold" }}
              to="/"
            >
              Grocery App
            </Link>
            <div style={{ marginRight: "150px" }}>
              <Link
                style={{ marginRight: "20px" }}
                to="/signup"
                className="navLinks btn btn-primary"
              >
                SignUp
              </Link>

              <Link
                style={{ marginRight: "20px" }}
                to="/login"
                className="navLinks btn btn-success"
              >
                Login
              </Link>

              <Link to="/cart">
                <Icon icon={cart} size={30} style={{ color: "orange" }} />
                <span className="font-weight-bolder text-danger mr-3">
                  {totalQty}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
