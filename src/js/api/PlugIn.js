/* global window */
/* global MutationObserver */
/* global document */
/* eslint-disable forOfStatement */
import React from 'react';
import ReactDOM from 'react-dom';
import Figma from './Figma';
import PlugInBtn from '../components/PlugInBtn';
import HotKeyDialog from '../components/HotkeyDialog';

const screenNode = document.getElementById('react-page');
const config = { attributes: true, childList: true, subtree: true };

const injectApp = () => {
  if (document.getElementById('fig-repeat-grids')) return;
  const newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'fig-repeat-grids');
  const contextMenu = document.getElementsByClassName('dropdown--dropdown--35dH4 pointing_dropdown--content--2os_K')[0];
  if (!contextMenu) return;
  contextMenu.appendChild(newDiv);
  ReactDOM.render(<PlugInBtn />, newDiv);
};

const insertModalPanel = () => {
  if (!document.getElementById('dialog-container')) {
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'dialog-container');
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(newDiv);
  }
  ReactDOM.render(<HotKeyDialog />, document.getElementById('dialog-container'));
};

class PlugIn {
  constructor() {
    this.callback = (list) => {
      list.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
          if (screenNode.getElementsByClassName('js-fullscreen-prevent-event-capture')) {
            injectApp();
          }
        }
      });
    };
    this.figma = window.figmaInstance;
    this.observer = new MutationObserver(this.callback);
    this.startObservation = this.startObservation.bind(this);
    this.stopObservation = this.stopObservation.bind(this);
    this.run = this.run.bind(this);
  }

  run() {
    if (!this.observer) return;
    insertModalPanel();
    this.startObservation();
  }

  startObservation() {
    if (!this.observer) return null;
    return this.observer.observe(screenNode, config);
  }

  stopObservation() {
    if (!this.observer) return null;
    this.observer.disconnect();
    this.observer = null;
    return this.observer;
  }

  getSelectedLayer() {
    if (!this.figma) return null;
    return this.figma.getSelectedLayer();
  }

  duplicateLayers(r, c, hspacing, vspacing) {
    if (!this.figma) return;
    this.figma.duplicateLayers(r, c, hspacing, vspacing);
  }
}

window.onload = () => {
  const figmaInstance = new Figma();
  window.figmaInstance = figmaInstance;
  const pluginInstance = new PlugIn();
  window.pluginInstance = pluginInstance;
  window.pluginInstance.run();
};
