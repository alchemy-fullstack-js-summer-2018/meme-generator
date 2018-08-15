import React, { Component, Fragment } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

class App extends Component {

  state = {
    content: 'Enter Text Here',
    url: 'http://worldwidewalrusweb.com'
  };

  handleContentChange = (content = '') => {
    this.setState({ content });
  };

  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };
  
  handleExport = () => {
    dom2image.toBlob(this.image)
      .then(blob => {
        fileSaver.saveAs(blob, 'meme-image.png');
      });
  };

  render() {
    const { content, url } = this.state;
  }
}