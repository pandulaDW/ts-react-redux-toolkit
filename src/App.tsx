import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import ScrapeMain from "./components/Scrape/ScrapeMain";
import DQMain from "./components/DQ/DQMain";
import ConcatMain from "./components/Concat/ConcatMain";
import Sidebar from "./components/Common/Sidebar";
import { getToken, isValidToken } from "./components/Auth/auth";
import RedirectComponent from "./components/Auth/RedirectComponent";
import routes from "./routes";

const App = () => {
  const isValid = isValidToken(getToken());

  const mainComponent = (
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

  return isValid ? mainComponent : <RedirectComponent />;
};

export default App;
