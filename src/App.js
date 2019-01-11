import React, { Component } from 'react';
import './App.css';

const slotChoices = [
  "cherry",
  "banana",
  "coconut",
  "apple",
  "durian",
  "grape"
];

/*================================
      APP - parent component
================================*/
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: slotChoices,
      choice:  "cherry",
      index: 0,
      counter: 0,
      numberOfSpins: 12, // spinReelAmount declared
    }
    this.spin = null;
  }


  spinOnce = (arr) => {
    arr = this.state.content;
    console.log(this.state.index,
                arr.length,
                this.state.counter,
                this.state.numberOfSpins);
    this.setState( prevState => {
      return {
        choice: arr[this.state.index],
        counter: prevState.counter + 1,
        index: prevState.index < arr.length-1 ?
        prevState.index + 1
        :
        this.resetIndexToZero(),
      }
    });

    if (this.state.counter >= this.state.numberOfSpins) {
      clearInterval(this.spin);
      this.resetReel();
    }
  }

  resetIndexToZero = () => {
     this.setState({ index: 0 });
  }

  spinCycle = () => {
    this.spin = setInterval(this.spinOnce, 100, slotChoices)
  }

  spinAmount = (thisAmount) => {
    this.setState({
      numberOfSpins: thisAmount,
    }, this.spinCycle());
  }

  resetReel = () => {
    this.setState({
      choices: slotChoices[0],
      counter: 0,
    });
  }

  render() {
    return (
      <main>
        <header>
          <h1 id="title">Lost Wages</h1>
        </header>
        <section className="spindle">
          <Slot result={this.state.choice} />
          <Slot result={this.state.choice} />
          <Slot result={this.state.choice} />
        </section>
        <SpinButton spinAmount={this.spinAmount} />
      </main>
    );
  }
}

/*================================
          SLOT pres. component
================================*/
const Slot = ({result}) => {
  return (
    <div className="slot-object">
      <p className="reel-obj">{result}</p>
    </div>
  );
}

/*================================
        BUTTON component
================================*/
class SpinButton extends React.Component {
  // sets number of spins in App state
  handleSpin = () => {
    let thisAmount = Math.floor(Math.random() * (36 - 6 + 1) + 6);
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

export default App;
