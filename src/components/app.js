import React, { Component } from 'react';
import styles from './App.css';

class App extends Component {
  state = {
    content: 'hi ya dummy',
    url: 'https://atlantisbahamas.com/media/Things%20To%20Do/Water%20Park/Beaches/Widget/Beaches_CoveBeach.jpg'
  };

  render() {
    const { content } = this.state;

    return (
      <main>
        <section>
          <h2>is i showing?? app.js</h2>

        </section>
      </main>
    );
  }
}

export default App;