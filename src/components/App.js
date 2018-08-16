import React, { Component, Fragment } from 'react';
import styles from './App.css';
import dom2image from 'dom-to-image';
import fileSave from 'file-saver';

class App extends Component {

  state = { 
    topContent: 'Type your dank meme text',
    bottomContent: 'More dank meme text',
    url: 'https://i0.kym-cdn.com/photos/images/original/000/512/106/5f3.png'
  };

  handlePictureChoose = (url = '') => {
    this.setState({ url });
  };

  handleTopContentChange = (topContent = '') => {
    this.setState({ topContent });
  };

  handleBottomContentChange = (bottomContent = '') => {
    this.setState({ bottomContent });
  };

  handleSave = () => {
    dom2image.toBlob(this.image)
      .then(blob => {
        fileSave.saveAs(blob, 'maymay.png');
      });
  };

  render() {
    const { url, topContent, bottomContent } = this.state;

    return (
      <main className={styles.app}>
        <h1>Lets make some memes!</h1>
        <section>
          <p id='how'>Upload an image, input your top and bottom text, and save! Its that easy!</p>
          <Content label='Top' content={topContent} onChange={this.handleTopContentChange}/>
          <Content label='Bottom' content={bottomContent} onChange={this.handleBottomContentChange}/>
          <Picture url={url} onChoose={this.handlePictureChoose}/>
        </section>
        <section ref={node => this.image = node}>
          <Meme url={url} topContent={topContent} bottomContent={bottomContent}/>
        </section>
        <button onClick={this.handleSave}>Save</button>
      </main>
    );
  }
}

function Meme({ url, topContent, bottomContent }) {
  return (
    <Fragment>
      <div id='container' style={{ background: `url(${url}) no-repeat center/ auto 500px` }}>
        <p id='toptext'>{topContent}</p>
        <p id='bottomtext'>{bottomContent}</p>
      </div>
    </Fragment>
  );
}

function Picture({ url, onChoose }) {
  return (
    <label>
      Picture:
      <input value={url} onChange={({ target }) => onChoose(target.value)}/>
      <input type='file' onChange={({ target }) => {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => onChoose(reader.result);
      }}/>
    </label>
  );
}

function Content({ content, onChange, label }) {
  return (
    <p>
      <label>
        {label} Text Here:
        <input
          value={content}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
  );
}

export default App;