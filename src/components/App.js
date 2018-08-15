import React, { Component } from 'react';
import styles from './App.css';

class App extends Component {
  state = {
    header: 'Header Here',
    footer: 'Footer Here'
  };

  handleHeaderChange = (header = '') => {
    this.setState({ header });
  };
  handleFooterChange = (footer = '') => {
    this.setState({ footer });
  };

  render() {
    const { header, footer } = this.state;

    return (
      <main className={styles.app}>
        <h1>Meme Generator</h1>
        <Meme header={header} footer={footer}/>
        <Header header={header} onChange={this.handleHeaderChange}/>
        <Footer footer={footer} onChange={this.handleFooterChange}/>
      </main>
    );
  }
}

function Meme({ header, footer }) {
  return (
    <section>
      <p>{header}</p>
      <p>{footer}</p>
    </section>
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