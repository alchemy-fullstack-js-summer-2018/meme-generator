import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';


class App extends Component {
  state = {
    contentHeader: 'hi ya dummy',
    contentFooter: 'hey hey hey',
    color: 'blue',
    textSize: '8',
    url: 'https://atlantisbahamas.com/media/Things%20To%20Do/Water%20Park/Beaches/Widget/Beaches_CoveBeach.jpg'
  };

handleHeaderChange = ({ target }) => {
  this.setState({
    contentHeader: target.value
  });
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
      <section>
        <h2>is i showing?? app.js</h2>
        <label>Meme:<input value={contentHeader} onChange={this.handleHeaderChange}/></label>
        <label>Add image (400px) url:<Background url={url} onChoose={this.handleBgChoose}/></label>
      </section>

      <section className="meme-say">
        <h3> your meme</h3>
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
      <h2 id="meme-header" style={{ color }}><font size={textSize}>{contentHeader}</font></h2>
      <h3 id="meme-footer" style={{ color }}><font size={textSize}>{contentFooter}</font></h3>
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