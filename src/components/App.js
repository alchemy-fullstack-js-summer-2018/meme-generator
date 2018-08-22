import React, { Component, Fragment } from 'react';
import styles from './App.css';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

class App extends Component {

  state = {
    topText: 'Your text here!',
    bottomText: '...and here too.',
    url: 'https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg'
  };

  handleTopTextChange = (topText = '') => {
    this.setState({ topText });
  };

  handleBottomTextChange = (bottomText = '') => {
    this.setState({ bottomText });
  };

  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };

  handleExport = () => {
    const image = document.getElementById('image-meme');
    dom2image.toBlob(image)
      .then(blob => {
        fileSaver.saveAs(blob, 'my-meme.png');
      });
  };

  render() {
    const { topText, bottomText, url } = this.state;
    return (
      <main className={styles.app}>
        <section>
          <h1>Meme it on me!</h1>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
          <TopText topText={topText} onChange={this.handleTopTextChange}/>
          <BottomText bottomText={bottomText} onChange={this.handleBottomTextChange}/>
        </section>

        <section className="meme">
          <span ref={node => this.image = node}>
            <Meme topText={topText} bottomText={bottomText} url={url}/>
          </span>
          <p>
            <button onClick={this.handleExport}>Save meme</button>
          </p>
        </section>
      </main>
    );
  }
}

function Meme({ topText, bottomText, url }) {
  return (
    <Fragment>
      <div id="image-meme" style={{ background: `url(${url}) no-repeat left / auto 550px` }}>
        <div className="text-container">
          <p className="headerText">{topText}</p>
          <p className="footerText">{bottomText}</p>
        </div>
      </div>
    </Fragment>
  ); 
}

function TopText({ topText, onChange }) {
  return (
    <p>
      <label>
        Header text:
        <input
          value={topText}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
  );
}

function BottomText({ bottomText, onChange }) {
  return (
    <p>
      <label>
        Footer text:
        <input
          value={bottomText}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
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