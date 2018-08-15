import React, { Component } from 'react';
import '../styles/main.css';
class App extends Component {

  state = {
    content: 'Hello State!'
  }

  handleContentChange = ({ target }) => {
    this.setState({
      content: target.value
    });
  };

  render() {
    const { content } = this.state;

    return (
      <main>
        <section>
          <h2>Content you are looking for</h2>
          <input value={content} onChange={this.handleContentChange}/>
        </section>
      </main>
    );
  }
}

export default App;