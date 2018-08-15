import React, { Component, Fragment } from 'react';
// import dom2image from 'dom-to-image';
// import fileSaver from 'file-saver';
import styles from './App.css';

class App extends Component {

  state = {
    content: 'Meme Generator',
    memes: [],
    meme: 'default',
    url: 'https://i.imgur.com/hGkOZ.jpg' 
  };

  handleContentChange = ({ target }) => {
    this.setState({
      content: target.value
    });
  };

  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };

  render() {
    const { content, url } = this.state;

    return (
      <main className={styles.app}>
        <Fragment>
          <h1>Meme Generator</h1>
          <input value={content} onChange={this.handleContentChange}/>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
        </Fragment>

        <Fragment>
          <h2>Your Meme:</h2>
          <div className="meme">
            <YourMeme content={content} url={url}/>
          </div>
        </Fragment>
      </main>
    );
  }

  
}

function YourMeme({ content, url }) {
  return (
    <Fragment>
      <div style={{ background: `url(${url})` }}>{content}
      </div>
    </Fragment>
  );
}

function Background({ url, onChoose }) {
  return (
    <label>
          Background:
      <input value={url} onChange={({ target }) => onChoose(target.value)}/>
          
    </label>
  );
}

export default App;