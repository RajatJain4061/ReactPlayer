import React from 'react';
import ReactPlayer from 'react-player';
import './../App.css';
import expand from '../icons/expand.png';
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';
import { Progress } from 'reactstrap';
import volume from '../icons/volume.png';
import mute from '../icons/mute.png';

interface PlayerItemProps {
    item_id: number,
    preview_start_time: number,
    preview_stop_time: number,
    width: string,
    list: boolean,
    height: string,
    playsinline: boolean,
    current_playing: any,
    title: string,
    handler: any,
    url: string,
}

interface PlayerItemState {
    isPreviewing: boolean,
    playing: boolean,
    currentTime: number,
    volumneOn: boolean,
    played: number,
}

class PlayerItem extends React.Component<PlayerItemProps, PlayerItemState, any> {
    private player: React.RefObject<ReactPlayer>;
    private intervalHandle: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000);

    constructor(props: PlayerItemProps) {
        super(props);
        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.togglePreview = this.togglePreview.bind(this);
        this.onViewExpand = this.onViewExpand.bind(this);
        this.stopPreview = this.stopPreview.bind(this);
        this.player = React.createRef();
        this.intervalHandle;
    }

    state: PlayerItemState = {
        isPreviewing: false,
        playing: false,
        currentTime: 0,
        volumneOn: true,
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
        if (seconds > 10 && this.player.current !== null) {
            this.player.current.seekTo(this.props.preview_start_time)
        } else {
            this.setState({ played: seconds })
        }
    }

    onViewExpand = (id: any) => {
        this.props.current_playing(id)
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

    stopPreview = () => {
        this.player.current
        if (this.player.current !== null) {
            if (this.state.isPreviewing && parseInt(Math.round(this.player.current.getCurrentTime()).toFixed(0)) === this.props.preview_stop_time) {
                this.setState({ isPreviewing: false, playing: false }, () => {
                    clearInterval(this.intervalHandle)
                })
            }
        }
    }

    toggleVolume = () => {
        this.setState({ volumneOn: !this.state.volumneOn })
    }

    render = () => {
        const { playing, played, volumneOn } = this.state;

        const {  handler, list, current_playing, item_id, ...playerProps } = this.props

        var duration = '0';
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
                <div className={list ? "player-wrapper" : "player-wrapper-block"} onMouseOver={this.togglePreview} onMouseOut={this.togglePreview}>
                    <ReactPlayer playsinline muted={!volumneOn}  {...playerProps} onProgress={e => this.progress(e)} ref={this.player} playing={playing} />
                    { list ?
                            <div className="nav-controls-list" >
                                {  volumneOn ?
                                    <img className="img-volume-block" src={volume} onClick={this.toggleVolume} height="15" width="15" /> :
                                    <img className="img-volume-block" src={mute} onClick={this.toggleVolume} height="15" width="15" />
                                }
                                <h2 className="playback-time-list">{duration}</h2>
                                <img className="img-expand-list" onClick={() => this.onViewExpand(item_id)} src={expand} height="15" width="15" />
                            </div>
                            :
                            <div className="nav-controls-block" >
                                <img className="img-expand" src={expand} onClick={() => this.onViewExpand(item_id)} height="15" width="15" />
                                <h2 className="playback-time-block">{duration}</h2>
                            </div>
                    }
                    <div className="nav-controls-list">
                        {list ? <Progress className="progress-list" bar value={played} max={10} /> : <Progress className="progress-block" bar value={played} max={10} />}
                    </div>
                </div>
            </div>
        );
    }
}

export default PlayerItem;