import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="Header">
          <Header />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
