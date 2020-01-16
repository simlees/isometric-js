import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getWorldSize } from '../selectors/worldSelectors';
import {
  getCameraOffset,
  getCameraRotation,
  getCameraZoom,
  getMouseX,
  getMouseY,
} from '../selectors/cameraSelectors';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  font-family: monospace;
`;

const Positioned = styled.div`
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  position: absolute;
  display: inline-block;
  color: white;
  padding: 10px;
  font-size: 20px;
`;

const compassPoints = ['N', 'W', 'S', 'E'];
const getRotationIndex = (index, offset = 0) => (index + offset) % 4;
const getCompassPoint = (...args) => compassPoints[getRotationIndex(...args)];

const mapStateToProps = state => ({
  rotation: getCameraRotation(state),
  worldSize: getWorldSize(state),
  offset: getCameraOffset(state),
  zoom: getCameraZoom(state),
  mouseX: getMouseX(state),
  mouseY: getMouseY(state),
});

const DebuggingOverlay = ({
  rotation,
  zoom,
  offset: [xOffset, yOffset],
  mouseX,
  mouseY,
  worldSize: [xSize, ySize],
}) => {
  const worldCorners = [
    `[0,0]`,
    `[0,${ySize}]`,
    `[${xSize},${ySize}]`,
    `[${xSize},0]`,
  ];
  const getWorldCorner = (...args) => worldCorners[getRotationIndex(...args)];
  return (
    <Overlay>
      <Positioned left={0} bottom="15%">
        <div>R: {rotation}</div>
        <div>Z: {zoom}</div>
        <div>
          M: [{mouseX}, {mouseY}]
        </div>
        <div>
          C: [{xOffset}, {yOffset}]
        </div>
      </Positioned>
      <Positioned top={0} right="50%">
        {getWorldCorner(rotation, 0)}
      </Positioned>
      <Positioned left={0} top="50%">
        {getWorldCorner(rotation, 1)}
      </Positioned>
      <Positioned bottom={0} right="50%">
        {getWorldCorner(rotation, 2)}
      </Positioned>
      <Positioned right={0} top="50%">
        {getWorldCorner(rotation, 3)}
      </Positioned>

      <Positioned top={0} right={0}>
        {getCompassPoint(rotation, 0)}
      </Positioned>
      <Positioned top={0} left={0}>
        {getCompassPoint(rotation, 1)}
      </Positioned>
      <Positioned bottom={0} left={0}>
        {getCompassPoint(rotation, 2)}
      </Positioned>
      <Positioned bottom={0} right={0}>
        {getCompassPoint(rotation, 3)}
      </Positioned>
    </Overlay>
  );
};

export default connect(mapStateToProps)(DebuggingOverlay);
