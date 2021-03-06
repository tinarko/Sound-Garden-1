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
import Balance from './components/Balance/Balance.jsx';
import Transactions from './components/Transactions.jsx';
import Budget from './components/Budget.jsx';
import CCCashback from './components/CCCashback.jsx';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Portfolio from './components/Portfolio.jsx';
import EmailNotifications from './components/EmailNotifications.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import Dialog from 'material-ui/Dialog';
import {pink600, cyan500, cyan700, grey400} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: pink600,
    primary2Color: cyan700,
    primary3Color: grey400,
    textColor: cyan500,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Router>
            <div>
              <Navbar />
              <div className="app-body">
                <Route exact path="/" component={Login}/>
                <Route path="/balance" component={Balance}/>
                <Route path="/budget" component={Budget}/>
                <Route path="/ccCashback" component={CCCashback}/>
                <Route path="/portfolio" component={Portfolio}/>
                <Route path="/emailNotifications" component={EmailNotifications}/>
                <Route path="/transactions" component={Transactions}/>
              </div>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
