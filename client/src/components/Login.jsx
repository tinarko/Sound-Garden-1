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
          <Card>
            <CardMedia
              overlay={<CardTitle title="overlay title" subtitle="Overlay subtitle"/>} 
              
            >
              <img src="https://images.pexels.com/photos/237675/pexels-photo-237675.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" />
            </CardMedia>
            <CardTitle title="card title" subtitle="subtitle here"/>
            <CardText>
              text goes here
            </CardText>
          </Card>
        :
          <Card
            style={{'background-color': 'black'}}
          >
            <CardMedia overlay={ 
                <div>
                  <CardTitle
                    className="login-title"
                    title="Welcome to Advisorly!" 
                    titleColor="white"
                    subtitle="You are well on your way to saving big"
                    subtitleColor="white"
                    style={{'padding': '5% 0'}}
                  />
                  <h3 className="login-caption">hi</h3>
                </div>
              }
              overlayStyle={{width: '100%', margin: 'auto', 'top': '-50%', 'text-align': 'center'}}
            >
              <img src="https://images.pexels.com/photos/237675/pexels-photo-237675.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" />
            </CardMedia>
            <CardTitle title="card title" subtitle="subtitle here"/>
            <CardText>
              text goes here
            </CardText>
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