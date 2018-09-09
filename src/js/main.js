/*
  global chrome
  global document
*/
// import React from 'react';
// import ReactDOM from 'react-dom';
// import PlugInBtn from './components/PlugInBtn';

const injectScript = (filePath, tag) => {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', filePath);
  node.appendChild(script);
};

injectScript(chrome.extension.getURL('/build/plugin.js'), 'body');
