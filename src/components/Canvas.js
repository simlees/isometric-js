import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getShowDebugOverlay } from '../selectors/userInterfaceSelectors';
import DebugOverlay from './DebugOverlay';

const CanvasWrapper = styled.div`
  background-color: blue;
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

class Canvas extends Component {
  componentDidMount() {
    this.props.onReady();
  }

  render() {
    const { width, height, showDebugOverlay } = this.props;
    return (
      <CanvasWrapper width={width} height={height}>
        <canvas id="game-canvas" width={width} height={height} />
        {showDebugOverlay && <DebugOverlay />}
      </CanvasWrapper>
    );
  }
}

export default connect(state => ({
  showDebugOverlay: getShowDebugOverlay(state),
}))(Canvas);
