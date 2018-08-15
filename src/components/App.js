import React, { Component, Fragment } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';

class App extends Component {

    state = {
        topcontent: '¿Cuál es el precio de la tortilla?',
        bottomcontent: ' No soy la señora de la casa',
        url: 'https://cms.qz.com/wp-content/uploads/2017/01/mexican-president-enrique-pena-nieto-e1485451572857.jpg?quality=75&strip=all&w=1600'
    };
 
    handleTopContentChange = (topcontent = ' ') => {
        this.setState({ topcontent });
    };

    handleBottomContentChange = (bottomcontent = ' ') => {
        this.setState({ bottomcontent });
    };

    handleBackgroundChoose = (url = ' ') => {
        this.setState({ url })
    }

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
                <TopContent topcontent={topcontent} onChange={this.handleContentChange}/>
                <BottomContent bottomcontent={bottomcontent} onChange={this.handleContentChange}/>
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