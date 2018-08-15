import React, { Fragment, Component } from 'react';
import styles from './App.css';
// import fileSaver from 'file-saver';

class App extends Component {
  state = {
    topContent: 'hello',
    bottomContent: 'there',
    url: 'http://i.ytimg.com/vi/5_j_ilXDFxY/maxresdefault.jpg'
  };

  handleTopContentChange = (topContent = '') => {
    this.setState({ topContent });
  };

  handleBottomContentChange = (bottomContent = '') => {
    this.setState({ bottomContent });
  };

  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };

  render() {
    const { url, topContent, bottomContent } = this.state;

    return (
      <main className={styles.app}>
        <section>
          <h1>Meme Generator</h1>
          <MemeText label='Top' content={topContent} onChange={this.handleTopContentChange}/>
          <MemeText label='Bottom' content={bottomContent} onChange={this.handleBottomContentChange}/>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
        </section>

        <section className='dank-meme'>
          <h2>Here Be Your Dank Meme</h2>
          <AddText topContent={topContent} bottomContent={bottomContent} url={url}/>
        </section>
      </main>
    );
  }
}

function MemeText({ content, onChange, label }) {
  return (
    <p>
      <label>
        {label} Text:
        <input
          value={content}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
  );
}

function AddText({ url, topContent, bottomContent }) {
  return (
    <Fragment>
      <div style={{ background: `url(${url}) no-repeat center / auto 500px` }}>
        <h3 id='top'>{topContent}</h3>
        <h3 id='bottom'>{bottomContent}</h3>
      </div>
    </Fragment>
  );
}

function Background({ url, onChoose }) {
  return (
    <label>
      Background image:
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