import React from 'react';

class CCSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  componentDidMount() {
  }

  render () {
    return (
      <div>
        <h1>Credit Card Selector</h1>
        <div>
          <h1>Credit Card Input</h1>
          <h3>What is the cashback for your Wells credit card?:</h3>
          Categories:
          <ul>
            <CCcashback />
          </ul>
        </div>
        <div>
          <h1>Credit Card Selector</h1>
          <p>Are you at Macy's?</p>
          <p>If so, use your Wells credit card</p>
          <p>Map Placeholder</p>
          <GoogleMap />
        </div>
      </div>
    );
  }
}

export default CCSelector;