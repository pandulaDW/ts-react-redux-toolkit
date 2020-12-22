import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Common/Header";
import ScrapeMain from "./components/Scrape/ScrapeMain";
import Sidebar from "./components/Common/Sidebar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="Header">
          <Header />
        </div>
        <div className="Sidebar">
          <Sidebar />
        </div>
        <div className="Main">
          <ScrapeMain />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
