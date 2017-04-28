import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CreditCard from './CreditCard.jsx';
import MapCalculator from './MapCalculator.jsx';
import { createCreditcardsKickoff, toggleCashbackSetup, getCreditcards } from './../../actions/creditcards.js';
import RaisedButton from 'material-ui/RaisedButton';
import ccImages from './../creditcardImages/ccImages.js';

class CCCashback extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.createCreditcardsKickoff();
  }

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
          <h1>
            <img className='componentIcon' src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTf7zzMiEKSeQpeZ-ZC0r0QB445fmaU2A6lJlXWecQMGxh3NyEg4wLSi5g'/> Maximize Cashback - Setup
          </h1>
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
          <h1>
            <img className='componentIcon' src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTf7zzMiEKSeQpeZ-ZC0r0QB445fmaU2A6lJlXWecQMGxh3NyEg4wLSi5g'/> Maximize Cashback
          </h1>
          <h5> Please add some bank accounts by clicking in the upper left-hand corner > Add Accounts </h5>
          <br/>
          <img className='ccImage' src='https://www.mememaker.net/static/images/memes/4365652.jpg'/>
          <br/>

        </div> 
      );
    } else if (ccName === 'anything') {
      return (
        <div className='component cashback'>
          <h1>
            <img className='componentIcon' src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTf7zzMiEKSeQpeZ-ZC0r0QB445fmaU2A6lJlXWecQMGxh3NyEg4wLSi5g'/> Maximize Cashback
          </h1>
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
          <div>
            <h1>
              <img className='componentIcon' src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTf7zzMiEKSeQpeZ-ZC0r0QB445fmaU2A6lJlXWecQMGxh3NyEg4wLSi5g'/> Maximize Cashback
            </h1>
            <h3>Are you at {mapcalculator.bizName}? </h3>
            <br/>
            <p>Use <span className='em'>{mapcalculator.ccName}</span> for
            </p>
            <br/>
            <img className='ccImage' src={imageURL}/>
            <br/>
            <br/>
            <p> <span className='em'> {mapcalculator.cashbackPercent}%</span> cash back on <span className='em'> {mapcalculator.cashbackCategory}</span>!</p>
            <br/>
            <MapCalculator />
            <br/>
          </div> 
          <div className='setupBottomContainer'>
            <RaisedButton className='setupBottom' label="Setup" onClick={this.props.toggleCashbackSetup} />
          </div>
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
