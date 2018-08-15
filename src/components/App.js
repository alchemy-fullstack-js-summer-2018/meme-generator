import React, { Component, Fragment } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';

class App extends Component {

    state = {
      topcontent: 'How I look like',
      bottomcontent: 'When I am late for work',
      url: 'https://i.ytimg.com/vi/VeuoKqb2ihQ/maxresdefault.jpg'
    };
 
    handleTopContentChange = (topcontent = ' ') => {
      this.setState({ topcontent });
    };

    handleBottomContentChange = (bottomcontent = ' ') => {
      this.setState({ bottomcontent });
    };

    handleBackgroundChoose = (url = ' ') => {
      this.setState({ url });
    };

    handleExport = () => {
      dom2image.toBlob(this.image)
        .then(blob => {
          fileSaver.saveAs(blob, 'chad-meme.png');
        });
    };

    render() {
      const { topcontent, bottomcontent, url } = this.state;

      return (
        <main className={styles.app}>
          <section>
            <h2>Set Options</h2>
            <TopContent topcontent={topcontent} onChange={this.handleTopContentChange}/>
            <BottomContent bottomcontent={bottomcontent} onChange={this.handleBottomContentChange}/>
            <Background url={url} onChoose={this.handleBackgroundChoose}/>
          </section>

          <section className="cow-say">
            <h2>The Meme Generator</h2>
            <p ref={node => this.image = node}>
              <MemeSay topcontent={topcontent}  bottomcontent={bottomcontent} url={url}/>
            </p>
            <p>
              <button onClick={this.handleExport}>Export</button>
            </p>
          </section>

        </main>
      );
    }
}

function MemeSay({ topcontent, bottomcontent, url }) {
  return (
    <Fragment>
      <pre style={{ background: `url(${url}) no-repeat` }}>{topcontent}</pre>
      <pre>{bottomcontent}</pre>
    </Fragment>
  );
}

function Background({ url, onChoose }) {
  return (
    <label>
        Background: 
      <input value={url} onChange={({ target }) => onChoose(target.value)}/>
      <input type="file" onChange={({ target }) => {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => onChoose(reader.result);
      }}/>
    </label>
  );
}

function TopContent({ topcontent, onChange }) {
  return (
    <p>
      <label>
        Top Content: 
        <input 
          value={topcontent} 
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
  );
}

function BottomContent({ bottomcontent, onChange }) {
  return (
    <p>
      <label>
          Bottom Content: 
        <input 
          value={bottomcontent} 
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
  );
}
 

export default App;