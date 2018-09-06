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
  },
};


export default class RepeatDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 1,
      cols: 1,
      spacing: 10,
    };
    // this.startDuplicate = this.closeDialog.bind(this);
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
      case 'spacing':
        this.setState({ spacing: value });
        break;
      default:
        break;
    }
  }

  startDuplicate() {
    return null;
  }


  render() {
    const {
      rows, cols, spacing,
    } = this.state;
    const { onRequestClose, isOpen } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Repeat grids dialog"
      >
        <ul>
          <li>
            <span>Columns: </span>
            <input type="text" id="cols" value={cols} onChange={this.onValueChange} />
          </li>
          <li>
            <span>Rows: </span>
            <input type="text" id="rows" value={rows} onChange={this.onValueChange} />
          </li>
          <li>
            <span>Spacing: </span>
            <input type="text" id="spacing" value={spacing} onChange={this.onValueChange} />
          </li>
        </ul>
        <div>
          <button type="button" onClick={onRequestClose}>Cancel</button>
          <button type="button" onClick={this.startDuplicate}>Duplicate</button>
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
