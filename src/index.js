import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Login from './Login';
import Sobre from './Sobre';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/sobre" component={Sobre} />            
        </Switch>
    </BrowserRouter>
    , document.getElementById('root')
);

//<Route path='*' component={ComponenteDePagina404} />
registerServiceWorker();
