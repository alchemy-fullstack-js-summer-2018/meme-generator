import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';

class App extends Component {
  
  state = {
    contentHeader: 'that feeling when',
    contentFooter: 'it\'s 4am & you\'re out of night soda',
    color: 'white',
    textSize: '6',
    url: 'https://i0.wp.com/catnamescity.com/wp-content/uploads/2012/08/Unisex-cat-names_cat-names-city_kitten-1.jpg?fit=650%2C650&ssl=1'
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
          <label>Pick font size:<input type="text" value={textSize} onChange={this.handleTextChange}/></label>
          <label>Add image (650px) url:<Background url={url} onChoose={this.handleBgChoose}/></label>
        </section>

        <section>
          <div id="yourmeme">
            <h4>Your Meme:</h4>
          </div>
          <section className="meme-say">
            <div>
              <MemeSays contentHeader={contentHeader} contentFooter={contentFooter} url={url} color={color} textSize={textSize}/>
            </div>
            <p>
              <button onClick={this.handleExport}>SAVE</button>
            </p>
          </section>
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