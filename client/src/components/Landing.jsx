import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import * as login from './../actions/login.js';
import Balance from './../components/Balance/Balance.jsx';


class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(login.getUser());
  }

  render() {
    return (
      <div>
        <Card>
          <CardMedia 
              overlay={ 
              <div className="login-overlay">
                <CardTitle
                  className="login-title fontOverride"
                  title={this.props.loggedIn ? `Welcome , ${this.props.name}` : 'One-stop shop for all your financial needs'}
                  titleColor="white"
                />
                {this.props.loggedIn ? <div/> : <RaisedButton label="Sign up" href="/auth/auth0" className="login-button fontOverride" />}
              </div>
            }
            overlayStyle={{width: '100%', margin: 'auto', 'top': '-25%', 'textAlign': 'center'}}
          >
            <img className='loginImage' src="http://reydman.com/wp-content/uploads/2016/07/accounting-1200x518.jpg"/>
          </CardMedia>
        </Card>
        <div>

          <section className="row">
            <div className="grid">

              <section className="teaser col-1-4">
                {this.props.loggedIn ?
                  <Link to="/balance">
                    <img src="data:image/png;base64,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" alt="Balance"/>
                    <br/>
                    <h3>Balance</h3>
                  </Link>
                  :
                  <div>
                    <img src="data:image/png;base64,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" alt="Balance"/>
                    <br/>
                    <h3>Balance</h3>
                  </div>
                }
                <p>View all of your bank accounts' balances</p>
              </section>

              <section className="teaser col-1-4">
                {this.props.loggedIn ?
                  <Link to="/budget">
                    <img src="data:image/png;base64,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" alt="Budget"/>
                    <br/>
                    <h3>Budget</h3>
                  </Link>
                  :
                  <div>
                    <img src="data:image/png;base64,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" alt="Budget"/>
                    <br/>
                    <h3>Budget</h3>
                  </div>
                }
                <br/>
                <p>Set monthly goals and save</p>
              </section>
              
              <section className="teaser col-1-4">
                {this.props.loggedIn ?
                  <Link to="/ccCashback">
                    <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTf7zzMiEKSeQpeZ-ZC0r0QB445fmaU2A6lJlXWecQMGxh3NyEg4wLSi5g" alt="Cashback"/>
                    <br/>
                    <h3>Cashback</h3>
                  </Link>
                  :
                  <div>
                    <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTf7zzMiEKSeQpeZ-ZC0r0QB445fmaU2A6lJlXWecQMGxh3NyEg4wLSi5g" alt="Cashback"/>
                    <br/>
                    <h3>Cashback</h3>
                  </div>
                }
                <p>Maximize your credit card cashback rewards anywhere</p>
              </section>

              <section className="teaser col-1-4">
                {this.props.loggedIn ?
                  <Link to="/transactions">
                    <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTTm50tK43pGJ9EWr66kD9lELxuufTfyB9Yhoej0Fohs8ZnBb8i" alt="Transactions"/>
                    <br/>
                    <h3>Transactions</h3>
                  </Link>
                  :
                  <div>
                    <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTTm50tK43pGJ9EWr66kD9lELxuufTfyB9Yhoej0Fohs8ZnBb8i" alt="Transactions"/>
                    <br/>
                    <h3>Transactions</h3>
                  </div>
                }
                <p>View any transactions within date ranges</p>
              </section>
            </div>
          </section>
        </div>
      </div>);    
  }
}

export default connect ((state) => {
  return {
    loggedIn: state.login.loggedIn,
    name: state.login.name
  };
}) (Landing);