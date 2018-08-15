import React, { Component, Fragment } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

class App extends Component {

  state = {
    content: 'Enter Text Here',
  };

  handleContentChange = (content = '') => {
    this.setState({ content });
  };
  
  handleExport = () => {
    dom2image.toBlob(this.image)
      .then(blob => {
        fileSaver.saveAs(blob, 'meme-image.png');
      });
  }
}