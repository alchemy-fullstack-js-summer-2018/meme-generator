import React, { Component } from 'react';
import styles from './App.css';

class App extends Component {
  state = {
    content: 'test'
  };

  handleChange = ({ target }) => {
    this.setState({
      content: target.value
    });
  };

  render() {
    const { content } = this.state;

    return (
      <main className={styles.app}>
        <h1>Meme Generator</h1>
        <p>{content}</p>
        <input value={content} onChange={this.handleChange}/>
      </main>
    );
  }
}

export default App;