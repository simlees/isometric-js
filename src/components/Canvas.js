import React, { Component } from 'react';

export default class Canvas extends Component {
  componentDidMount() {
    this.props.onReady();
  }

  render() {
    const { width, height } = this.props;
    return <canvas id="game-canvas" width={width} height={height} />;
  }
}
