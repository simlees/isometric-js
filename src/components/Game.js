import React, { Component } from 'react';
import { Provider } from 'react-redux';
import runGame from '../game';
import config from '../config';
import Canvas from './Canvas';

class Game extends Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
  }

  start() {
    runGame(config, this.props.store);
  }

  render() {
    const { canvasWidth, canvasHeight } = config.view;
    return (
      <Provider store={this.props.store}>
        <Canvas
          onReady={this.start}
          width={canvasWidth}
          height={canvasHeight}
          showDebuggingOverlay={true}
        />
      </Provider>
    );
  }
}

export default Game;
