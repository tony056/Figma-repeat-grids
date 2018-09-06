/* global chrome */
import React from 'react';
import ReactDOM from 'react-dom';
import PlugInBtn from './components/PlugInBtn';

class App extends React.Component {
  render() {
    return (
      <PlugInBtn />
    );
  }
};

const injectApp = () => {
  if (document.getElementById('fig-repeat-grids')) return;
  const newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'fig-repeat-grids');
  newDiv.classList.add('toolbar_view--toolButtonContainer--1HAfB');
  const toolbar = document.getElementsByClassName('toolbar_view--buttonGroup--2wM3n')[0];
  toolbar.appendChild(newDiv);
  ReactDOM.render(<App />, newDiv);
};

const screenNode = document.getElementsByClassName('fullscreen_view--page--1QuyL')[0];
const config = { attributes: true, childList: true, subtree: true };
const callback = (list) => {
  for (let mutation of list) {
    if (mutation.type === 'childList') {
      if (screenNode.getElementsByClassName('toolbar_view--buttonGroup--2wM3n')) {
        injectApp();
        removeObserver();
        break;
      }
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(screenNode, config);
const removeObserver = () => {
  observer.disconnect();
}
