import React from 'react';
import { Route } from 'react-router-dom';
import { CTX } from 'store';

import SignIn from 'containers/SignIn';

const PrivateRoute = ({ component, ...options }) => {
    const [appState, dispatch] = React.useContext(CTX);
    const finalComponent = appState.isAuthenticated ? component : SignIn;
  
    return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;
