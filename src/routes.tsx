import React from 'react';
import { Route , BrowserRouter, Switch} from 'react-router-dom';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import DescriptionPage from './pages/Description';

const Routes = () => {

    return(
        
        
            <BrowserRouter>
                <Switch>
                    <Route component={LoginPage} path="/" exact />
                    <Route component={HomePage} path="/home" />
                    <Route component={DescriptionPage} path="/description/:id" />
                </Switch>
            </BrowserRouter>
        
    );


}

export default Routes;