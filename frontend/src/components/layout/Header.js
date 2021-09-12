import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logOut } from '../../actions/userActions'


import Search from "./Search";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.cart)


  const logoutHandler = () => {
    dispatch(logOut());
    alert.success('Logged out successfully')
  }
  return (
    <Fragment>
      <nav className="navbar navbar-dark navbar-expand-sm row">
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar"  >
                    <span className="navbar-toggler-icon"></span>
            </button>
            
          <div className="navbar-brand mr-auto">
          <Link to="/">
              <img src="/images/Kart.png" alt="logo" />
            </Link>
            </div>
            <div className="collapse navbar-collapse" id="Navbar">
               
              <div className="col-12 col-md-8 mt-2 mt-md-0">
                  <Route render={({ history }) => <Search history={history} />} />
              </div>

              
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <span id="cart" className="ml-5 navbar-text ">
                <i class="fa fa-shopping-cart"></i> Cart
                </span>
                <span className="ml-1" id="cart_count">
                {cartItems.length}
                </span>
              </Link>
          

          
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                area-haspopup="true"
                area-expended="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>

                <span>{user && user.name}</span>
              </Link>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropDownMenuButton"
                  >

                    {user && user.role === 'admin' && (
                      <Link className="dropdown-item" to="/dashboard"><i class="fa fa-columns"></i> Dashboard</Link>
                    )}
                    <Link className="dropdown-item" to="/orders/me"><i class="fa fa-cart-plus"></i> Orders</Link>
                    <Link className="dropdown-item" to="/me"><i class="fa fa-user"></i> Profile</Link>
                    <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                    <i class="fa fa-sign-out"></i> Logout
                    </Link>
                  </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
          
           
            
          
        </div>

        
       
      </nav>
    </Fragment>
  );
};

export default Header;
