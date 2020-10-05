import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Workers from './views/Workers'
import Skills from './views/Skills'
import Nav from './partials/Nav'

class Root extends React.Component {
	render() {
		return (
      <section className="section">
        <BrowserRouter>
          <Nav />
          <div className="section">
            <Switch>
              <Route path="/workers">
                <Workers />
              </Route>
              <Route path="/skills">
                <Skills />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </section>
		);
	}
}

export default Root;