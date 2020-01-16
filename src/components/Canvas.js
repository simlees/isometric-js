import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getShowDebugOverlay } from '../selectors/userInterfaceSelectors';
import DebugOverlay from './DebugOverlay';

const CanvasWrapper = styled.div`
  background-color: blue;
  display: inline-block;
  position: relative;
`;

class Canvas extends Component {
  componentDidMount() {
    this.props.onReady();
  }

  render() {
    const { width, height, showDebugOverlay } = this.props;
    return (
      <CanvasWrapper>
        <canvas id="game-canvas" width={width} height={height} />
        {showDebugOverlay && <DebugOverlay />}
      </CanvasWrapper>
    );
  }
}

export default connect(state => ({
  showDebugOverlay: getShowDebugOverlay(state),
}))(Canvas);
