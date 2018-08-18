import React, { Component } from "react";
import styled from "styled-components";
import runGame from "../game";
import config from "../config";
import Canvas from "./Canvas";

const CanvasWrapper = styled.div`
  background-color: blue;
`;

class Game extends Component {
  start() {
    runGame(config);
  }
  render() {
    return (
      <CanvasWrapper>
        <Canvas onReady={this.start} />
      </CanvasWrapper>
    );
  }
}

export default Game;
