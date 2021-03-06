/* global window */
import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#282c31',
    color: 'white',
  },
};

const inputStyle = {
  borderRadius: '4px',
  display: 'inline-block',
  background: '#070809',
  border: '1px solid #5D646c',
  width: '25%',
  height: '22px',
  color: 'white',
  textAlign: 'left',
};

const listStyle = {
  width: '80%',
  height: '25px',
  margin: '10px',
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonStyle = {
  width: '84px',
  height: '24px',
  background: '#006EFF',
  borderRadius: '4px',
  color: 'white',
  margin: '10px',
};


export default class RepeatDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 1,
      cols: 1,
      hspacing: 10,
      vspacing: 10,
    };
    this.startDuplicate = this.startDuplicate.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(event) {
    const { id, value } = event.target;
    switch (id) {
      case 'cols':
        this.setState({ cols: value });
        break;
      case 'rows':
        this.setState({ rows: value });
        break;
      case 'hspacing':
        this.setState({ hspacing: value });
        break;
      case 'vspacing':
        this.setState({ vspacing: value });
        break;
      default:
        break;
    }
  }

  startDuplicate() {
    const {
      rows, cols, hspacing, vspacing,
    } = this.state;
    window.pluginInstance.duplicateLayers(rows, cols, hspacing, vspacing);
    const { onRequestClose } = this.props;
    onRequestClose();
  }


  render() {
    const {
      rows, cols, hspacing, vspacing,
    } = this.state;
    const { onRequestClose, isOpen } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Repeat grids dialog"
      >
        <span style={{ margin: '10px', fontSize: '20px' }}>Create a table of the selected layer:</span>
        <ul>
          <li style={listStyle}>
            <span>Columns: </span>
            <input style={inputStyle} type="text" id="cols" value={cols} onChange={this.onValueChange} />
          </li>
          <li style={listStyle}>
            <span>Rows: </span>
            <input style={inputStyle} type="text" id="rows" value={rows} onChange={this.onValueChange} />
          </li>
          <li style={listStyle}>
            <span>Horizontal Spacing: </span>
            <input style={inputStyle} type="text" id="hspacing" value={hspacing} onChange={this.onValueChange} />
          </li>
          <li style={listStyle}>
            <span>Vertical Spacing: </span>
            <input style={inputStyle} type="text" id="vspacing" value={vspacing} onChange={this.onValueChange} />
          </li>
        </ul>
        <div>
          <button style={buttonStyle} type="button" onClick={onRequestClose}>Cancel</button>
          <button style={buttonStyle} type="button" onClick={this.startDuplicate}>Create</button>
        </div>
      </Modal>
    );
  }
}

RepeatDialog.defaultProps = {
  isOpen: false,
  onRequestClose: () => {},
};

RepeatDialog.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
};
