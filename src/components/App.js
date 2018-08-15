import React, { Component, Fragment } from 'react';
import styles from './App.css';


class App extends Component {

  state ={
    content: 'I luv REAL Food!',
    url: 'http://www.diycraftsguru.com/wp-content/uploads/2017/03/ultimate-real-food-eating-guide-and-recipes.jpg'
  };

  handleContentChange = (content = ' ') => {
    this.setState({ content});
  };
  

render() { 

  const { content, url } = this.state;
  
  return ( 
    <main className={styles.app}>
      <section>
        <h2>Meme Project</h2>
        <Content content={content} onChange={this.handleContentChange}/>
      </section>

      <section>
        <Meme content={content} url={url}/>
        </section>

    </main>
  );
}
}

function Meme  ({ content, url }) {
  return (
    <Fragment>
      <div style={{ background: `url(${url}) no-repeat` }}>{content}</div>
      </Fragment> 
  )
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