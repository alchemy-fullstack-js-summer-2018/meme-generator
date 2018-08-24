import React, { Component, Fragment } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';


class App extends Component {

  state ={
    content: 'I luv REAL Food!',
    url: 'https://www.castlighthealth.com/wp-content/uploads/2018/03/HealthyFood.jpg'
  };
  
  handleContentChange = (content = ' ') => {
    this.setState({ content  });
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
    
    const { content, url } = this.state;
    
    return ( 
      <main className={styles.app}>
        <section>
          <h2>Meme Food</h2>
          <Content content={content} onChange={this.handleContentChange}/>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
        </section>

        <section className="text">
          <p ref={node => this.image = node}>
            <Meme content={content} url={url}/>
          </p>
          <p>
            <button onClick={this.handleExport}>Export</button>
          </p>
        </section>

      </main>
    );
  }
}

function Meme({ content, url }) {
  return (
    <Fragment>
      <div style={{ background: `url(${url}) no-repeat` }}>{content}</div>
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

// url: 'https://bloximages.newyork1.vip.townnews.com/wtxl.com/content/tncms/assets/v3/editorial/f/4c/f4cfe044-2124-11e8-ba4e-933042f59627/5a9e66614e64b.image.jpg?resize=1200%2C630'
// url: 'https://media.eterritoire.fr/?u=aHR0cDovL2N0LWR3LmF5YWxpbmUuY29tOjgwL2ZpY2hpZXJzL2ZpY2hlcy9waG90b3MvNTg5MDE4NjEtbGVzLWxlZ3VtZXMtZXQtbGVzLWZydWl0cy1zdXItZm9uZC1ydXN0aXF1ZS1lbi1ib2lzLWNvcGllLWVzcGFjZS5qcGc~'
// url: 'http://www.diycraftsguru.com/wp-content/uploads/2017/03/ultimate-real-food-eating-guide-and-recipes.jpg'
// url: 'https://life.spartan.com/wp-content/uploads/2018/03/wholefood.jpg'
// url: 'https://img.posterlounge.co.uk/images/wbig/poster-naturkost-1346435.jpg'
// url: 'https://img.posterlounge.co.uk/images/wbig/poster-naturkost-1346435.jpg'