// An example when the state of the parent change,
// the child component change too
import React from "react";

class Child extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const test = this.props.message;
    console.log("Child component: render()");
    return test;
  }
}

class Test extends React.Component {
  state = {
    mssg: "",
  };

  handleClick = () => {
    const number = Math.random();
    this.setState({ mssg: number });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Say something</button>
        <Child message={this.state.mssg} />
      </div>
    );
  }
}

export default Test;
