import React, { Component, Fragment } from 'react';
import styles from './App.css';
class App extends Component {

  state = {
    content: 'Let\'s meme!',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIPS9VeFtecRovTEZmWFWl6RtmscJLkz7a6carZ9-IqY0ZOGPJwA'
  }

  handleContentChange = ({ target }) => {
    this.setState({
      content: target.value
    });
  };

  handleBackgroundChoose = (url = '') => {
    this.setState({ url })
  };

  render() {
    const { content, url } = this.state;

    return (
      <main className={styles.app}>
        <section>
          <h2>Content you are looking for</h2>
          <input value={content} onChange={this.handleContentChange}/>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
        </section>

        <section className="meme-say">
          <h2>Behold Your Meme</h2>
          <div>
            <MemeSay content={content} url={url}/>
          </div>
        </section>
      </main>
    );
  }
}

function MemeSay({ content, url }) {
  
  return (
    <Fragment>
      <h2>Meme Header</h2>
      <div style={{ background: `url(${url}) no-repeat` }}>{content}</div>
      <h3>Meme Footer</h3>
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