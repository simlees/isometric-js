import React, { Component } from 'react';
import styled from 'styled-components';
import DebuggingOverlay from './DebuggingOverlay';

const CanvasWrapper = styled.div`
  background-color: blue;
  display: inline-block;
  position: relative;
`;

export default class Canvas extends Component {
  componentDidMount() {
    this.props.onReady();
  }

  render() {
    const { width, height, showDebuggingOverlay } = this.props;
    return (
      <CanvasWrapper>
        <canvas id="game-canvas" width={width} height={height} />
        {showDebuggingOverlay && <DebuggingOverlay />}
      </CanvasWrapper>
    );
  }
}
