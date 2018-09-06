import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import RepeatDialog from './RepeatDialog';

const btnStyles = {
  fontSize: '20px',
  color: 'white',
  backgroundColor: '#2c2c2c',
  margin: '0 auto',
  display: 'inline-block',
  verticalAlign: 'middle',
  padding: '11px',
};

export default class PlugInBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    // make sure there's a selected layer
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { isModalOpen } = this.state;
    return (
      <div className="toolbar_view--toolButtonContainer--1HAfB">
        <button style={btnStyles} type="button" onClick={this.openModal}>
          <FontAwesomeIcon icon={faTh} />
        </button>
        <RepeatDialog isOpen={isModalOpen} onRequestClose={this.closeModal} />
      </div>
    );
  }
}
