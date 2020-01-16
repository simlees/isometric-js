import React, { Component } from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  background-color: blue;
  display: inline-block;
`;

export default class Canvas extends Component {
  componentDidMount() {
    this.props.onReady();
  }

  render() {
    const { width, height } = this.props;
    return (
      <CanvasWrapper>
        <canvas id="game-canvas" width={width} height={height} />
      </CanvasWrapper>
    );
  }
}
