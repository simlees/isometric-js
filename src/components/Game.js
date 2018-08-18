import React, { Component } from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import runGame from "../game";
import config from "../config";
import Canvas from "./Canvas";

const CanvasWrapper = styled.div`
  background-color: blue;
`;

class Game extends Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
  }

  start() {
    runGame(config, this.props.store);
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <CanvasWrapper>
          <Canvas onReady={this.start} />
        </CanvasWrapper>
      </Provider>
    );
  }
}

export default Game;
