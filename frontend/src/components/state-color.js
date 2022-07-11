import React from "react";

class StateColor extends React.Component{
  render() {
    if (this.props.state === "Выполнено") {
      return (
          <div className="state_color blue"></div>
      );
    } else if (this.props.state === "Выполняется") {
      return (
          <div className="state_color green"></div>
      );
    } else if (this.props.state === "Не выполнено") {
      return (
          <div className="state_color red"></div>
      );
    } else {
      return (
          <div className="state_color black"></div>
      );
    }
  }
}

export default StateColor