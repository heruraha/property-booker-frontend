import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

import { CTX } from 'store';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import APIService from 'services/backstrap/apiService';
import SideModal from 'components/SideModal/SideModal';

import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import ResetPassword from 'containers/ResetPassword';
import ForgotPassword from 'containers/ForgotPassword';
import MainScreen from 'containers/MainScreen';
import EditProfile from 'containers/EditProfile';
import EditListing from 'containers/EditListing';
import ViewListing from 'containers/ViewListing';
import ViewProfile from 'containers/ViewProfile';
import GuestBookings from 'containers/GuestBookings';
import NotFound from 'containers/NotFound';

const privateRoutes = [
  {
    path: "/",
    component: MainScreen,
    exact: true
  },
  {
    path: "/profile/edit",
    component: EditProfile,
    exact: true
  },
  {
    path: "/listing/create",
    component: EditListing,
    exact: true
  },
  {
    path: "/listing/edit/:id/",
    component: EditListing,
    exact: true
  },
  {
    path: "/property/:id/",
    component: ViewListing,
    exact: true
  },
  {
    path: "/user/:id",
    component: ViewProfile,
    exact: true
  },
  {
    path: "/guest/bookings/",
    component: GuestBookings,
    exact: true
  },
];

const publicRoutes = [
  {
    path: "/sign-in",
    component: SignIn,
    exact: true
  },
  {
    path: "/sign-up",
    component: SignUp,
    exact: true
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    exact: true
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    exact: true
  },
]

const Routes = () => { 
  const [appState, dispatch] = React.useContext(CTX);

  const authCheck = () => {
    const savedToken = localStorage.getItem('cgo_api_key');
    if (savedToken) {
      APIService.checkToken(appState.bs_user.cgo_api_key)
      .then((res) => {
        dispatch({type: 'LOADING_DISABLED'});
        dispatch({type: 'USER_IS_AUTHENTICATED'});
      })
      .catch((err) => { 
        console.log(err, 'authCheck');
        if(err.status === 401) {
          localStorage.removeItem('cgo_api_key');
          localStorage.removeItem('profile');
          dispatch({type: 'LOG_OUT'});
          dispatch({type: 'LOADING_DISABLED'});
        }
      })  
    }
  }

  React.useEffect(() => authCheck(), [appState.bs_user.token]);

  return (
  <Router>
    <div className="app-container d-flex">

    { appState.isLoading === true &&
      <div className="loading-container">
        <BarLoader
          sizeUnit={"px"}
          size={150}
          color={'#416F37'}
          loading={appState.isLoading}
        />
      </div> 
    }
      <main>
        <Switch>
          {publicRoutes.map((route, i) => <Route key={i} path={route.path} component={route.component} exact={route.exact} />)}
          {privateRoutes.map((route, i) => <PrivateRoute key={i} path={route.path} component={route.component} exact={route.exact} />)}
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
    <SideModal />
  </Router>
  )
}

export default Routes