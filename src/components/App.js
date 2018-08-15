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
      <div className="meme-container" style={{ background: `url(${url}) no-repeat` }}>
        <h2 id="meme-header">Meme Header</h2>
          
        <h3 id="meme-footer">Meme Footer</h3>
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