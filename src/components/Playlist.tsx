import React, {Component} from 'react';
import PlayerItem from './PlayerItem';
import ReactPlayer from './ReactPlayer';
import SinglePlayerItem from './SinglePlayerItem';
import videoPlaylist from '../data/playlist';
import {connect} from 'react-redux';
import {togglePlayer, toggleVideo} from '../actions/playerActions';
import {Action} from '../actions/playerActions'
import { Dispatch } from 'redux';

interface PlayerItemState {
    currentPlaying : any,
    currentPlayingIndex : number,
    videoPlaylist : any
    playing: boolean,
}
type ReduxType = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapDispatchToProps>;
class Playlist extends Component < ReduxType,
PlayerItemState > {
    private scrollRef : any;
    constructor(props : ReduxType) {
        super(props)
        this.handler = this
            .handler
            .bind(this)
        this.scrollRef = React.createRef();
    }

    state : PlayerItemState = {
        currentPlaying: undefined,
        currentPlayingIndex: 1,
        videoPlaylist: videoPlaylist,
        playing: false,
    }

    stopPlayerView = () => {
        this.setState({currentPlaying: false})
    }

    togglePlayPause = (id : number) => {
        const {videoPlaylist} = this.state
        {
            let playList = videoPlaylist
            playList.map((element : any, key : any) => {
                if (element.id === id) {
                    if (element.playing === true) {
                        element.playing = false
                    } else {
                        this.props.togglePlayer(false)
                        element.playing = true
                        this.setState({playing: false})
                    }
                } else {
                    element.playing = false
                }
            })
            this.setState({videoPlaylist: playList})
        }
    }

    handler = (key : string) => {
        this.setState({currentPlaying: key})
    }

    onClickFullscreen = (id : number) => {
        this.setState({currentPlayingIndex: id})
        this.props.toggleVideo(id)
        this.props.togglePlayer(true)
        window.scrollTo(0, this.scrollRef.current.offsetTop);
        this.setState({playing: true})
    }

    render() {
        const {currentPlaying, currentPlayingIndex, videoPlaylist, playing} = this.state
        return (
            <div>
                <div className="video-block">
                    {videoPlaylist.map((element : any, key : any) => {
                        if (key > 2 && key < 6) {
                            let playing = false
                            if (currentPlaying !== undefined && currentPlaying === key) {
                                playing = true
                            } else {
                                playing = false
                            }
                            return <PlayerItem
                                key={key}
                                item_id={key}
                                list={true}
                                id={element.id}
                                playing={element.playing}
                                togglePlayPause={this.togglePlayPause}
                                url={element.url}
                                current_playing={this.onClickFullscreen}
                                preview_start_time={element.previewStartTime}
                                preview_stop_time={element.previewStopTime}
                                width={element.frameWidth}
                                height={element.frameHeight}
                                playsinline={false}
                                title={element.title}
                                handler={this.handler}/>
                        }
                    }, this)}
                </div>
                <div className="video-list">
                    {videoPlaylist.map((element : any, key : any) => {
                        if (key >= 0 && key < 3) {
                            let playing = false
                            if (currentPlaying !== undefined && currentPlaying === key) {
                                playing = true
                            } else {
                                playing = false
                            }
                            return <PlayerItem
                                key={key}
                                item_id={key}
                                url={element.url}
                                playing={element.playing}
                                list={false}
                                togglePlayPause={this.togglePlayPause}
                                id={element.id}
                                current_playing={this.onClickFullscreen}
                                preview_start_time={element.previewStartTime}
                                preview_stop_time={element.previewStopTime}
                                width={element.frameWidth}
                                height={element.frameHeight}
                                playsinline={false}
                                title={element.title}
                                handler={this.handler}/>
                        }
                    }, this)}
                </div>
                <div className="video-block">
                 {
                        <SinglePlayerItem/>
                 }
                </div>
                <div ref={this.scrollRef} className="video-large">
                    {
                         <ReactPlayer/>
                        }
                </div>
            </div>
        )
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


export default connect(mapStateToProps,mapDispatchToProps) (Playlist)