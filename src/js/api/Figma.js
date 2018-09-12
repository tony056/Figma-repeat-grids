/* global window */
/* eslint-disable no-underscore-dangle */
import { isEmpty } from 'lodash';

let instance = null;

class Figma {
  constructor() {
    this.window = window;
    this.App = window.App;
    instance = this;
    return instance;
  }

  getSelectedLayer() {
    const { sceneGraphSelection } = this.App._state.mirror;
    if (isEmpty(sceneGraphSelection)) return null;

    const selectedLayerIds = Object.keys(sceneGraphSelection);
    if (selectedLayerIds.length > 1) {
      // too many selected layers for now
      console.log('too many selected layers');
    }

    const id = selectedLayerIds[0];
    return this.App._state.mirror.sceneGraph.get(id);
  }

  duplicateLayers(rows, cols, spacing) {
    // const n = rows * cols;
    // let currentLayer = selected;
    // let counter = 1;
    // while (counter < n) {
    //   // duplicate
    //   // set property of the current selected (which is the latest duplicate one)
    // }
    const { parent } = this.getSelectedLayer();
    this.App.sendMessage('duplicateSelection', { newParentId: parent });
    const { sceneGraphSelection } = this.App._state.mirror;
    if (isEmpty(sceneGraphSelection)) return;
    console.log('new selected');
    const selectedLayerIds = Object.keys(sceneGraphSelection);
    if (selectedLayerIds.length > 1) {
      // too many selected layers for now
      console.log('too many selected layers');
    }
    const id = selectedLayerIds[0];
    // const bounds = this.App.sendMessage('getBoundsForNodes', { nodeIds: [id] }).args;
    this.setNodeProperty(id, 'name', 'test');
    this.App.sendMessage('clearSelection');
    this.App.sendMessage('addToSelection', { nodeIds: [id] });
    // const {
    //   width, height, x, y,
    // } = bounds[id];

    const {
      x, y, width, height,
    } = this.App._state.mirror.selectionProperties;
    console.log(`name: ${id}, w: ${width}, h: ${height}, x: ${x}, y: ${y}`);
    this.setLayerPos(id, x + width + spacing, y, width, height);
  }

  // getLayerInfo(id) {
  //   const currentPageId = this.App._state.mirror.appModel.currentPage;
  //   const { pageList } = this.App._state.mirror.appModel;
  //   const bounds = this.App.sendMessage('getBoundsForNodes', { nodeIds: [id] }).args;
  //
  //   return {
  //     id: id,
  //     name: ,
  //     width: bounds[id].width,
  //     height: bounds[id].height,
  //     position: ,
  //     pageName: ,
  //     parentName: ,
  //     x: bounds[id].x,
  //     y: bounds[id].y,
  //     type:
  //   };
  // }

  setLayerPos(id, x, y) {
    this.App.updateSelectionProperties({ x, y });
  }

  setNodeProperty(nodeId, property, value) {
    this.App.sendMessage('setNodeProperty', {
      nodeId,
      property,
      value,
    });
  }
}

export default Figma;
