import React, { Component, Fragment } from 'react';
import styles from './App.css';

class App extends Component {

  state = {
    memeHeader: 'Header',
    memeFooter: 'Footer',
    url: 'Background'
  };

  handleHeaderChange = (memeHeader = '') => {
    this.setState({ memeHeader });
  };

  handleFooterChange = (memeFooter = '') => {
    this.setState({ memeFooter });
  };

  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };

  render() {
    const { memeHeader, memeFooter, url } = this.state;

    return  (
      <main className={styles.app}>
        <section>
          <h1>Meme Generator!</h1>
          <MemeHeader memeHeader={memeHeader} onChange={this.handleHeaderChange}/>
          <MemeFooter memeFooter={memeFooter} onChange={this.handleFooterChange}/>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
          <p>{memeHeader}</p>
          <p>{memeFooter}</p>
          <p>{url}</p>
        </section>

        <section>
          <h2>Your meme!</h2>
          <MemeGenerator memeHeader={memeHeader} memeFooter={memeFooter} url={url}/>
        </section>

      </main>

    );
  }
}

function MemeHeader({ memeHeader, onChange }) {
  return (
    <p>
      <label>
        Meme Header:
        <input
          value={memeHeader}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
  );
}

function MemeFooter({ memeFooter, onChange }) {
  return (
    <p>
      <label>
        Meme Footer:
        <input
          value={memeFooter}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
  );
}

function Background({ url, onChoose }) {
  return (
    <label>
      Background:
      <input value={url} onChange={({ target }) => onChoose(target.value)}/>
    </label>
  );
}

function MemeGenerator({ memeHeader, memeFooter, url }) {

  return (
    <Fragment>
      <pre style={{ background: `url(${url})` }}>{memeHeader}<br/>{memeFooter}</pre>
    </Fragment>
  );
}

export default App;