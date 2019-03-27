import React from 'react';
import ReactPlayer from 'react-player';
import './../App.css';
import play from '../icons/play.png';
import pause from '../icons/pause.png';
import volume from '../icons/volume.png';
import mute from '../icons/mute.png';
import { Progress } from 'reactstrap';
import {connect} from 'react-redux';
import {togglePlayer} from '../actions/playerActions';
import videoPlaylist from '../data/playlist';
import {Action} from '../actions/playerActions';
import {AppState} from '../store'
import {togglePlayerAction} from '../actions/playerActions'
import { Dispatch } from 'redux';
import { stat } from 'fs';

interface PlayerItemState {
    isPreviewing: boolean,
    playing: boolean,
    volumeOn: boolean,
    loaded: number;
    played: number;
    currentTime: string,
    playlist: any
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> ;
class PlayerItem extends React.Component<ReduxType, PlayerItemState> {
    private player: React.RefObject<ReactPlayer>;
    private intervalHandle: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000);

    constructor(props: ReduxType) {
        super(props);
        this.player = React.createRef();
        this.intervalHandle;
    }

    state: PlayerItemState = {
        isPreviewing: false,
        playing: false,
        currentTime: '00:00',
        volumeOn: true,
        loaded: 0,
        played: 0,
        playlist: videoPlaylist
    }

    componentWillReceiveProps(nextProps:any){
        console.log(nextProps)
        if(this.props.playing !== nextProps.playing){ 
             this.setState({playing:nextProps.playing })
        }
   }

    componentDidMount() {
        this.setState({playing: this.props.playing})
    }

    togglePlayPause = () => {
     var player = this.props.togglePlayer(!this.state.playing)
        this.setState({
            playing: player.playing,
            isPreviewing: this.state.playing
        }, () => {
            if (this.state.playing) {
            }
        })
    }

    progress = (e: any) => {
        const totalTime = e.playedSeconds;
        var minutes = Math.floor(totalTime / 60)
        var seconds = Math.trunc(totalTime - minutes * 60);
        var timeInMin = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
        var timeInSec = seconds < 10 ? '0' + seconds.toString() : seconds.toString();
        var time = timeInMin + ':' + timeInSec
        this.setState({ currentTime: time, played: e.played, loaded: e.loaded })
    }

    toggleVolume = () => {
        this.setState({ volumeOn: !this.state.volumeOn })
    }


    render = () => {
        const { currentTime,playing, loaded, played, volumeOn,playlist  } = this.state;

        var duration = '00:00';
        if (this.player.current !== null) {
            let totalTime = this.player.current.getDuration();
            let minutes = Math.floor(totalTime / 60)
            let seconds = Math.trunc(totalTime - minutes * 60);
            var timeInMin = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
            var timeInSec = seconds < 10 ? '0' + seconds.toString() : seconds.toString();
            duration = timeInMin + ':' + timeInSec
        }
      
        return (
              playlist.map((item:any,index:any) => {
                  if(index == 0) {
                return(
            <div key={index} className="player-view">
                <div className="player-wrapper-large" >
                    <ReactPlayer url={item.url} width={item.frameWidth} height={item.frameHeight} muted={!volumeOn} onProgress={e => this.progress(e)} ref={this.player} playing={playing} />
                    <h2 className="video-title">{item.title}</h2>
                    {!playing ? <div className="controls">
                        <img className="imgPlay" src={play} onClick={this.togglePlayPause} height="35" width="35" />
                    </div> : null}
                    <div className="nav-controls">
                        {!playing ?
                            <img className="img-play-pause" src={play} onClick={this.togglePlayPause} height="20" width="20" />
                            : <img className="img-play-pause" src={pause} onClick={this.togglePlayPause} height="20" width="20" />}
                        {volumeOn ?
                            <img className="img-volume" src={volume} onClick={this.toggleVolume} height="20" width="20" /> :
                            <img className="img-volume" src={mute} onClick={this.toggleVolume} height="20" width="20" />
                        }
                        <h2 className="playback-time">
                            {currentTime}/{duration}
                        </h2>
                        <Progress className="progress"  bar value={played} max={1} />
                        <Progress className="progress-loaded" bar  value={loaded} max={1} />
                    </div>
                </div>
            </div>
                )
                    }
            }) 
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
    togglePlayer: (payload:any) =>dispatch(togglePlayer(payload))
    }
  }

const mapStateToProps = (state:any) => {
    return {
    playing: state.rootReducer.playing,
    }
   }

export default connect(mapStateToProps,mapDispatchToProps)(PlayerItem);