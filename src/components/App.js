import React, { Fragment, Component } from 'react';
import styles from './App.css';

class App extends Component {
  state = {
    topContent: 'What a great beach',
    bottomContent: 'Cool story bro',
    url: 'http://static.asiawebdirect.com/m/phuket/portals/kosamui-com/homepage/beaches/pagePropertiesImage/samui-beaches.jpg'
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
          <MemeText label='Top' content={topContent} onChange={this.handleContentChange}/>
          <MemeText label='Bottom' content={bottomContent} onChange={this.handleContentChange}/>
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
      <div style={{ background: `url(${url}) no-repeat center`, backgroundSize: 'auto 500px' }}>
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
    </label>
  );
}

export default App;