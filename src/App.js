import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinStack: [0, 0, 0, 0, 0],
      topValue: 0,
      totalValue: 0
    };

    this.popStack = this.popStack.bind(this);
    this.pushStack = this.pushStack.bind(this);
  }

  popStack() {
    let coinStack = this.state.coinStack;
    
    let i = 0;
    while (i < 5) {
      if (coinStack[i] !== 0) {
        coinStack[i] = 0;
        i = 5;
      } else {
        i++;
      }
    }

    let totalValue = coinStack.reduce((a, b) => a + b, 0);
    let topValue = coinStack.find(coin => coin !== 0);

    if (topValue === undefined) {
      topValue = 0;
    }

    this.setState({
      coinStack: coinStack,
      totalValue: totalValue,
      topValue: topValue
    });
  }

  pushStack(event) {
    const pushValue = Number(event.target.value);
    let coinStack = this.state.coinStack;

    let i = 4;
    while (i >= 0) {
      if (coinStack[i] === 0) {
        coinStack[i] = pushValue;
        i = -1;
      } else {
        i--;
      }
    }

    let totalValue = coinStack.reduce((a, b) => a + b, 0);
    let topValue = coinStack.find(coin => coin !== 0);

    this.setState({
      coinStack: coinStack,
      totalValue: totalValue,
      topValue: topValue
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Stack Simulator</h1>
        <p>Total value of the coin stack is: {this.state.totalValue >= 100 ? "$" + this.state.totalValue / 100 : this.state.totalValue + "c"}</p>
        <p>The value of the top coin is: {this.state.topValue >= 100 ? "$" + this.state.topValue / 100 : this.state.topValue + "c"}</p>
        <ol id="coin-stack">
          {this.state.coinStack.map((coinValue, index) => 
            <li key={index}>{coinValue >= 100 ? "$" + coinValue / 100 : coinValue + "c"}</li>
          )}
        </ol>
        <button onClick={this.popStack}>Pop</button>
        <div className="push-buttons">
          <button onClick={this.pushStack} value={5} >Push 5c</button>
          <button onClick={this.pushStack} value={10} >Push 10c</button>
          <button onClick={this.pushStack} value={20} >Push 20c</button>
          <button onClick={this.pushStack} value={50} >Push 50c</button>
          <button onClick={this.pushStack} value={100} >Push $1</button>
          <button onClick={this.pushStack} value={200} >Push $2</button>
        </div>
      </div>
    )
  }
}

export default App;
