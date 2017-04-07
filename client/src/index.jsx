import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Balance from './components/Balance.jsx';
import Budget from './components/Budget.jsx';
import CCSelector from './components/CCSelector.jsx';
import Portfolio from './components/Portfolio.jsx';
import EmailNotifications from './components/EmailNotifications.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './reducers/appReducer.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  componentDidMount() {
    // let myRequest = new Request('/auth/facebook');
    // return fetch(myRequest)
    //   .then((response) => {
    //     console.log('here is the successful response', response);
    //     if (response) {
    //       this.setState({
    //         signedin: true,
    //       });
    //     } 
    //   })
    //   .catch((err) => {
    //     console.log('error', error);
    //   });
  }

  render () {
    return (
      <Router>
        <div>
        <h1>Thesis</h1>
        <ul>
          <li><Link to="/">Balance</Link></li>
          <li><Link to="/budget">Budget</Link></li>
          <li><Link to="/ccSelector">CC Selector</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/emailNotifications">Email Notifications</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>

        <hr/>

        <Route exact path="/" component={Balance}/>
        <Route path="/budget" component={Budget}/>
        <Route path="/ccSelector" component={CCSelector}/>
        <Route path="/portfolio" component={Portfolio}/>
        <Route path="/emailNotifications" component={EmailNotifications}/>

        </div>
      </Router>
    );
  }
}

let store = createStore(appReducer);

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
 document.getElementById('app'));