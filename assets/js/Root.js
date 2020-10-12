import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Sidebar from './layouts/Sidebar'
import Workers from './views/Workers'
import Skills from './views/Skills'
import Access from './views/Access'
import Logs from './views/Logs'

class Root extends React.Component {
	render() {
		return (
      <BrowserRouter>
        <Sidebar />
        <main className="main">
          <Switch>
            <Route path="/workers">
              <Workers />
            </Route>
            <Route path="/skills">
              <Skills />
            </Route>
            <Route path="/access">
              <Access />
            </Route>
            <Route path="/logs">
              <Logs />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
		);
	}
}

export default Root;