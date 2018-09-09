/* global window */
/* eslint-disable no-underscore-dangle */
import { isEmpty } from 'lodash';

let instance = null;

class Figma {
  constructor() {
    this.window = window;
    instance = this;
    return instance;
  }

  getSelectedLayer() {
    const { App } = this.window;
    const { sceneGraphSelection } = App._state.mirror;
    if (isEmpty(sceneGraphSelection)) return null;

    const selectedLayerIds = Object.keys(sceneGraphSelection);
    if (selectedLayerIds.length > 1) {
      // too many selected layers for now
      console.log('too many selected layers');
    }

    const id = selectedLayerIds[0];
    return App._state.mirror.sceneGraph.get(id);
  }
}

export default Figma;
