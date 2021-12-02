//FIXME:

import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../global/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../global/AuthContext";
import { Icon } from "react-icons-kit";
import { ic_add } from "react-icons-kit/md/ic_add";
import { ic_remove } from "react-icons-kit/md/ic_remove";
import { iosTrashOutline } from "react-icons-kit/ionicons/iosTrashOutline";

const Cart = () => {
  const { shoppingCart, dispatch, totalPrice, totalQty } =
    useContext(CartContext);
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  });

  return (
    <>
      <>
        {shoppingCart.length !== 0 && <h1>Cart</h1>}
        <div className="cart-container">
          {shoppingCart.length === 0 && (
            <>
              <div>No Items in your cart,(Refresh the page)</div>
              <div>
                <Link to="/">Return to Home page</Link>
              </div>
            </>
          )}
          {shoppingCart &&
            shoppingCart.map((cart) => (
              <div className="cart-card" key={cart.id}>
                <div className="cart-img">
                  <img src={cart.ProductImage} alt={cart.ProductName} />
                </div>

                <div className="cart-name">{cart.ProductName}</div>

                <div className="cart-price-orignal">
                  Rs. {cart.ProductPrice}
                </div>
                <div
                  className="dec"
                  onClick={() => dispatch({ type: "DEC", id: cart.id, cart })}
                >
                  <Icon icon={ic_remove} size={24} />
                </div>

                <div className="quantity">{cart.qty}</div>

                <div
                  className="inc"
                  onClick={() => dispatch({ type: "INC", id: cart.id, cart })}
                >
                  <Icon icon={ic_add} size={24} />
                </div>

                <div className="cart-price"> {cart.totalPrice} Rs.</div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    dispatch({ type: "DELETE", id: cart.id, cart })
                  }
                >
                  <Icon icon={iosTrashOutline} size={24} />
                </button>
              </div>
            ))}
          {shoppingCart.length > 0 && (
            <div className="cart-summary">
              <div className="cart-summary-heading">Cart-Summary</div>
              <div className="cart-summary-price">
                <span>Total Price</span>
                <span>{totalPrice}</span>
              </div>
              <div className="cart-summary-price">
                <span>Total Quantity</span>
                <span>{totalQty}</span>
              </div>
              <Link to="cashout" className="cashout-link">
                <button
                  className="btn btn-success btn-md"
                  style={{ marginTop: 5 + "px" }}
                >
                  Confirm Order
                </button>
              </Link>
            </div>
          )}
        </div>
      </>
    </>
  );
};
export default Cart;
