import React from 'react'
import { NavLink} from 'react-router-dom'

const Sidebar = () => (
  <aside className="sidebar">
    <h1 className="sidebar__title">
      <span className="is-secondary">Access</span> App
    </h1>
    <nav className="nav">
      <div className="nav__item">
        <NavLink to="/workers" className="nav__link" activeClassName="nav__link--active">
          <i className="fas fa-user nav__icon"></i>
          Workers
        </NavLink>
      </div>
      <div className="nav__item">
        <NavLink to="/skills" className="nav__link" activeClassName="nav__link--active">
          <i className="fas fa-plus-circle nav__icon"></i>
          Skills
        </NavLink>
      </div>
      <div className="nav__item">
        <NavLink to="/access" className="nav__link" activeClassName="nav__link--active">
          <i className="fas fa-key nav__icon"></i>
          Access
        </NavLink>
      </div>
      <div className="nav__item">
        <NavLink to="/logs" className="nav__link" activeClassName="nav__link--active">
          <i className="fas fa-search nav__icon"></i>
          Logs
        </NavLink>
      </div>
    </nav>
  </aside>
)

export default Sidebar