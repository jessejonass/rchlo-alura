import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './assets/css/base/base.css';

import Home from './paginas/Home';
import Sobre from './paginas/Sobre';
import NotFound from './paginas/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sobre" component={Sobre} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
