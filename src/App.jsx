import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Table from "./components/Table";
//TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <div className="main">
        <NavBar />
        <Table />
        <Footer />
      </div>
    );
  }
}

export default App;
