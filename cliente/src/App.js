import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Search from "./Search/Search";
import Productos from "./Productos/Productos";
import Item from "./Item/Item";




function App() {
  return (
    <>
      <Router>
        <Search />
        {<Switch>
          <Route exact path="/items" component={Productos} />
          <Route path="/items/:id" component={Item} />
        </Switch>}
      </Router>
    </>
  );
}

export default App;
