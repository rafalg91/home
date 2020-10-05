import React from 'react'
import { NavLink} from 'react-router-dom'

const Nav = () => (
  <nav className="navbar">
    <div className="navbar-menu">
      <div className="navbar-start">
        <NavLink to="/workers" className="navbar-item" activeClassName="is-primary">
          Workers
        </NavLink>
        <NavLink to="/skills" className="navbar-item" activeClassName="is-primary">
          Skills
        </NavLink>
      </div>
    </div>
  </nav>
)

export default Nav