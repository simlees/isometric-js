import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getWorldSize } from '../selectors/worldSelectors';
import {
  getCameraOffset,
  getCameraRotation,
  getCameraZoom,
  getGridOffset,
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
`;

const DataPoint = styled(Positioned)`
  color: white;
  padding: 10px;
  font-size: 20px;
`;

const crosshairSize = 20;
const crosshairThickness = 2;

const compassPoints = ['N', 'W', 'S', 'E'];
const getRotationIndex = (index, offset = 0) => (index + offset) % 4;
const getCompassPoint = (...args) => compassPoints[getRotationIndex(...args)];

const mapStateToProps = state => ({
  rotation: getCameraRotation(state),
  worldSize: getWorldSize(state),
  offset: getCameraOffset(state),
  gridOffset: getGridOffset(state),
  zoom: getCameraZoom(state),
  mouseX: getMouseX(state),
  mouseY: getMouseY(state),
});

const DebugOverlay = ({
  rotation,
  zoom,
  offset: [xOffset, yOffset],
  gridOffset: [gridXOffset, gridYOffset],
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
      <DataPoint left={0} bottom="10%">
        <div>Rot: {rotation}</div>
        <div>Zoo: {zoom}</div>
        <div>
          Mou: [{mouseX}, {mouseY}]
        </div>
        <div>
          Cam: [{xOffset}, {yOffset}]
        </div>
        <div>
          Iso: [{gridXOffset}, {gridYOffset}]
        </div>
      </DataPoint>
      <DataPoint top={0} right="50%">
        {getWorldCorner(rotation, 0)}
      </DataPoint>
      <DataPoint left={0} top="50%">
        {getWorldCorner(rotation, 1)}
      </DataPoint>
      <DataPoint bottom={0} right="50%">
        {getWorldCorner(rotation, 2)}
      </DataPoint>
      <DataPoint right={0} top="50%">
        {getWorldCorner(rotation, 3)}
      </DataPoint>

      <DataPoint top={0} right={0}>
        {getCompassPoint(rotation, 0)}
      </DataPoint>
      <DataPoint top={0} left={0}>
        {getCompassPoint(rotation, 1)}
      </DataPoint>
      <DataPoint bottom={0} left={0}>
        {getCompassPoint(rotation, 2)}
      </DataPoint>
      <DataPoint bottom={0} right={0}>
        {getCompassPoint(rotation, 3)}
      </DataPoint>

      <Positioned
        top={`calc(50% - ${crosshairSize / 2}px)`}
        left={`calc(50% - ${crosshairThickness / 2}px)`}
      >
        <div
          style={{
            width: crosshairThickness,
            height: crosshairSize,
            backgroundColor: 'white',
          }}
        />
      </Positioned>
      <Positioned
        top={`calc(50% - ${crosshairThickness / 2}px)`}
        left={`calc(50% - ${crosshairSize / 2}px)`}
      >
        <div
          style={{
            height: crosshairThickness,
            width: crosshairSize,
            backgroundColor: 'white',
          }}
        />
      </Positioned>
    </Overlay>
  );
};

export default connect(mapStateToProps)(DebugOverlay);
