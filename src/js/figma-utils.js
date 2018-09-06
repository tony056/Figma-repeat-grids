const { App } = window;

export const getSelectedLayer = () => {
  const sceneGraphSelection = App._state.mirror.sceneGraphSelection;
  if (sceneGraphSelection)

  const selectedLayerIds = Object.key(sceneGraphSelection);
  if (selectedLayerIds.length === 0 ||)

  const pagesList = App._state.mirror.appModal.pagesList;
  const bounds = App.sendMessage('getBoundsForNodes', { nodeIds: selectedLayerIds }).args;

  let layers = [];

};



export const duplicateLayer = (layer, newPos) => {
  App.sendMessage('duplicateSelection', );
  const newLayer = getSelectedLayer();
  // set pos property of the layer
};
