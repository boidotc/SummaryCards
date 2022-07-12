import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

import CheckAllCardsPage from "./cardsPage/CheckAllCardsPage";

function PageSelector(){
    return (
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<h1>Home page TBD</h1>} />
              <Route path="/cards" element={<CheckAllCardsPage></CheckAllCardsPage>} />
              <Route path="/create" element={<h1>Creation page TBD</h1>} />
            </Routes>

        </BrowserRouter>
      );
}

export default PageSelector;