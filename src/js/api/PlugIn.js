/* global window */
/* global MutationObserver */
/* global document */
/* eslint-disable forOfStatement */
import React from 'react';
import ReactDOM from 'react-dom';
import Figma from './Figma';
import PlugInBtn from '../components/PlugInBtn';

const screenNode = document.getElementsByClassName('fullscreen_view--page--1QuyL')[0];
const config = { attributes: true, childList: true, subtree: true };
let isChecked = false;

const injectApp = () => {
  if (document.getElementById('fig-repeat-grids')) return;
  const newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'fig-repeat-grids');
  newDiv.classList.add('toolbar_view--toolButtonContainer--1HAfB');
  const toolbar = document.getElementsByClassName('toolbar_view--buttonGroup--2wM3n')[0];
  if (!toolbar) return;
  toolbar.appendChild(newDiv);
  isChecked = true;
  ReactDOM.render(<PlugInBtn />, newDiv);
};

class PlugIn {
  constructor() {
    this.callback = (list) => {
      list.forEach((mutation) => {
        if (!isChecked && mutation.type === 'childList') {
          if (screenNode.getElementsByClassName('toolbar_view--buttonGroup--2wM3n')) {
            injectApp();
          }
        }
      });
    };
    this.figma = new Figma();
    this.observer = new MutationObserver(this.callback);
    this.startObservation = this.startObservation.bind(this);
    this.stopObservation = this.stopObservation.bind(this);
    this.run = this.run.bind(this);
  }

  run() {
    if (!this.observer) return;
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
    console.log('we have something');
    return this.figma.getSelectedLayer();
  }
}

const pluginInstance = new PlugIn();
window.pluginInstance = pluginInstance;
window.pluginInstance.run();
