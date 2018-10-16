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
    if (selectedLayerIds.length > 1) return null;

    const id = selectedLayerIds[0];
    return this.App._state.mirror.sceneGraph.get(id);
  }

  duplicateLayers(rows, cols, hspacing, vspacing) {
    const n = rows * cols;
    let counter = 1;
    const currentLayer = this.getSelectedLayer();
    const { name } = currentLayer;
    const {
      x, y, width, height,
    } = this.App._state.mirror.selectionProperties;

    while (counter < n) {
      // duplicate
      const { parent } = currentLayer;
      this.App.sendMessage('duplicateSelection', { newParentId: parent });
      const newId = this.focusOnNewSelectedLayer();
      this.setNodeProperty(newId, 'name', `${name}_${counter}`);

      const r = Math.floor(counter / cols);
      const c = counter % cols;
      const newX = x + (width + parseInt(hspacing, 10)) * c;
      const newY = y + (height + parseInt(vspacing, 10)) * r;
      this.App.updateSelectionProperties({ x: newX, y: newY });
      counter += 1;
    }
  }

  focusOnNewSelectedLayer() {
    const { sceneGraphSelection } = this.App._state.mirror;
    if (isEmpty(sceneGraphSelection)) return null;
    const selectedLayerIds = Object.keys(sceneGraphSelection);
    if (selectedLayerIds.length > 1) return null;
    const id = selectedLayerIds[0];

    this.App.sendMessage('clearSelection');
    this.App.sendMessage('addToSelection', { nodeIds: [id] });

    return id;
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
