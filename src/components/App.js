import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from '../styles/app.css';

class App extends Component {

  state = {
    textContent: 'Enter Text Here',
    url: './assets/walrussez.JPG'
  };

  handleContentChange = (textContent = '') => {
    this.setState({ textContent });
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
    const { textContent, url } = this.state;

    return (
      <main className={styles.app}>
        <section>
          <h1>Meme Generator</h1>
          <Content label='Top' content={textContent} onChange={this.handleContentChange}/>
          
          <Background url={url} onChoose={this.handleBackgroundChoose}/>

        </section>

        <section className="walrus-sez">
          <h2>The Walrus Sez</h2>
          <section ref={node => this.image = node}>
            <WalrusSez content={textContent} url={url}/>
          </section>
          <p>
            <button onClick={this.handleExport}>Save meme</button>
          </p>
        </section>
      </main>
    );
  }
}

function Content({ textContent, onChange, label }) {
  return (
    <p>
      <label>
        {label} Text:
        <input
          value={textContent}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
  );
}

function WalrusSez({ url, textContent }) {
  return (
    <div style={{ background: `url(${url}) no-repeat center / auto 500px` }}>
      <h3 id='top'>{textContent}</h3>
    </div>
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
