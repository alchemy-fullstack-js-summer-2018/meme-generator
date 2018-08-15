import React, { Component, Fragment } from 'react';

class App extends Component {
  state = {
    content: 'hi ya dummy'
  };

  render() {
    const { content } = this.state;

    return(
      <main>
        <section>
          <h2>is i showing??</h2>

        </section>
      </main>
    )
  }
}

export default App;