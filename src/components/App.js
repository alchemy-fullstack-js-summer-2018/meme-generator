import React, { Component, Fragment } from 'react';
import styles from './App.css';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

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

  handleExport = () => {
    dom2image.toBlob(this.image)
      .then(blob => {
        fileSaver.saveAs(blob)
      });
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
        </section>
        <br/>
        <section>
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
      <section id="background" style={{ background: `url(${url}) no-repeat` }}>{memeHeader}<br/>{memeFooter}</section>
    </Fragment>
  );
}

export default App;