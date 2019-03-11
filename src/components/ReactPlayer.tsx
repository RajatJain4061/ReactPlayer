import React from 'react';
import ReactPlayer from 'react-player';
import './../App.css';
import play from '../icons/play.png';
import pause from '../icons/pause.png';
import volume from '../icons/volume.png';
import mute from '../icons/mute.png';
import { Progress } from 'reactstrap';

interface PlayerItemProps {
    item_id: string,
    preview_start_time: number,
    preview_stop_time: number,
    width: string,
    height: string,
    playsinline: boolean,
    title: string,
    handler: any,
    url: string,
}

interface PlayerItemState {
    isPreviewing: boolean,
    playing: boolean,
    volumeOn: boolean,
    loaded: number;
    played: number;
    currentTime: string,
}

class PlayerItem extends React.Component<PlayerItemProps, PlayerItemState, any> {
    private player: React.RefObject<ReactPlayer>;
    private intervalHandle: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000);

    constructor(props: PlayerItemProps) {
        super(props);
        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.togglePreview = this.togglePreview.bind(this);
        this.stopPreview = this.stopPreview.bind(this);
        this.player = React.createRef();
        this.intervalHandle;
    }

    state: PlayerItemState = {
        isPreviewing: false,
        playing: false,
        currentTime: '',
        volumeOn: true,
        loaded: 0,
        played: 0,
    }

    togglePlayPause = () => {
        this.setState({
            playing: !this.state.playing,
            isPreviewing: this.state.playing
        }, () => {
            if (this.state.playing) {
                this.props.handler(this.props.item_id)
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

    togglePreview = () => {
        if (this.state.isPreviewing) {
            clearInterval(this.intervalHandle)
        } else {
            if (this.player.current !== null) {
                this.player.current.seekTo(this.props.preview_start_time)
            }
            this.intervalHandle = setInterval(this.stopPreview, 1000);
        }
        this.setState({ playing: !this.state.playing, isPreviewing: !this.state.isPreviewing })
    }

    seekTo = (e: any) => {
        console.log(e)
    }

    stopPreview = () => {
        if (this.player.current !== null) {
            if (this.state.isPreviewing && parseInt(Math.round(this.player.current.getCurrentTime()).toFixed(0)) === this.props.preview_stop_time) {
                this.setState({ isPreviewing: false, playing: false }, () => {
                    clearInterval(this.intervalHandle)
                })
            }
        }
    }

    render = () => {
        const { playing, currentTime, loaded, played, volumeOn } = this.state;

        var duration = '0';
        if (this.player.current !== null) {
            let totalTime = this.player.current.getDuration();
            let minutes = Math.floor(totalTime / 60)
            let seconds = Math.trunc(totalTime - minutes * 60);
            var timeInMin = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
            var timeInSec = seconds < 10 ? '0' + seconds.toString() : seconds.toString();
            duration = timeInMin + ':' + timeInSec
        }

        const { handler, ...playerProps } = this.props

        return (
            <div className="player-view">
                <div className="player-wrapper-large" >
                    <ReactPlayer {...playerProps} muted={!volumeOn} onProgress={e => this.progress(e)} ref={this.player} playing={playing} />
                    <h2 className="video-title">{this.props.title}</h2>
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
                        <Progress className="progress" onClick={e => this.seekTo(e)} bar value={played} max={1} />
                        <Progress className="progress-loaded" bar onClick={e => this.seekTo(e)} value={loaded} max={1} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PlayerItem;