import React, { Component, Fragment } from 'react';
import styles from './App.css'
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

class App extends Component {

  state = {
    topText: 'Your text here!',
    url: 'https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg'
  };

  handleTopTextChange = (topText = ' ') => {
    this.setState({ topText });
  };

  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };

  handleExport = () => {
    dom2image.toBlob(this.image)
      .then(blob => {
        fileSaver.saveAs(blob, 'my-meme.png');
      });
  };

  render() {
    const { topText, url } = this.state;
    return (
      <main className={styles.app}>
        <section>
          <h1>Meme it on me!</h1>
          <TopText topText={topText} onChange={this.handleTopTextChange}/>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
        </section>

        <section className="meme">
          <span ref={node => this.image = node}>
            <Meme topText={topText} url={url}/>
          </span>
          <p>
            <button onClick={this.handleExport}>Save meme</button>
          </p>
        </section>
      </main>
    );
  }
}

function Meme({ topText, url }) {
  return (
    <Fragment>
      <div style={{ background: `url(${url}) no-repeat` }}>{topText}</div>
    </Fragment>
  ); 
}

function TopText({ topText, onChange }) {
  return (
    <h2>
      <label>
        Header text:
        <input
          value={topText}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </h2>
  );
}

function Background({ url, onChoose }) {
  return (
    <label>
      Background image:
      <input value={url} onChange={({ target }) => onChoose(target.value)}/>
      <input type="file" onChange={({ target }) => {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => onChoose(reader.result);
      }}/>
    </label>
  );
}

export default App;