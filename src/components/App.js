import React, { Component } from 'react';
import '../styles/main.css';
class App extends Component {

  state = {
    content: 'Hello State!',
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
    const { content, url, onChoose } = this.state;

    return (
      <main>
        <section>
          <h2>Content you are looking for</h2>
          <input value={content} onChange={this.handleContentChange}/>
          <input value={url} onChange={this.handleBackgroundChoose}/>
          <input type="file" onChange={({ target }) => {
            const reader = new FileReader();
            reader.readAsDataURL(target.files[0]);
            reader.onload = () => onChoose(reader.result);
          }}/>
        </section>
      </main>
    );
  }
}

export default App;