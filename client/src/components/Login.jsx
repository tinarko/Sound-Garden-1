import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { createPlaid } from './../actions/plaid.js';
import * as login from './../actions/login.js';
import Balance from './Balance/Balance.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(login.getUser());
  }

  render() {
    return (
      <div className="login">
        {this.props.loggedIn ?
          <div>
            <h1>Welcome Back, {this.props.name}</h1>
            <h3>Here's where you stand: </h3>
            <Balance />
          </div>
        :
          <Card
            style={{'background-color': 'black'}}
          >
            <CardMedia overlay={ 
                <div className="login-overlay">
                  <CardTitle
                    className="login-title"
                    title="Welcome to Advisorly!" 
                    titleColor="white"
                    subtitle="One-stop shop for all your financial needs"
                    subtitleColor="white"
                  />
                  <RaisedButton label="Sign up" href="/auth/auth0" className="login-button" />
                </div>
              }
              overlayStyle={{width: '100%', margin: 'auto', 'top': '-50%', 'text-align': 'center'}}
            >
              <img className='loginImage' src="https://images.pexels.com/photos/237675/pexels-photo-237675.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" />
            </CardMedia>
          </Card>
        }
      </div>
    );
  }
}

export default connect((state) => {
  return {
    loggedIn: state.login.loggedIn,
    name: state.login.name,
    picture: state.login.picture,
  };
}) (Login);
