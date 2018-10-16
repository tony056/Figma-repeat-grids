/* global window */
/* global document */
import React from 'react';
import RepeatDialog from './RepeatDialog';

// const btnStyles = {
//   fontSize: '20px',
//   color: 'white',
//   backgroundColor: '#2c2c2c',
//   margin: '0 auto',
//   display: 'inline-block',
//   verticalAlign: 'middle',
//   padding: '11px',
// };
let map = {};

export default class PlugInBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isActive: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.deactivateOthers = this.deactivateOthers.bind(this);
  }

  mouseEnter() {
    const { isActive } = this.state;
    if (isActive) return;
    this.setState({ isActive: true }, this.deactivateOthers);
  }

  deactivateOthers() {
    const { isActive } = this.state;
    if (!isActive) return;
    const currentFocus = document.getElementsByClassName('multilevel_dropdown--optionActive--3iZDH');
    if (!currentFocus) return;
    const nodes = Array.from(currentFocus).filter(node => node.id !== 'repeat-g');
    nodes.forEach(node => node.classList.remove('multilevel_dropdown--optionActive--3iZDH'));
  }

  mouseLeave() {
    const { isActive } = this.state;
    if (!isActive) return;
    this.setState({ isActive: false });
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

  keyDown(e) {
    map[e.key] = e.type === 'keydown';
    if (map.shift && map.cmd && map.g) {
      this.openModal();
      map = {};
    }
  }

  render() {
    const { isModalOpen, isActive } = this.state;
    const containerClass = isActive ? 'multilevel_dropdown--optionActive--3iZDH multilevel_dropdown--option--1y5Jh dropdown--optionBase--2PiCW white_text--whiteText--1kui1'
      : 'multilevel_dropdown--option--1y5Jh dropdown--optionBase--2PiCW white_text--whiteText--1kui1';
    return (
      <div id="repeat-g" className={containerClass} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <div className="multilevel_dropdown--name--1abLT mixins--ellipsis--3CwQm" role="button" tabIndex="0" onkeyDown={this.keyDown} onClick={this.openModal}>Create Repeat Grid</div>
        <span className="multilevel_dropdown--rightColumn--229nN">&#8963;&#8679;G</span>
        <RepeatDialog isOpen={isModalOpen} onRequestClose={this.closeModal} />
      </div>
    );
  }
}
