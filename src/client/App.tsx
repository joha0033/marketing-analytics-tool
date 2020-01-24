import React from "react";
import "./app.css";
import Products from "./screens/Products";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Product from "./screens/Product/";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/products/:productId">
          <Product />
        </Route>
        <Route path="/">
          <Products />
        </Route>
      </Switch>
    </Router>
  );
}
