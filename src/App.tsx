import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import ScrapeMain from "./components/Scrape/ScrapeMain";
import DQMain from "./components/DQ/DQMain";
import ConcatMain from "./components/Concat/ConcatMain";
import Sidebar from "./components/Common/Sidebar";
import { setTokens } from "./components/Auth/auth";
import RedirectComponent from "./components/Auth/RedirectComponent";
import routes from "./routes";

const App = () => {
  let isValid = setTokens();
  if (!isValid && process.env.NODE_ENV === "development") isValid = true;

  const MainComponent = (
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

  return isValid ? MainComponent : <RedirectComponent />;
};

export default App;
