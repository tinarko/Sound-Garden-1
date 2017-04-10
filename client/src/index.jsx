import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store.js';
import Balance from './components/Balance.jsx';
import Budget from './components/Budget.jsx';
import CCSelector from './components/CCSelector.jsx';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Portfolio from './components/Portfolio.jsx';
import EmailNotifications from './components/EmailNotifications.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render () {
    return (
      <Router>
        <div>
          <h1>Thesis</h1>
          <Navbar />

          <hr/>

          <Route exact path="/" component={Login}/>
          <Route path="/balance" component={Balance}/>
          <Route path="/budget" component={Budget}/>
          <Route path="/ccSelector" component={CCSelector}/>
          <Route path="/portfolio" component={Portfolio}/>
          <Route path="/emailNotifications" component={EmailNotifications}/>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);