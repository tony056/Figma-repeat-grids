/* global window */
/* global document */
import React from 'react';
import RepeatDialog from './RepeatDialog';


export default class HotKeyDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      keys: {},
    };
    this.keyDown = this.keyDown.bind(this);
    this.keyCheck = this.keyCheck.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    document.addEventListener('keydown', this.keyDown);
  }

  keyDown(e) {
    const { keys } = this.state;
    keys[e.key] = e.type === 'keydown';
    this.setState({ keys }, this.keyCheck);
  }

  keyCheck() {
    const { keys } = this.state;
    if (keys.Control && keys.Shift && keys.G) {
      this.openModal();
      this.setState({ keys: {} });
    }
  }

  openModal() {
    // make sure there's a selected layer
    const selectedLayer = window.pluginInstance.getSelectedLayer();
    if (!selectedLayer) {
      return;
    }
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { isModalOpen } = this.state;
    return (
      <RepeatDialog isOpen={isModalOpen} onRequestClose={this.closeModal} />
    );
  }
}
