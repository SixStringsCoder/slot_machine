import React, { Component } from 'react';
import './App.css';
import { slotChoices } from '../utility/content';
import Slot from '../Slot/Slot';
import SpinButton from '../SpinButton/SpinButton';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: slotChoices,
      pick1: "apple",
      pick2: "apple",
      pick3: "apple",
      jackpot: false,
      bgColor: "rgb(255, 254, 253)",
    }

    this.reelSpin = new Audio('https://raw.githubusercontent.com/SixStringsCoder/slot_machine/master/src/components/App/audio/reel_spin.mp3');
    this.winningSFX = new Audio('https://raw.githubusercontent.com/SixStringsCoder/slot_machine/master/src/components/App/audio/winner.mp3');
  }

  /*++++++++++++++++++++++++*/
  /*     Audio METHODS      */
  /*++++++++++++++++++++++++*/
  stopSFX = () => {
    // instantiating here, multiple stopSFX can play successively
    this.reelStop = new Audio('https://raw.githubusercontent.com/SixStringsCoder/slot_machine/master/src/components/App/audio/crash.mp3');
    this.reelStop.volume = 0.19;
    this.reelStop.play();
  }

  spinSFX = () => {
    this.reelSpin.currentTime = 0;
    this.reelSpin.volume = 0.15;
    this.reelSpin.play();
    this.reelSpin.loop = true;
  }

  winSFX = () => {
    this.winningSFX.currentTime = 0;
    this.winningSFX.play();
  }

  // Helps startColorShow effect
  randomColor = () => {
    return Math.floor(Math.random() * 256);
  }

  startColorShow = () => {
    let count = 0;
    const winningColors = () => {
      if (count === 105) {
        clearInterval(colorShow);
        this.endColorShow();
      } else {
        count += 1;
        this.setState({
          bgColor: `rgb(${this.randomColor()}, ${this.randomColor()}, ${this.randomColor()})`
        });
      }
    }
    const colorShow = setInterval(winningColors, 100);
  }

   endColorShow = () => {
     this.setState(prevState => {
       return {
         jackpot: false
       }
     });
   }

/*++++++++++++++++++++++++*/
/*     Reel METHODS      */
/*++++++++++++++++++++++++*/

  spinReel1Cycle = (amountOfSpins) => {
    let arr = this.state.content;
    let counter = 0;
    let index = 0;
    // console.log(arr, amountOfSpins, counter, index);
    this.spinReelOnce = () => {
      if (counter === amountOfSpins) {
        this.stopSFX();
        console.log(`Reel 1 finished ${amountOfSpins} spins`);
        clearInterval(reelspin);
      } else {
        this.setState( prevState => {
          return {
            pick1: arr[index]
          }
        }); //end setState
        counter += 1;
        index < arr.length-1 ? index += 1 : index = 0;
      }
    } // end spinReelOnce function
    let reelspin = setInterval(this.spinReelOnce, 100);
  } // end spinReel1Cycle function



  spinReel2Cycle = (amountOfSpins) => {
    const arr = this.state.content;
    let counter = 0;
    let index = 0;
    // console.log(arr, amountOfSpins, counter, index);
    this.spinReelOnce = () => {
      if (counter === amountOfSpins) {
        this.stopSFX();
        clearInterval(reelspin);
        console.log(`Reel 2 finished ${amountOfSpins} spins`);
      } else {
        this.setState( prevState => {
          return {
            pick2: arr[index],
          }
        }); //end setState
        counter+=1;
        index < arr.length-1 ? index += 1 : index = 0;
      }
    } // end spinReelOnce function
    let reelspin = setInterval(this.spinReelOnce, 100);
  } // end spinReel2Cycle function


  spinReel3Cycle = (amountOfSpins) => {
    const arr = this.state.content;
    let counter = 0;
    let index = 0;
    console.log(amountOfSpins, "count: " + counter);

    this.spinReelOnce = () => {
      if (counter === amountOfSpins) {
        clearInterval(reelspin);
        this.stopSFX();
        this.reelSpin.pause();
        console.log(`Reel 3 finished ${amountOfSpins} spins`);
          // if Jackpot
          if (this.state.pick1 === this.state.pick2 && this.state.pick2 === this.state.pick3) {
            this.setState({jackpot: true})
            this.winSFX();
            this.startColorShow();
          }
      } else {
        this.setState( prevState => {
          return {
            pick3: arr[index],
          }
        }); //end setState
        counter+=1;
        index < arr.length-1 ? index += 1 : index = 0;
      }
    } // end spinReelOnce function
    let reelspin = setInterval(this.spinReelOnce, 100);
  } // end spinReel3Cycle function


 // Helps to randomize when reel2 and reel3 finish after reel1
  randomNumber = () => {
    return Math.floor((Math.random() * 20) + 10);
  }

  // Callback function after 'Spin' button is clicked
  startSpinCycle = (thisAmount) => {
    console.log(thisAmount);
    this.spinReel1Cycle(thisAmount);
    this.spinReel2Cycle(thisAmount + this.randomNumber());
    this.spinReel3Cycle(thisAmount + 12 + this.randomNumber());
    // audio
    this.reelSpin.volume = 0.3;
    this.spinSFX();
    if (this.winningSFX.ended === false) {
      this.winningSFX.pause();
      this.spinSFX();
    }
  }

  render() {
    // console.log(this.state.pick1, this.state.pick2, this.state.pick3);
    return (
      <main style={ this.state.jackpot ? {backgroundColor: this.state.bgColor} : {backgroundImage: "radial-gradient(yellow, green)"} }>
        <header>
          <h1 id="title">{this.state.jackpot ? "JACKPOT!" : "Lost Wages"}</h1>
        </header>
        <section className="spindle">
          <Slot result={this.state.pick1} />
          <Slot result={this.state.pick2} />
          <Slot result={this.state.pick3} />
        </section>
        <SpinButton spinAmount={this.startSpinCycle} />
      </main>
    );
  }
}

export default App;
