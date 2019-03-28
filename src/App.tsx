import React, {Component} from 'react';
import Playlist from './components/Playlist';
import { Provider } from 'react-redux';
import store from './store/index';
import SinglePlayerItem from './components/SinglePlayerItem';

import './App.css';

class App extends Component {
    render() {

        return (
            <Provider store={store}>
                <Playlist/>
                <SinglePlayerItem/>
            </Provider>
        );
    }
}

export default App;
