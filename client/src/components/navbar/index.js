import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import get_user from '../../modules/get_user'
import is_user_logged_in from '../../modules/is_user_logged_in'

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [current_user, setUser] = useState(undefined)

  const toggle = () => setIsOpen(!isOpen);
  
  is_user_logged_in((jwt, user) => {
    if(current_user === undefined){
      get_user(jwt, user, (data) => {
        setUser(data.user.email) // set user email if user is logged in
      })
    }
  })
  
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">InstaShare</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {
              !is_user_logged_in() ?
              <React.Fragment>
                <NavItem>
                  {/* Link component from react router should be used  */}
                  <NavLink href="/users/">Signup</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/users/login">Login</NavLink>
                </NavItem>
              </React.Fragment>
              :
              <React.Fragment>
                <NavItem>
                  <NavLink href="/" onClick={() => sessionStorage.clear()}>Logout</NavLink>
                </NavItem>
              </React.Fragment>
            }
          </Nav>
          {
            current_user && <NavbarText>{current_user}</NavbarText>
          }
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}
