import React, { Component } from 'react';

class SpinButton extends Component {
  // sets number of spins in App state
  handleSpin = () => {
    let thisAmount = Math.floor(Math.random() * (36 - 20) + 20);
    this.props.spinAmount(thisAmount);
  }

  render() {
    return (
      <div id="spinBtnContainer">
        <button type="submit"
          id="spinnerBtn"
          onClick={this.handleSpin}>Spin</button>
      </div>
    );
  }
}

export default SpinButton;
