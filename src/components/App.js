import React, { Component } from 'react';
import styles from './App.css';
import fileSaver from 'file-saver';
import dom2image from 'dom-to-image';

class App extends Component {
  state = {
    url: 'https://amp.thisisinsider.com/images/5abb9e6a3216741c008b462d-750-563.jpg',
    header: 'Header',
    footer: 'Footer'
  };

  handleUrlChange = (url = '') => {
    this.setState({ url });
  };

  handleHeaderChange = (header = '') => {
    this.setState({ header });
  };

  handleFooterChange = (footer = '') => {
    this.setState({ footer });
  };

  handleExport = () => {
    const meme = document.getElementById('meme');
    dom2image.toBlob(meme)
      .then(blob => fileSaver.saveAs(blob, 'my-meme.png'));
  };

  render() {
    const { header, footer, url } = this.state;

    return (
      <main className={styles.app}>
        <h1>Meme Generator</h1>
        <Meme header={header} footer={footer} url={url}/>
        <Background url={url} onSelect={this.handleUrlChange}/>
        <Header header={header} onChange={this.handleHeaderChange}/>
        <Footer footer={footer} onChange={this.handleFooterChange}/>
        <button onClick={this.handleExport}>Save</button>
      </main>
    );
  }
}


function Meme({ header, footer, url }) {
  return (
    <section id="meme" style={{
      background: `url(${url}) no-repeat center / auto 500px`
    }}>
      <h3 id="header">{header}</h3>
      <h3 id="footer">{footer}</h3>
    </section>
  );
}

function Background({ url, onSelect }) {
  return (
    <label>
      Background:
      <input value={url} onChange={({ target }) => onSelect(target.value)} />
      <input type="file" onChange={({ target }) => {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => onSelect(reader.result);
      }}/>
    </label>
  );
}

function Header({ header, onChange }) {
  return (
    <p>
      <label>
        Header:
        <input
          value={header}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
  );
}

function Footer({ footer, onChange }) {
  return (
    <p>
      <label>
        Footer:
        <input
          value={footer}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
  );
}

export default App;