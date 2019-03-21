import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const KEYS = [
  {
    id: "clear",
    keyButton: "AC"
  },
  {
    id: "clearLast",
    keyButton: "C"
  },
  {
    id: "seven",
    keyButton: "7"
  },
  {
    id: "eight",
    keyButton: "8"
  },
  {
    id: "nine",
    keyButton: "9"
  },
  {
    id: "divide",
    keyButton: "/"
  },
  {
    id: "four",
    keyButton: "4"
  },
  {
    id: "five",
    keyButton: "5"
  },
  {
    id: "six",
    keyButton: "6"
  },
  {
    id: "multiply",
    keyButton: "*"
  },
  {
    id: "one",
    keyButton: "1"
  },
  {
    id: "two",
    keyButton: "2"
  },
  {
    id: "three",
    keyButton: "3"
  },
  {
    id: "subtract",
    keyButton: "-"
  },
  {
    id: "zero",
    keyButton: "0"
  },
  {
    id: "decimal",
    keyButton: "."
  },
  {
    id: "equals",
    keyButton: "="
  },
  {
    id: "add",
    keyButton: "+"
  }
];
class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      formula: "",
    };
    this.handleclick = this.handleclick.bind(this);
  }
  handleclick(key) {
    let numbers = /[0-9.]/;
    let operators = /[+-/*]/;
    let prop1 = this.state.input;
    let prop2 = this.state.formula;

    if (numbers.test(key)) {
      if (prop1.length === 1 && prop1 === "0") {
        switch (key) {
          case "0":
            break;
          case ".":
            this.setState({
              input: prop1.concat(key),
              formula: "0".concat(key)
            });
            break;
          default:
            this.setState({
              input: key,
              formula: prop2.concat(key),
              lastResult:""
            });
            break;
        }
      } else if (prop1.length >= 1)
        if (key === "." && prop1.includes(".")) return null;
        else
          this.setState({
            input: prop1.concat(key),
            formula: prop2.concat(key)
          });
    } else if (operators.test(key)) {
      if (operators.test(prop2[prop2.length - 1])){
        this.setState({
          input: key,
          formula: prop2.substr(0, prop2.length - 1).concat(key)
        });
      }
      else if(prop2.includes("=")){
        this.setState({
          input: key,
          formula: this.state.lastResult + key
        });
      }
      else
        this.setState({
          input: key,
          formula: prop2.concat(key)
        });
    } else {
      switch (key) {
        case "AC":
          this.setState({
            input: "0",
            formula: ""
          });
          break;
        case "C":
          if(prop2.length === 1 || prop1 === "0") 
            this.setState({
            input: "0",
            formula: ""
          });
          else
          this.setState({
            input: prop1.slice(0, prop1.length - 1),
            formula: prop2.slice(0, prop2.length - 1)
          });
          break;
        case "=":
        if(prop2 === "")
          return null;
        else
          this.setState({
            input: eval(prop2),
            formula: prop2 + key + eval(prop2),
            lastResult: eval(prop2)
          });
          break;
        default: return null;
      }
    }
  }
  render() {
    return (
      <div>
      <div className="container">
        <Display
          input={this.state.input}
          formula={this.state.formula.replace(/-/g, "−")}
        />
        <KeyPad handleclick={this.handleclick} />
      </div>
        <footer>
          <p>
            Designed and coded by{" "}
            <a href="https://www.instagram.com/penzaandrea/" target="_blank"  rel="noopener noreferrer">
              Andrea Penza
            </a>{" "}
            for{" "}
            <a href="https://www.freecodecamp.org" target="_blank"  rel="noopener noreferrer">
              FreeCodeCamp
            </a>
          </p>
          <p>
            Copyright <i className="far fa-copyright" /> 2019 All rights reserved
          </p>
        </footer>
        </div>
    );
  }
}

function Display(props) {
  return (
    <div className="displayContainer">
      <div className="formula">{props.formula}</div>
      <div id="display" className="display">{props.input}</div>
    </div>
  );
}
class KeyPad extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    const current = document.getElementById(e.target.id);
    this.props.handleclick(current.innerHTML);
  }
  render() {
    return (
      <div className="keypad">
        <div className="row">
          {KEYS.slice(0, 2).map(item =>
            <div
              key={item.id}
              id={item.id}
              className="doubleKey"
              handleclick={this.handleclick}
              onClick={this.onClick}
            >
              {item.keyButton}
            </div>
          )}
        </div>
        <div className="row">
          {KEYS.slice(2, 6).map(item => 
            <div 
              key={item.id}
              id={item.id}
              className="key"
              handleclick={this.handleclick}
              onClick={this.onClick}
            >
              {item.keyButton}
            </div>
          )}
        </div>
        <div className="row">
          {KEYS.slice(6, 10).map(item => 
            <div
              key={item.id}  
              id={item.id}
              className="key"
              handleclick={this.handleclick}
              onClick={this.onClick}
            >
              {item.keyButton}
            </div>
          )}
        </div>
        <div className="row">
          {KEYS.slice(10, 14).map(item =>
            <div
              key={item.id}
              id={item.id}
              className="key"
              handleclick={this.handleclick}
              onClick={this.onClick}
            >
              {item.keyButton}
            </div>
          )}
        </div>
        <div className="row">
          {KEYS.slice(14, 18).map(item => 
            <div
              key={item.id}
              id={item.id}
              className="key"
              handleclick={this.handleclick}
              onClick={this.onClick}
            >
              {item.keyButton}
            </div>
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("app"));

export default Calculator;
