import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CreditCard from './CreditCard.jsx'
import MapCalculator from './MapCalculator.jsx';
import { createCreditcardsKickoff, toggleCashbackSetup, getCreditcards } from '../actions/creditcards.js';
import RaisedButton from 'material-ui/RaisedButton';
import ccImages from './creditcardImages/ccImages.js'

class CCCashback extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.createCreditcardsKickoff();
  }

  // componentDidMount () {
  // }

  render () {
    var creditcards = this.props.creditcards.cc.map( (cc, index) => {
              return (<CreditCard 
                className="component" 
                creditcard={cc} 
                key={index} 
                ccindex={index}
                />);
            });

    var mapcalculator = this.props.mapcalculator;
    var ccName = mapcalculator.ccName;

    if (this.props.creditcards.cashbacksetup) {
      return (
        <div className='component cashback'>
          <h1>Maximize Cashback - Setup</h1>
          <br/>
          <ul>
            { creditcards }
          </ul>
          <br/>
          <RaisedButton label="Back" onClick={this.props.toggleCashbackSetup} />
          <br/>
          
        </div> );
    } else if (creditcards.length === 0) {
        return (
        <div className='component cashback'>
          <h1>Maximize Cashback</h1>
          <br/>
          <h5> Please add some bank accounts by clicking in the upper left-hand corner > Add Accounts </h5>
          <br/>
          <img className='ccImage' src='https://www.mememaker.net/static/images/memes/4365652.jpg'/>
          <br/>

        </div> 
        );
    } else if (ccName == 'anything') {
        return (
        <div className='component cashback'>
          <h1>Maximize Cashback</h1>
          <br/>
          <img className='ccImage' src='https://www.mememaker.net/static/images/memes/4365652.jpg'/>
          <br/>
          <h3> Please setup your credit card cashback categories below! </h3>
          <br/>
          <RaisedButton label="Setup" onClick={this.props.toggleCashbackSetup} />
          <br/>
        </div> 
        );
    } else {
        var imageURL = ccImages[mapcalculator.bank];
        return (
        <div className='component cashback'>
          <h1>Maximize Cashback</h1>
          <br/>
          <h3>Are you at {mapcalculator.bizName}? </h3>
          <br/>
          <p>If so, please use your: </p>
          <h5>{mapcalculator.ccName}</h5>
          <br/>
          <img className='ccImage' src={imageURL}/>
          <br/>
          <br/>
          <p> ...for <em>{mapcalculator.cashbackPercent}%</em> cash back on: </p>
          <h5>{mapcalculator.cashbackCategory}!</h5>
          <br/>
          <MapCalculator />
          <br/>
          <RaisedButton className='setupBottom' label="Setup" onClick={this.props.toggleCashbackSetup} />
        </div> 
        );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    creditcards: state.creditcards,
    mapcalculator: state.mapcalculator,
    state: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCreditcardsKickoff: () => { dispatch(createCreditcardsKickoff()); },
    toggleCashbackSetup: () => {dispatch(toggleCashbackSetup()); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CCCashback);
