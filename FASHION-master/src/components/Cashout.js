import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../global/AuthContext";
import { CartContext } from "../global/CartContext";
import { db, auth } from "../firebase/config";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

export const Cashout = (props) => {
  const history = useHistory();

  const { shoppingCart, totalPrice, totalQty, dispatch } =
    useContext(CartContext);

  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  //Random Number
  var Number = 54;
  var randomNumber = Math.floor(Math.random() * Number + 1);

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  });

  const cashoutHandle = (e) => {
    e.preventDefault();
    setEmail(currentUser.email);

    auth.onAuthStateChanged((user) => {
      if (user) {
        const Test2 = [];

        // eslint-disable-next-line
        const productsFromShoppingCat = shoppingCart.map((item) => {
          Test2.push(item);
        });

        db.collection("myorders")

          .doc(user.uid + randomNumber)
          .set({
            Name: name,
            Email: email,
            Phone: phone,
            Street: street,
            Zip: zip,
            City: city,
            Quantity: totalQty,
            TotalPrice: totalPrice,
            order: Test2,
            Ordered_On: new Date().toLocaleString(),
          })

          .then(() => {
            setName("");
            setPhone("");
            setStreet("");
            setZip("");
            dispatch({ type: "EMPTY" });
            setSuccessMsg(
              "You have Successfully placed your Order. "
            );
            setTimeout(() => {
              history.push("/");
            }, 6000);
          })
          .catch((err) => setError(err.massage));
      }
    });
  };

  return (
    <>
      <div className="container">
        <br />
        <h2>Cashout Details</h2>
        <br />

        {successMsg && <div className="success-msg">{successMsg}</div>}
        <form
          autoComplete="off"
          // className="form-group"
          onSubmit={cashoutHandle}
        >
          <div style={{ display: "flex"}}>
            <TextField
              style={{ width: "300px" }}
              label="Full Name"
              variant="filled"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* <label htmlFor="email">Email</label> */}
            |
            <TextField
              style={{ width: "300px" }}
              label="Email"
              variant="filled"
              required
              onChange={() => setEmail(currentUser.email)}
              value={email}
            />
          </div>
          <br />
          {/* <label htmlFor="Phone Number">Phone Number</label> */}
          <br />
          <div style={{ display: "flex" }}>
            <TextField
              style={{ width: "300px" }}
              label="Contact Number"
              variant="filled"
              required
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              minLength={10}
            />
            <br />
            |
            {/* <label htmlFor="Street">Street</label> */}
            <br />
            <TextField
              style={{ width: "300px" }}
              label="Street"
              variant="filled"
              required
              onChange={(e) => setStreet(e.target.value)}
              value={street}
            />
          </div>
          <br />
          {/* <label htmlFor="zip">Zip Code</label> */}
          <br />
          <div style={{display: 'flex'}}>
          <TextField
            style={{ width: "300px" }}
            label="Zip Code"
            variant="filled"
            required
            onChange={(e) => setZip(e.target.value)}
            value={zip}
          />
          |
          <br />
          {/* <label htmlFor="City">City</label> */}
          <br />
          <TextField
            style={{ width: "300px" }}
            label="City"
            variant="filled"
            required
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          </div>
          <br />
          {/* <label htmlFor="Price To Pay">Price To Pay</label> */}
          <br />
          <div style={{display: 'flex'}}>
          <TextField
            style={{ width: "300px" }}
            label="Price To Pay"
            variant="filled"
            required
            value={totalPrice}
            disabled
          />
          |
          <br />
          {/* <label htmlFor="Total No of Products">Total No of Products</label> */}
          <br />
          <TextField
            style={{ width: "300px" }}
            label="Total No of Products"
            variant="filled"
            required
            value={totalQty}
            disabled
          />
          </div>
          <br />
          <button type="submit" className="btn btn-success btn-md mybtn">
            SUBMIT
          </button>
        </form>
        {error && <span className="error-msg">{error}</span>}
      </div>
    </>
  );
};
