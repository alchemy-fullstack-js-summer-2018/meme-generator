import React, { Fragment, Component } from 'react';
import styles from './App.css';

class App extends Component {
  state = {
    content: 'What a great beach',
    url: 'http://static.asiawebdirect.com/m/phuket/portals/kosamui-com/homepage/beaches/pagePropertiesImage/samui-beaches.jpg'
  };

  handleContentChange = (content = '') => {
    this.setState({ content });
  };

  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };

  render() {
    const { url, content } = this.state;

    return (
      <main className={styles.app}>
        <section>
          <h1>Meme Generator</h1>
          <Content content={content} onChange={this.handleContentChange}/>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
          <p>More text here</p>
        </section>

        <section className='dank-meme'>
          <h2>Here Be Your Dank Meme</h2>
          <AddText content={content} url={url}/>
        </section>
      </main>
    );
  }
}

function Content({ content, onChange }) {
  return (
    <p>
      <label>
        Content:
        <input
          value={content}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
  );
}

function AddText({ url, content }) {
  return (
    <Fragment>
      <div style={{ background: `url(${url})` }}>{content}</div>
    </Fragment>
  );
}

function Background({ url, onChoose }) {
  return (
    <label>
      Background:
      <input value={url} onChange={({ target }) => onChoose(target.value)}/>
    </label>
  );
}

export default App;