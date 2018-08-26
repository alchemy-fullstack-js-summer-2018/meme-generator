import React, { Component, Fragment } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';


class App extends Component {

  state ={
    content: 'I luv REAL Food!',
    color: 'black',
    fontSize: '5',
    url: 'https://www.castlighthealth.com/wp-content/uploads/2018/03/HealthyFood.jpg'
  };
  
  handleContentChange = (content = ' ') => {
    this.setState({ content  });
  };

  handleColorChange = ({ target }) => {
    this.setState({ color: target.value });
  };

  handleTextChange = ({ target }) => {
    this.setState({ fontSize: target.value });
  };
  
  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };
  
  handleExport = () => {
    dom2image.toBlob(this.image)
      .then(blob => {
        fileSaver.saveAs(blob, 'cute-realfood.png');
      });
  };
  
  render() { 
    
    const { content, url, color, fontSize } = this.state;
    
    return ( 
      <main className={styles.app}>
        <section>
          <h2>Meme Food</h2>
          <Content content={content} onChange={this.handleContentChange}/>
          <label>Pick font color:<input type="color" value={color} onChange={this.handleColorChange}/></label>
          <label>Pick font size:<input type="text" value={fontSize} onChange={this.handleTextChange}/></label>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
        </section>

        <section className="text">
          <p ref={node => this.image = node}>
            <Meme content={content} url={url} color={color} fontSize={fontSize}/>
          </p>
          <p>
            <button onClick={this.handleExport}>Export</button>
          </p>
        </section>

      </main>
    );
  }
}

function Meme({ content, url, color, fontSize }) {
  return (
    <Fragment>
      <div style={{ background: `url(${url}) no-repeat` }}>
        <h2  style={{ color }}><font size={fontSize}>{content}</font></h2>
      </div>
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


export default App;   

