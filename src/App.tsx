import React, { Component } from 'react';
import Playlist from './components/Playlist';

import './App.css';

class App extends Component {

  playlist = [{
    url:'https://vimeo.com/90509568',
    title: 'Vimeo video',
    previewStartTime: '10',
    previewStopTime: '20',
    frameHeight: "100%",
    frameWidth:"100%"
  },{
    url:'https://www.youtube.com/watch?v=oUFJJNQGwhk',
    title: 'Youtube Video',
    previewStartTime: '40',
    previewStopTime: '60',
    frameHeight: "100%",
    frameWidth:"100%"
  },{
    url:'https://soundcloud.com/miami-nights-1984/accelerated',
    title: 'Sound Cloud',
    previewStartTime: '40',
    previewStopTime: '60',
    frameHeight: "100%",
    frameWidth:"100%"
  },{
    url:'https://www.facebook.com/facebook/videos/10153231379946729/',
    title: 'Facebook Video',
    previewStartTime: '40',
    previewStopTime: '60',
    frameHeight: "100%",
    frameWidth:"100%"
  },{
    url:'https://www.youtube.com/watch?v=oUFJJNQGwhk',
    title: 'Youtube Video',
    previewStartTime: '40',
    previewStopTime: '60',
    frameHeight: "100%",
    frameWidth:"100%"
  }];

  render() {
  
    return (
      <div className="App">          
          <Playlist playlist={this.playlist} />
      </div>
    );
  }
}

export default App;
