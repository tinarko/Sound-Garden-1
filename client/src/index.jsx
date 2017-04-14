import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import 'react-dates/lib/css/_datepicker.css';
import { Provider } from 'react-redux';

import store from './store.js';
import Balance from './components/balance/Balance.jsx';
import Transactions from './components/Transactions.jsx';
import Budget from './components/Budget.jsx';
import CCCashback from './components/CCCashback.jsx';
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
          <Link to="/"><h1>Thesis</h1></Link>
          <Navbar />

          <hr/>

          <Route exact path="/" component={Login}/>
          <Route path="/balance" component={Balance}/>
          <Route path="/budget" component={Budget}/>
          <Route path="/ccCashback" component={CCCashback}/>
          <Route path="/portfolio" component={Portfolio}/>
          <Route path="/emailNotifications" component={EmailNotifications}/>
          <Route path="/transactions" component={Transactions}/>
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