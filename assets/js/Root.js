import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Workers from './views/Workers'
import Home from './views/Home'
import Nav from './partials/Nav'

class Root extends React.Component {
	render() {
		return (
      <section className="section">
        <BrowserRouter>
          <Nav />
          <div className="section">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/workers">
                <Workers />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </section>
		);
	}
}

export default Root;