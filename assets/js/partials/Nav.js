import React from 'react'
import { NavLink} from 'react-router-dom'

const Nav = () => (
  <nav className="navbar">
    <div className="navbar-menu">
      <div className="navbar-start">
        <NavLink exact to="/" className="navbar-item" activeClassName="is-primary">
          Home
        </NavLink>
        <NavLink to="/workers" className="navbar-item" activeClassName="is-primary">
          Workers
        </NavLink>
      </div>
    </div>
  </nav>
)

export default Nav