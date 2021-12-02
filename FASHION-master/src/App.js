import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/user/Signup";
import Login from "./components/user/Login";

import NavAndFooter from "./components/navbarAndFooter/NavAndFooter";
import AuthProvider from "./global/AuthContext";
import CartContextProvider from "./global/CartContext";
import Cart from "./components/Cart";
import { Cashout } from "./components/Cashout";
import AddProducts from './components/AddProducts';

function App() {
  return (
    <div className="App">
      {/* <AddProducts/> */}
      <Router>
        <AuthProvider>
          <CartContextProvider>
            <Switch>
              <NavAndFooter>
                <Route path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/cashout" component={Cashout} />
                <Route exact path="/" component={Home} />
              </NavAndFooter>
            </Switch>
          </CartContextProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}
export default App;
