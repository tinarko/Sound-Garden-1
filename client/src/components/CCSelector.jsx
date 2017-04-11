import React from 'react';
import CCCashbackSetup from './CCCashbackSetup.jsx'

class CCSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render () {

    return (
      <div>

        <h1>Credit Card Selector</h1>
        <CCCashbackSetup />
      </div>
    );
  }
}

export default CCSelector;
        // <CCSuggestion/>
        // <GoogleMap />
