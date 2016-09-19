import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Movies from './components/Movies';

class App extends Component {
    render() {
        return (
            <Movies />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))