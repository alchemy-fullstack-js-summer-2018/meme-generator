import React, { Component, Fragment } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from '.App.css';

class App extends Component {

  state = {
    content: 'Enter Text Here',
    url: 'http://scienceblogs.com/zooillogix/wp-content/blogs.dir/253/files/2012/04/i-dd768d762eee901e4c484efece641756-walrus_baby_blingbyjlmhires08.JPG'
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

return (
      <main className={styles.app}>
        <section>
          <h2>Set Options</h2>
          <Content content={content} onChange={this.handleContentChange} />
          <Background url={url} onChoose={this.handleBackgroundChoose} />
        </section>

        <section className="walrus-sez">
          <h2>The Walrus Sez</h2>
          <p ref={node => this.image = node}>
            <WalrusSez content={content} url={url}/>
          </p>
        </section>
      </main>
    );
  }
}