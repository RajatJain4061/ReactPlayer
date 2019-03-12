import React, {Component} from 'react';
import Playlist from './components/Playlist';

import './App.css';

class App extends Component {

    playlist = [
        {
            url: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4',
            title: 'Jungle King',
            previewStartTime: '0',
            previewStopTime: '20',
            frameHeight: "100%",
            frameWidth: "100%"
        }, {
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            title: 'Big Buck Bunny: A jungle story',
            previewStartTime: '0',
            previewStopTime: '60',
            frameHeight: "100%",
            frameWidth: "100%"
        }, {
            url: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-slow.mp4',
            title: 'Snail',
            previewStartTime: '0',
            previewStopTime: '60',
            frameHeight: "100%",
            frameWidth: "100%"
        },
        {
            url: 'https://d3c33hcgiwev3.cloudfront.net/jZeTgPItEeaCmw6hz_dhfA.processed/full/360p/index.webm?Expires=1552521600&Signature=cqVe0rQnBLw-FpXZuOYHapv~5jOFHIAiwwRCPW4r2nWfZ8~QlJJcWvFchLpOvBX4sDlGtPgqAiFOY1lA~IoWjgz~-hrMAyRMuFsB9ANyuz~333IFuTr2L~Ekpax-SzpbKAs5rbUpet6lf4AQHOqygvdXTm97RMxdebFwWrArCJE_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A',
            title: 'Jungle King',
            previewStartTime: '0',
            previewStopTime: '20',
            frameHeight: "100%",
            frameWidth: "100%"
        }, {
            url: 'https://vimeo.com/1084537',
            title: 'Big Buck Bunny: A jungle story',
            previewStartTime: '0',
            previewStopTime: '60',
            frameHeight: "100%",
            frameWidth: "100%"
        }, {
            url: 'https://soundcloud.com/adhesivewombat/adhesivewombat-8-bit-adventure',
            title: 'Snail',
            previewStartTime: '0',
            previewStopTime: '60',
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
