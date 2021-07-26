import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import ScrapeMain from "./components/Scrape/ScrapeMain";
import DQMain from "./components/DQ/DQMain";
import ConcatMain from "./components/Concat/ConcatMain";
import Sidebar from "./components/Common/Sidebar";
import routes from "./routes";

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
          <Route path={routes.scrape} exact>
            <ScrapeMain />
          </Route>
          <Route path={routes.dq}>
            <DQMain />
          </Route>
          <Route path={routes.concat}>
            <ConcatMain />
          </Route>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
