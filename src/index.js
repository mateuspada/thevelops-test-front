import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Auth from './components/Auth';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Login} />    
            <Route path="/user/:id/edit" component={ProfileEdit} />

            <Auth>
                <Route path="/user/:id" component={Profile} />        
                
            </Auth>                         
        </Switch>                      
    </BrowserRouter>

    
    , document.getElementById('root')
);

//<Route path="/sobre"  exact={true} component={Sobre} />     
//<Route path='*' component={ComponenteDePagina404} />
registerServiceWorker();
