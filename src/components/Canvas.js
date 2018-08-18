import React, { Component } from "react";

export default class Canvas extends Component {
  componentDidMount() {
    this.props.onReady();
  }

  render() {
    return <canvas id="game-canvas" width="640" height="480" />;
  }
}
