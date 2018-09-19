import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Login} />                   
        </Switch>
    </BrowserRouter>
    , document.getElementById('root')
);

//<Route path="/sobre" component={Sobre} />     
//<Route path='*' component={ComponenteDePagina404} />
registerServiceWorker();
