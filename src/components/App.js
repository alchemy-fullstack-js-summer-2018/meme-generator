import React, { Component, Fragment } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';
class App extends Component {

  state = {
    content: 'Let\'s meme!',
    memeHeader: 'Meme Header',
    memeFooter: 'Meme Footer',
    url: 'https://i.pinimg.com/736x/01/09/ca/0109cab1811844ab02c614a1281e520c--baby-koala-koala-bears.jpg'
  }

  handleContentChange = ({ target }) => {
    this.setState({
      content: target.value
    });
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
    this.setState({ url })
  };

  render() {
    const { content, memeHeader, memeFooter, url } = this.state;

    return (
      <main className={styles.app}>
        <section className="input-container">
          <h2>Content you are looking for</h2>
          <input value={content} onChange={this.handleContentChange}/>
          <label>Meme Header:<input value={memeHeader} onChange={this.handleHeaderChange}/></label>
          <label>Meme Footer:<input value={memeFooter} onChange={this.handleFooterChange}/></label>
          <label>Add image (400px):<Background url={url} onChoose={this.handleBackgroundChoose}/></label>
        </section>

        <section className="meme-say">
          <h2>Behold Your Meme</h2>
          <div>
            <MemeSay content={content} memeHeader={memeHeader} memeFooter={memeFooter} url={url}/>
          </div>
        </section>
      </main>
    );
  }
}

function MemeSay({ url, memeHeader, memeFooter }) {
  
  return (
    <Fragment>
      <div className="meme-container" style={{ background: `url(${url}) no-repeat` }}>
        <h2 id="meme-header">{memeHeader}</h2>
          
        <h3 id="meme-footer">{memeFooter}</h3>
      </div>
    </Fragment>
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