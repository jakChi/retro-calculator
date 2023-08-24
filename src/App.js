//this is calculator written in react class based components and I think it's totally tresh
//New version is written with react hooks you can find it here in my repositories
import './App.css';
import React from 'react';
import * as math from 'mathjs';


const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operators = ["*", "-", "+", "/"];
const revNums = nums.reverse();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      last: "",
      evaluated: false,
    };

    this.handleResetClick = this.handleResetClick.bind(this);
    this.handlePointClick = this.handlePointClick.bind(this);
    this.handleEqualsClick = this.handleEqualsClick.bind(this);
  }
//everything is erased
  handleResetClick(e) {
    this.setState({
      num: 0,
      evaluated: true
    })
  }
//this.state.last value goes to API call and we get the answer
  handleEqualsClick() {
    this.setState({
      num: math.evaluate(this.state.last),
      last: `${this.state.last}=${math.evaluate(this.state.last)}`,
      evaluated: true,
    })
  }
//concatination of whatever we have written and decimal point
  handlePointClick(e) {
    this.setState({
      num: this.state.num + e.target.innerText, 
      last: this.state.last + e.target.innerText
    })
  }


  render() {
    const { num, last, evaluated } = this.state;

    //main logic is here whenever most buttons are pressed
    const handleClick = (e) => {
      const value = e.target.innerText;

      //for some reason this last condition doesn't work and passes 0 multiple times
      this.setState(
        this.state.num === 0 || isNaN(this.state.num) || evaluated || (this.state.num === 0 && value === "0") 
        ? ({num: value, evaluated: false}) 
        : ({num: this.state.num + value})
      );

      this.setState(
        this.state.last === "" || evaluated 
        ? ({last: value, evaluated: false})
        : ({last: this.state.last + value})
      )
    }

    return (
      <div>
        <h4>Calculator By JakChi</h4>
        
        <div id="calculator">
          <div id="display">
            <div id="prevOp">{last}</div>
            <div id="currentOp">{num}</div>
          </div>
          <div id="buttons">
            <div id="num-box">
              {/*this is reset button*/}
              <button
                id="clear"
                className="span-two-h"
                onClick={(e) => this.handleResetClick(e)}
              >
                AC
              </button>
              {/*all numbers on calculator are rendered by map method*/}
              {revNums.map((num, key) => {
                return (
                  <button
                    className={`${num === 0 ? "span-two-h" : null}`}
                    onClick={handleClick}
                    key={key}
                  >
                    {num}
                  </button>
                );
              })}
              {/*decimal point*/}
              <button
                id="decimal"
                style={{ backgroundColor: "green" }}
                onClick={(e) => this.handlePointClick(e)}
              >
                .
              </button>
            </div>
            {/*this are all signs from operators*/}
            <div id="op-box">
              {operators.map((op, key) => (
                <button
                  className={`${op === "*" ? "multiplication" : null }`}
                  onClick={handleClick}
                  key={key}
                  >
                  {op}
                </button>
              ))}
              {/*Equals operator*/}
              <button
                id="equals"
                onClick = {(e) => this.handleEqualsClick(e)}
                className = "span-two-v"
                >
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
