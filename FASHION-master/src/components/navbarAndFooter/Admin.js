import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../global/AuthContext";
import { Button } from "react-bootstrap";
import { cart } from "react-icons-kit/entypo/cart";
import { Icon } from "react-icons-kit";
import { CartContext } from "../../global/CartContext";
import { useHistory } from "react-router-dom";

const AdminNav = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const { totalQty } = useContext(CartContext);
  const Admin = currentUser.uid === process.env.REACT_APP_ADMIN_ID;
  return (
    <>
      <nav
        className="navbar navbar-dark bg-dark"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <div className="container-fluid"></div>
        <div>
          <div style={{ display: "flex" }}>
            <NavLink
              className="navbar-brand"
              style={{ marginRight: "690px", fontWeight: "bold" }}
              to="/"
            >
              Grocery App
            </NavLink>
            <div>
              {currentUser && (
                <h5 style={{ color: "white" }}>
                  Hello
                  <span
                    className="font-weight-lighter m-2 p-2"
                    style={{ color: "white" }}
                  >
                    {currentUser.email}
                  </span>
                </h5>
              )}
            </div>

            {!Admin && (
              <NavLink to="/cart">
                <Icon icon={cart} size={30} style={{ color: "orange" }} />
                <span className="font-weight-bolder text-danger mr-3">
                  {totalQty}
                </span>
              </NavLink>
            )}
            {!currentUser && (
              <NavLink to="/signup" className="navLinks">
                Sign Up
              </NavLink>
            )}

            {/* Show the Button if user is logged in */}
            {currentUser.uid === process.env.REACT_APP_ADMIN_ID ? (
              <Button
                className="btn-warning"
                onClick={() => {
                  history.push("/orders");
                }}
              >
                Orders
              </Button>
            ) : (
              ""
            )}
            {Admin && (
              <Button
                className="btn btn-danger"
                onClick={() => {
                  history.push("/addproducts");
                }}
              >
                AddProduct
              </Button>
            )}
            {currentUser ? (
              <Button className="btn" onClick={() => logout()}>
                Logout
              </Button>
            ) : (
              <NavLink to="/login" className="navLinks">
                Login
              </NavLink>
            )}
          </div>
        </div>
        <br />
      </nav>
    </>
  );
};

export default AdminNav;
