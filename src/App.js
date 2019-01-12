import React, { Component } from 'react';
import './App.css';

/*NOTES:  To vary results of other two slots, vary speed/time in setInterval using Math.random*/

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
      reel1: {pick: "apple", index: 0, counter: 0, numberOfSpins: 12},
      reel2: {pick: "apple", index: 0, counter: 0, numberOfSpins: 16},
      reel3: {pick: "apple", index: 0, counter: 0, numberOfSpins: 20}
    }
    this.reel1spin = null;
    this.reel2spin = null;
    this.reel3spin = null;
  }


  spinReel1once = (arr) => {
    arr = this.state.content;
    this.setState( prevState => {
      return {
        reel1:
          { ...prevState.reel1,
            pick: arr[this.state.reel1.index],
            counter: prevState.reel1.counter + 1,
            index: prevState.reel1.index < arr.length-1 ?
            prevState.reel1.index + 1
            :
            0 }
      } //end return
    });

    if (this.state.reel1.counter >= this.state.reel1.numberOfSpins) {
      clearInterval(this.reel1spin);
    }
  }

  spinReel2once = (arr) => {
    arr = this.state.content;
    this.setState( prevState => {
      return {
        reel2:
          { ...prevState.reel2,
            pick: arr[this.state.reel2.index],
            counter: prevState.reel2.counter + 1,
            index: prevState.reel2.index < arr.length-1 ?
            prevState.reel2.index + 1
            :
            0 }
      } //end return
    });

    if (this.state.reel2.counter >= this.state.reel2.numberOfSpins) {
      clearInterval(this.reel2spin);
    }
  }

  spinReel3once = (arr) => {
    arr = this.state.content;
    this.setState( prevState => {
      return {
        reel3:
          { ...prevState.reel3,
            pick: arr[this.state.reel3.index],
            counter: prevState.reel3.counter + 1,
            index: prevState.reel3.index < arr.length-1 ?
            prevState.reel3.index + 1
            :
            0 }
      } //end return
    });

    if (this.state.reel3.counter >= this.state.reel3.numberOfSpins) {
      clearInterval(this.reel3spin);
      this.resetCount();
    }
  }

  resetCount = () => {
    this.setState( prevState => {
      return {
        reel1:{ ...prevState.reel1, counter: 0 },
        reel2:{ ...prevState.reel2, counter: 0 },
        reel3:{ ...prevState.reel3, counter: 0 }
      } //end return
    });
  }

  spinCycle = () => {
    this.reel1spin = setInterval(this.spinReel1once, 100, this.state.content);
    this.reel2spin = setInterval(this.spinReel2once, 110, this.state.content);
    this.reel3spin = setInterval(this.spinReel3once, 130, this.state.content);
  }

  spinAmount = (thisAmount) => {
    this.setState({
      reel1: {...this.state.reel1, numberOfSpins: thisAmount},
      reel2: {...this.state.reel2, numberOfSpins: thisAmount+4},
      reel3: {...this.state.reel3, numberOfSpins: thisAmount+3},
    }, this.spinCycle());
  }

  render() {
      console.log(this.state.reel1,
                this.state.reel2,
                this.state.reel3);
    return (
      <main>
        <header>
          <h1 id="title">Lost Wages</h1>
        </header>
        <section className="spindle">
          <Slot result={this.state.reel1.pick} />
          <Slot result={this.state.reel2.pick} />
          <Slot result={this.state.reel3.pick} />
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
