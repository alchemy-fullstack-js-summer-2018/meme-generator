import React, { Component } from 'react';
import styles from './App.css';

class App extends Component {
  state = {
    header: 'Header Here'
  };

  handleHeaderChange = (header = '') => {
    this.setState({ header });
  };

  render() {
    const { header } = this.state;

    return (
      <main className={styles.app}>
        <h1>Meme Generator</h1>
        <Meme header={header}/>
        <Header header={header} onChange={this.handleHeaderChange}/>
      </main>
    );
  }
}

function Meme({ header }) {
  return (
    <p>{header}</p>
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

export default App;