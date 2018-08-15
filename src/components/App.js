import React, { Component, Fragment } from 'react';
import cowsay from 'cowsay-browser';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';

class App extends Component {

    state = {
        content: 'Helllooo!',
        cows: [],
        cow: 'default'
    };

    handleCowSelect = (cow = 'default') => {
        this.setState({ cow });
    };
 
    handleContentChange = (content = ' ') => {
        this.setState({ content });
    };

    render() {
        const { content, cows, cow, url } = this.state;

        return (
            <main className="App">
                <section>
                <h2>Set Options</h2>
                <Content content={content} onChange={this.handleContentChange}/>
                </section>

                <section className="cow-say">
                    <h2>The Meme Generator</h2>
                    <p ref={node => this.image = node}>
                        <CowSay content={content} cow={cow} url={url}/>
                    </p>
                    <p>
                        <button onClick={this.handleExport}>Export</button>
                    </p>
                </section>
            </main>
        );
    }
}

function CowSay({ content, cow, url }) {
    const cowSaid = cowsay.say({
    text: content || ' ',
    f: cow
    });

    return (
        <Fragment>
            <pre style={{ background: `url(${url})`}}>{cowSaid}</pre>
        </Fragment>
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