import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';
class App extends Component {

  // TODO:
  // dynamic font color and sizing

  state = {
    memeHeader: 'Meme Header',
    memeFooter: 'Meme Footer',
    color: '#FFFFFF',
    url: 'https://i.pinimg.com/736x/01/09/ca/0109cab1811844ab02c614a1281e520c--baby-koala-koala-bears.jpg'
  };

  handleHeaderChange = ({ target }) => {
    this.setState({
      memeHeader: target.value
    });
  };

  handleFooterChange = ({ target }) => {
    this.setState({
      memeFooter: target.value
    });
  };

  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };

  handleColorChange = ({ target }) => {
    this.setState({ color: target.value });
  };

  handleExport = () => {
    const meme = document.getElementById('meme');
    dom2image.toBlob(meme)
      .then(blob => {
        fileSaver.saveAs(blob, 'awesome-meme.png');
      });
  };

  render() {
    const { memeHeader, memeFooter, url, color } = this.state;

    return (
      <main className={styles.app}>
        <section className="input-container">
          <h2>Awesome Meme Generator</h2>
          <label>Meme Header:<input value={memeHeader} onChange={this.handleHeaderChange}/></label>
          <label>Meme Footer:<input value={memeFooter} onChange={this.handleFooterChange}/></label>
          <label>Choose Font Color:<input type="color" value={color} onChange={this.handleColorChange}/></label>
          <label>Add image (400px) url:<Background url={url} onChoose={this.handleBackgroundChoose}/></label>
        </section>

        <section className="meme-say">
          <h2>*~Behold Your Meme~*</h2>
          <div>
            <MemeSay memeHeader={memeHeader} memeFooter={memeFooter} url={url} color={color}/>
          </div>
          <p>
            <button onClick={this.handleExport}>Save Meme!</button>
          </p>
        </section>
      </main>
    );
  }
}

function MemeSay({ url, memeHeader, memeFooter, color }) {
  console.log('color', color);
  return (
    //TODO: look into setting no-repeat in css file
    <div id="meme" className="meme-container" style={{ background: `url(${url}) no-repeat` }}>
      <h2 id="meme-header" style={{ color }}>{memeHeader}</h2>
      <h3 id="meme-footer" style={{ color }}>{memeFooter}</h3>
    </div>
  );
}

function Background({ url, onChoose }) {
  return (
    <label>
      <input value={url} onChange={({ target }) => onChoose(target.value)}/>
      <input type="file" onChange={({ target }) => {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => onChoose(reader.result);
      }}/>
    </label>
  );
}

export default App;