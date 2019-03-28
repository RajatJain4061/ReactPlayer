import React from 'react';
import ReactPlayer from 'react-player';
import './../App.css';
import expand from '../icons/expand.png';
import { Progress } from 'reactstrap';
import volume from '../icons/volume.png';
import mute from '../icons/mute.png';
import {connect} from 'react-redux';
import play from '../icons/play.png';
import {togglePlayer, toggleVideo} from '../actions/playerActions';
import videoPlaylist from '../data/playlist';
import {Action} from '../actions/playerActions';
import { Dispatch } from 'redux';

interface PlayerItemState {
    isPreviewing: boolean,
    playing: boolean,
    currentTime: number,
    volumneOn: boolean,
    played: number,
    preview_start_time: number
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> ;
class SinglePlayerItem extends React.Component<ReduxType, PlayerItemState, any> {
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
        currentTime: 0,
        volumneOn: true,
        played: 0,
        preview_start_time: 0
    }


    togglePlayPause = (videoPlaying: boolean) => {
        this.setState({
            playing: videoPlaying,
            isPreviewing: this.state.playing
        })
        if(videoPlaying) {
            this.props.togglePlayer(false)
        }
    }

    progress = (e: any) => {
        const totalTime = e.playedSeconds;
        var minutes = Math.floor(totalTime / 60)
        var seconds = Math.trunc(totalTime - minutes * 60);
        if (seconds > 10 && this.player.current !== null) {
            this.player.current.seekTo(this.state.preview_start_time)
        } else {
            this.setState({ played: seconds })
        }
    }

    toggleVolume = () => {
        this.setState({ volumneOn: !this.state.volumneOn })
    }

    render = () => {
        const {  played, volumneOn,playing } = this.state;

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
            <div className="player-view">
                <div className={"player-wrapper-block"}  onMouseLeave={()=>this.togglePlayPause(false)}>
                    <ReactPlayer playsinline muted={!volumneOn} width={'100%'} height={'100%'}  url={'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'} onProgress={e => this.progress(e)} ref={this.player} playing={playing} />
                    {!playing ? <div className="controlsSinglePlayer">
                        <img className="imgPlay" src={play} onClick={()=>this.togglePlayPause(true)} height="35" width="35" />
                    </div> : null}
                            <div className="nav-controls-list" >
                                {  volumneOn ?
                                    <img className="img-volume-block" src={volume} onClick={this.toggleVolume} height="15" width="15" /> :
                                    <img className="img-volume-block" src={mute} onClick={this.toggleVolume} height="15" width="15" />
                                }
                                <h2 className="playback-time-list">{duration}</h2>
                            </div>

                    <div className="nav-controls-list">
                        { <Progress className="progress-block" bar value={played} max={10} />}
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
    togglePlayer: (payload:any) =>dispatch(togglePlayer(payload)),
    toggleVideo: (payload:any) => dispatch(toggleVideo(payload))
    }
  }
  const mapStateToProps = (state:any) => {
    return {
    playing: state.rootReducer.playing,
    }
   }


export default connect(mapStateToProps,mapDispatchToProps) (SinglePlayerItem )