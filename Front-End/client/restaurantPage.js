import React from 'react';
import resAccessor from '../accessor/resAccessor.js';
import Blueprint from '@blueprintjs/core';
import PropTypes from 'prop-types';
import RestaurantTable from './restaurantTable.js';

class RestaurantPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: '',
      resInfo: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  handleSubmit() {
    let info = resAccessor.getRestaurant(this.state.searchStr);
    this.setState({
      resInfo: info,
      //clear the search bar once submitted
      searchStr: '',
    });
  }

  updateState(event) {
    //console.log('change!', event.target.value)
    this.setState({searchStr: event.target.value});
  }

  render() {
    //console.log(resAccessor);
    return (
      <div>
        <div>Enter you restaurant here:<br/>
          <input type="text" value={this.state.searchStr} onChange={this.updateState} />
        </div>
        <button onClick={this.handleSubmit}>
          Search
        </button>
        <div>
          {this.state.resInfo ? this.state.resInfo.status : 'No search yet'}
        </div>
        <div>
          <RestaurantTable resTableProp={this.state.resInfo} />
        </div>
      </div>
    );
  }
}


export default RestaurantPage;
