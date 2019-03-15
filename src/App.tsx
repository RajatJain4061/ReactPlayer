import React, {Component} from 'react';
import Playlist from './components/Playlist';

import './App.css';

class App extends Component {

    playlist = [
        {
            url: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4',
            id: 1,
            title: 'Jungle King',
            previewStartTime: '0',
            previewStopTime: '20',
            playing: false,
            frameHeight: "100%",
            frameWidth: "100%"
        }, {
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            id: 2,
            title: 'Big Buck Bunny: A jungle story',
            previewStartTime: '0',
            previewStopTime: '60',
            playing: false,
            frameHeight: "100%",
            frameWidth: "100%"
        }, {
            url: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-slow.mp4',
            id: 3,
            title: 'Snail',
            previewStartTime: '0',
            previewStopTime: '60',
            frameHeight: "100%",
            playing: false,
            frameWidth: "100%"
        },
        {
            url: 'https://d3c33hcgiwev3.cloudfront.net/jZeTgPItEeaCmw6hz_dhfA.processed/full/360p/index.webm?Expires=1552521600&Signature=cqVe0rQnBLw-FpXZuOYHapv~5jOFHIAiwwRCPW4r2nWfZ8~QlJJcWvFchLpOvBX4sDlGtPgqAiFOY1lA~IoWjgz~-hrMAyRMuFsB9ANyuz~333IFuTr2L~Ekpax-SzpbKAs5rbUpet6lf4AQHOqygvdXTm97RMxdebFwWrArCJE_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A',
            id: 4,
            title: 'Jungle King',
            previewStartTime: '0',
            playing: false,
            previewStopTime: '20',
            frameHeight: "100%",
            frameWidth: "100%"
        }, {
            url: 'https://vimeo.com/1084537',
            id: 5,
            title: 'Big Buck Bunny: A jungle story',
            previewStartTime: '0',
            previewStopTime: '60',
            playing: false,
            frameHeight: "100%",
            frameWidth: "100%"
        }, {
            url: 'https://soundcloud.com/adhesivewombat/adhesivewombat-8-bit-adventure',
            id: 6,
            title: 'Snail',
            previewStartTime: '0',
            previewStopTime: '60',
            playing: false,
            frameHeight: "100%",
            frameWidth: "100%"
        },
    ];

    render() {

        return (
            <div className="App">
                <Playlist playlist={this.playlist}/>
            </div>
        );
    }
}

export default App;
