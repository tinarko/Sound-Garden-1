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

//styling
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Dialog from 'material-ui/Dialog';
import {cyan500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Router>
            <div>
              <Link to="/"><h1>FinancialAdvisorly</h1></Link>
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