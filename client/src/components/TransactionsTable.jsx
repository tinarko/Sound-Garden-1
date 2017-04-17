import React, {Component} from 'react';
import DataTables from 'material-ui-datatables';

class TransactionsTable extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log('inside the data table-------', this.props);
    const tableColumns = [
      {
        key: 'name',
        label: 'Transaction'
      }, {
        key: 'amount',
        label: 'Amount'
      }, {
        key: 'institution_name',
        label: 'Bank'
      }, {
        key: 'date',
        label: 'Date'
      }
    ];
    const tableData = [];
    this.props.data.forEach((value) => {
      tableData.push({
        name: value.name,
        amount: `$${value.amount}`,
        institution_name: value.institution_name,
        date: value.date.toString().slice(0,10),
      });
    });
    console.log('table data', tableData)
    return (
      <div className="transactions-table">
        <DataTables
          height={'auto'}
          showRowHover={false}
          columns={tableColumns}
          data={tableData}
          showCheckboxes={false}
          selectable={true}
          page={1}
          count={100}
        />
      </div>
    );
  }
}
export default TransactionsTable;