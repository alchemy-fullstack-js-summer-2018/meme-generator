import React, { Component, Fragment } from 'react';
import styles from './App.css';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

class App extends Component {

  state = {
    memeHeader: 'I can\'t.',
    memeFooter: 'You can.',
    url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjhkZGRhYzgtYWU1Ni00OTA0LTkyZGEtZDY3MTE4ZWQxNGY4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX477_CR0,0,477,268_AL_.jpg'
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

  handleExport = () => {
    const meme = document.getElementById('background');
    dom2image.toBlob(meme)
      .then(blob => {
        fileSaver.saveAs(blob, 'saved-meme.png');
      });
  };

  render() {
    const { memeHeader, memeFooter, url } = this.state;

    return  (
      <main className={styles.app}>
        <section id="inputs">
          <h1>Meme Generator</h1>
          <MemeHeader memeHeader={memeHeader} onChange={this.handleHeaderChange}/>
          <MemeFooter memeFooter={memeFooter} onChange={this.handleFooterChange}/>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
        </section>
        <br/>
        <section id="meme">
          <MemeGenerator memeHeader={memeHeader} memeFooter={memeFooter} url={url}/>
          <p>
            <button onClick={this.handleExport}>Save Meme</button>
          </p>
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
        <br/>
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
        <br/>
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
      <br/>
      <input value={url} onChange={({ target }) => onChoose(target.value)}/>
      <br/>
      <input type="file" onChange={({ target }) => {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => onChoose(reader.result);
      }}/>
    </label>
  );
}

function MemeGenerator({ memeHeader, memeFooter, url }) {

  return (
    <Fragment>
      <section id="background" style={{ background: `url(${url}) center/100% 100% no-repeat ` }}>
        <h2>{memeHeader}</h2>
        <br/>
        <h2>{memeFooter}</h2>
      </section>
    </Fragment>
  );
}

export default App;