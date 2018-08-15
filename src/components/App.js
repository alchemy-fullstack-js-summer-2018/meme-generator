import React, { Component } from 'react';
import styles from './App.css';

class App extends Component {
  state = {
    url: 'https://amp.thisisinsider.com/images/5abb9e6a3216741c008b462d-750-563.jpg',
    header: 'Header Here',
    footer: 'Footer Here'
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

  render() {
    const { header, footer, url } = this.state;

    return (
      <main className={styles.app}>
        <h1>Meme Generator</h1>
        <Meme header={header} footer={footer} url={url}/>
        <Background url={url} onSelect={this.handleUrlChange}/>
        <Header header={header} onChange={this.handleHeaderChange}/>
        <Footer footer={footer} onChange={this.handleFooterChange}/>
      </main>
    );
  }
}

function Meme({ header, footer, url }) {
  return (
    <section>
      <p>{header}</p>
      <img src={url}/>
      <p>{footer}</p>
    </section>
  );
}

function Background({ url, onSelect }) {
  return (
    <label>
      Background:
      <input value={url} onChange={({ target }) => onSelect(target.value)} />
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