import React, { Component } from 'react';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <main className={styles.app}>
        <section>
          <h1>Hello World!</h1>
          <p>More text here</p>
        </section>
      </main>
    );
  }
}

export default App;