import React, { PropTypes } from 'react';
import { DateRangePicker } from 'react-dates';
import * as transactions from './../actions/transactions.js';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
    };
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
    // this.props.setSelectedDate({ startDate, endDate });
    this.props.dispatch(transactions.setSelectedDate({startDate, endDate}));
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    return (
      <div>
        <DateRangePicker className="calendar"
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

export default Calendar;
