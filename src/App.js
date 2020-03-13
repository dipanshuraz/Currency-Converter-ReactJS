import React, { Component } from "react";
import Converter from "./components/Converter";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div>
        <Converter />
      </div>
    );
  }
}

export default App;
