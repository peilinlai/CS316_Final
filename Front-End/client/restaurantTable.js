import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import style from './offerings.css';

class RestaurantTable extends React.Component {
  render() {
    if (this.props.resTableProp) {
      return (
         <div>{
           _.map(
             this.props.resTableProp.data.offering,
             (offer) => <TableRow tableRowProp={offer}/>
           )
         }</div>
      );
    }
    return null;
  }
}


class TableRow extends React.Component {
   render () {
     return (
       <div class = "Offering_details">
        {this.props.tableRowProp.offering_name},
        {this.props.tableRowProp.offering_price},
        {this.props.tableRowProp.offering_rating}
        <br/>
        <br/>
        <br/>
       </div>
    );
  }
}

RestaurantTable.propTypes ={
  resTableProp: PropTypes.object,
}
TableRow.propTypes ={
  tableRowProp: PropTypes.object.isRequired,
}
export default RestaurantTable;
