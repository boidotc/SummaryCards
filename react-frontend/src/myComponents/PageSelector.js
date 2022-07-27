import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

import CheckAllCardsPage from "./cardsPage/CheckAllCardsPage";
import CardCreationPage from "./creationPage/CardCreationPage";
import HomePage from "./homePage/HomePage"


function PageSelector(){
    return (
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<CheckAllCardsPage />} />
              <Route path="/create" element={<CardCreationPage />} />
            </Routes>

        </BrowserRouter>
      );
}

export default PageSelector;