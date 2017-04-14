import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import * as transactions from './../actions/transactions.js';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    // this.setState({ startDate, endDate });
    // this.props.setSelectedDate({ startDate, endDate });
    this.props.dispatch(transactions.setSelectedDate({startDate, endDate}));
  }

  onFocusChange(focusedInput) {
    // this.setState({ focusedInput });
    this.props.dispatch(transactions.setCalendarFocusedInput(focusedInput));
  }

  render() {
    const { focusedInput, startDate, endDate } = this.props;
    return (
      <div className="calendar">
        <DateRangePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          startDateId="datepicker_start_home"
          endDateId="datepicker_end_home"
          startDatePlaceholderText="Start Date"
          endDatePlaceholderText="End Date"
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    focusedInput: state.transactions.focusedInput,
    startDate: state.transactions.startDate,
    endDate: state.transactions.endDate,
  };
})(Calendar);
