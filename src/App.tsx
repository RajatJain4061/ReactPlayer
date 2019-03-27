import React, {Component} from 'react';
import Playlist from './components/Playlist';
import { Provider } from 'react-redux';
import store from './store/index';

import './App.css';

class App extends Component {
    render() {

        return (
            <Provider store={store}>
                <Playlist/>
            </Provider>
        );
    }
}

export default App;
