import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';

class App extends Component {
  state = {
    contentHeader: 'hi ya dummy',
    url: 'https://atlantisbahamas.com/media/Things%20To%20Do/Water%20Park/Beaches/Widget/Beaches_CoveBeach.jpg'
  };

handleHeaderChange = ({ target }) => {
  this.setState({
    contentHeader: target.value
  })
}

render() {
  const { contentHeader } = this.state;

  return (
    <main className={styles.app}>
      <section>
        <h2>is i showing?? app.js</h2>
        <label>Meme:<input value={contentHeader}/></label>

      </section>
    </main>
  );
}
}

export default App;