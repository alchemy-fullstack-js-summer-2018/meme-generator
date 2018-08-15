import React, { Component } from 'react';
import styles from './App.css';

class App extends Component {
  state = {
    content: 'What a great beach',
    url: 'http://static.asiawebdirect.com/m/phuket/portals/kosamui-com/homepage/beaches/pagePropertiesImage/samui-beaches.jpg'
  };

  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };

  render() {
    const { url } = this.state;

    return (
      <main className={styles.app}>
        <section>
          <h1>Meme Generator</h1>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
          <p>More text here</p>
        </section>
      </main>
    );
  }
}

function Background({ url, onChoose }) {
  return (
    <label>
      Background:
      <input value={url} onChange={({ target }) => onChoose(target.value)}/>
    </label>
  );
}

export default App;