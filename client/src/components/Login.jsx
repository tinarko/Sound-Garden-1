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
          <Card
            style={{'background-color': 'black'}}
          >
            <CardMedia overlay={ 
                <div className="login-overlay">
                  <CardTitle
                    className="login-title"
                    title={`Welcome to Back, ${this.props.name}!`} 
                    titleColor="white"
                    subtitle="Here's where you stand:"
                    subtitleColor="white"
                  />
                  <Balance />
                </div>
              }
              overlayStyle={{width: '100%', margin: 'auto', 'top': '0%', 'text-align': 'center'}}
            >
              <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/J98HWXTPPV.jpg" />
            </CardMedia>
          </Card>
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
                    subtitle="Your one stop shop for all your financial needs"
                    subtitleColor="white"
                  />
                  <RaisedButton label="Sign up" href="/auth/auth0" className="login-button" />
                </div>
              }
              overlayStyle={{width: '100%', margin: 'auto', 'top': '-50%', 'text-align': 'center'}}
            >
              <img src="https://images.pexels.com/photos/237675/pexels-photo-237675.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" />
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
            {/*<CardHeader
              title="hi"
              subtitle="subtitle here"
            />*/}
          /*<div>
            <h1>Welcome to Financial Advisorly!</h1>
            <h3>You are well on your way to saving big</h3>
          </div>*/