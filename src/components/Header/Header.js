/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import { User } from 'react-feather';

import { CTX } from 'store';
import logo from 'assets/img/logo.png';
import './Header.scss';


const Header = (p) => {

  const [appState, dispatch] = React.useContext(CTX);
  const [popover, popoverState] = React.useState(false);
  const togglePopover = () => popoverState(!popover)
  const profile = appState.bs_user.profile

  const logOut = () => {
    dispatch({type: 'LOG_OUT'});
    localStorage.removeItem('cgo_api_key');
    localStorage.removeItem('profile');
  }

  const linkHome = () => p.props.history.push('/')
  const linkSignUp = () => p.props.history.push('/sign-up')
  const linkSignIn = () => p.props.history.push('/sign-in')
  const linkAddListing = () => p.props.history.push('/listing/create')
  const linkEditProfile = () => p.props.history.push('/profile/edit')
  const linkMyBookings = () => p.props.history.push('/guest/bookings')
  const linkMyProfile = () => p.props.history.push(`/user/${profile.id}`)


  const useOutsideClicked = (ref) => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if(popover) {
          popoverState(false)
        }
      }
    }
    React.useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    });
  }
  const wrapperRef = useRef(null);
  useOutsideClicked(wrapperRef);
  
  return (
    <>
    <nav id="top-nav" className="navbar navbar-light">
      <img src={logo} className="logo-header pointer" alt="Send" onClick={linkHome} />
      <div className="align-items-right d-flex">
        <ul className="nav">
          <li><a className="nav-link" onClick={linkHome}>Explore</a></li>
          <li><a className="nav-link" onClick={linkAddListing}>Host</a></li>
          <li><a className="nav-link" onClick={linkHome}>Help</a></li>
          
          {!appState.isAuthenticated ?
          <>
          <li><a className="nav-link" onClick={linkHome}>About</a></li>
          <li><a className="nav-link" onClick={linkSignIn}>Log In</a></li>
          <li><a className="nav-link outline" onClick={linkSignUp}>Sign Up</a></li>
          </>
          :
          <>
          <li className="d-flex align-items-center">
          <a className="nav-link" onClick={togglePopover}>
            {profile && profile.profile_img_url ? 
              <img src={profile.profile_img_url} alt="My Account" className="rounded-circle avatar"/>
              :
              <User/>
            }
          </a>
          <div ref={wrapperRef} className={[popover ? 'popover-nav active' : 'popover-nav']}>
            <ul className="popover-menu">
              <li className="popover-menu-item"><button onClick={linkMyBookings}>My Bookings</button></li>
              <li className="popover-menu-item"><button onClick={linkMyProfile}>Profile</button></li>
              <li className="popover-menu-item"><button onClick={logOut}>Logout</button></li>
            </ul>
          </div>
          </li>

          </>
          }
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Header;
