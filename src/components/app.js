import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';

class App extends Component {
  
  state = {
    contentHeader: 'that feeling when',
    contentFooter: 'you get out of bed to eat a night popsicle',
    color: 'white',
    textSize: '8',
    url: 'https://www.austinchronicle.com/binary/27db/dolls.jpg'
  };

  handleHeaderChange = ({ target }) => {
    this.setState({
      contentHeader: target.value
    });
  };

  handleBgChoose = (url = '') => {
    this.setState({ url });
  };

  handleColorChange = ({ target }) => {
    this.setState({ color: target.value });
  };

  handleTextChange = ({ target }) => {
    this.setState({ textSize: target.value });
  };

  handleColorChange = ({ target }) => {
    this.setState({ color: target.value });
  };

  handleFooterChange = ({ target }) => {
    this.setState({
      contentFooter: target.value
    });
  };

  handleExport = () => {
    const meme = document.getElementById('meme');
    dom2image.toBlob(meme)
      .then(blob => {
        fileSaver.saveAs(blob, 'dat-meme.png');
      });
  };

  render() {
    const { contentHeader, contentFooter, color, textSize, url } = this.state;

    return (
      <main className={styles.app}>
        <section className="input-container">
          <h1>Make Yo Meme</h1><br/>
          <label>Top Text:<input value={contentHeader} onChange={this.handleHeaderChange}/></label>
          <label>Bottom Text:<input value={contentFooter} onChange={this.handleFooterChange}/></label>
          <label>Pick font color:<input type="color" value={color} onChange={this.handleColorChange}/></label>
          <label>Add image url: <Background url={url} onChoose={this.handleBgChoose}/></label>
        </section>

        <section className="meme-say">
          <div id="yourmeme">
            <h4>Your Meme:</h4>
          </div>
          <div>
            <MemeSays contentHeader={contentHeader} contentFooter={contentFooter} url={url} color={color} textSize={textSize}/>
          </div>
          <p>
            <button onClick={this.handleExport}>SAVE</button>
          </p>
        </section>
      </main>
    );
  }
}

function MemeSays({ url, contentHeader, contentFooter, color, textSize }) {
  return (
    <div id="meme" className="meme-container" style={{ background: `url(${url}) no-repeat` }}>
      <h3 id="meme-header" style={{ color }}><font size={textSize}>{contentHeader}</font></h3>
      <h2 id="meme-footer" style={{ color }}><font size={textSize}>{contentFooter}</font></h2>
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