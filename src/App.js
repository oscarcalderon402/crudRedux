// import React, { Fragment } from 'react';
import Header from './components/Header';

import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProductos';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditarProducto from './components/EditarProducto';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-5">
        <Switch>
          <Route exact path="/" component={Productos} />
          <Route exact path="/productos/nuevos" component={NuevoProducto} />
          <Route
            exact
            path="/productos/editar/:id"
            component={EditarProducto}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
