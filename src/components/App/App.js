import React, { Component } from 'react';
import './App.css';
import { slotChoices } from '../utility/content';
import Slot from '../Slot/Slot';
import SpinButton from '../SpinButton/SpinButton';
import reelSpin from './audio/reel_spin.mp3';
import reelStop from './audio/crash.mp3';
import winner from './audio/winner.mp3';

// let bgColor = {
//   backgroundImage: "none",
//   backgroundColor: {this.state.bgColor},
// }


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: slotChoices,
      reel1: {pick: "apple", index: 0, counter: 0, numberOfSpins: 12},
      reel2: {pick: "coconut", index: 0, counter: 0, numberOfSpins: 16},
      reel3: {pick: "durian", index: 0, counter: 0, numberOfSpins: 20},
      jackpot: false,
      bgColor: "rgb(255, 254, 253)",
    }
    this.reel1spin = null;
    this.reel2spin = null;
    this.reel3spin = null;
    this.reelSpin = new Audio(reelSpin);
    this.winningSFX = new Audio(winner);
  }

  /*++++++++++++++++++*/
  /*     METHODS      */
  /*++++++++++++++++++*/
  stopSFX = () => {
    this.reelStop = new Audio(reelStop);
    this.reelStop.volume = 0.2;
    this.reelStop.play();
  }

  spinSFX = () => {
    this.reelSpin.currentTime = 0;
    this.reelSpin.volume = 0.15;
    this.reelSpin.play();
  }

  winSFX = () => {
    this.winningSFX.currentTime = 0;
    this.winningSFX.play();
  }

  startColorShow = () => {
  let count = 0;
  const winningColors = () => {
    if (count === 105) {
      clearInterval(colorShow);
      this.resetCounters();
    } else {
      count += 1;
      let red = Math.floor(Math.random() * 256);
      let green = Math.floor(Math.random() * 256);
      let blue = Math.floor(Math.random() * 256);
      this.setState({
        bgColor: `rgb(${red}, ${green}, ${blue})`
      });
    }
  }
  const colorShow = setInterval(winningColors, 100);
}

  spinReel1once = (arr) => {
    arr = this.state.content;
    this.setState( prevState => {
      return {
        reel1:
          { ...prevState.reel1,
            pick: arr[this.state.reel1.index],
            counter: prevState.reel1.counter + 1,
            index: prevState.reel1.index < arr.length - 1 ?
            prevState.reel1.index + 1
            :
            0 }
      } //end return
    });

    if (this.state.reel1.counter >= this.state.reel1.numberOfSpins) {
      clearInterval(this.reel1spin);
      this.stopSFX();

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
            index: prevState.reel2.index < arr.length - 1 ?
            prevState.reel2.index + 1
            :
            0 }
      } //end return
    });

    if (this.state.reel2.counter >= this.state.reel2.numberOfSpins) {
      clearInterval(this.reel2spin);
      this.stopSFX();
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
            index: prevState.reel3.index < arr.length - 1 ?
            prevState.reel3.index + 1
            :
            0 }
      } //end return
    });

    if (this.state.reel3.counter >= this.state.reel3.numberOfSpins) {
      clearInterval(this.reel3spin);
      this.stopSFX();
      this.reelSpin.pause();
      this.resetCounters();
      if (this.state.reel1.pick === this.state.reel2.pick && this.state.reel2.pick === this.state.reel3.pick) {
        this.setState({jackpot: true})
        this.winSFX();
        this.startColorShow();
      }
    }
  }


  resetCounters = () => {
    this.setState( prevState => {
      return {
        reel1:{ ...prevState.reel1, counter: 0 },
        reel2:{ ...prevState.reel2, counter: 0 },
        reel3:{ ...prevState.reel3, counter: 0 },
        jackpot: false,
      } //end return
    });
  }

  spinCycle = () => {
    this.reel1spin = setInterval(this.spinReel1once, 100, this.state.content);
    this.reel2spin = setInterval(this.spinReel2once, 90, this.state.content);
    this.reel3spin = setInterval(this.spinReel3once, 105, this.state.content);
    this.reelSpin.volume = 0.3;
    if (this.winningSFX.play()) {
      this.winningSFX.pause();
      this.spinSFX();
    }
  }

  randomNumber = () => {
    return Math.floor(Math.random() * (20 - 10) + 10);
  }

  spinAmount = (thisAmount) => {
    this.setState({
      reel1: { ...this.state.reel1, numberOfSpins: thisAmount },
      reel2: { ...this.state.reel2, numberOfSpins: thisAmount + this.randomNumber() },
      reel3: { ...this.state.reel3, numberOfSpins: thisAmount + this.randomNumber() },
    }, this.spinCycle());
  }

  render() {
   // console.log(this.state.reel1,
   //             this.state.reel2,
   //             this.state.reel3);
    return (
      <main style={ this.state.jackpot ? {backgroundColor: this.state.bgColor} : {backgroundImage: "radial-gradient(yellow, green)"} }>
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

export default App;
