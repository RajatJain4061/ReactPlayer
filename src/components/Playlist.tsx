import React, {Component} from 'react';
import PlayerItem from './PlayerItem';
import ReactPlayer from './ReactPlayer';

interface PlaylistProps {
    playlist : any;
}

interface PlayerItemState {
    currentPlaying : any,
    currentPlayingIndex : number,
    videoPlaylist : any
}

class Playlist extends Component < PlaylistProps,
PlayerItemState > {
    private scrollRef : any;
    constructor(props : PlaylistProps) {
        super(props)
        this.handler = this
            .handler
            .bind(this)
        this.scrollRef = React.createRef();
    }

    state : PlayerItemState = {
        currentPlaying: undefined,
        currentPlayingIndex: 1,
        videoPlaylist: this.props.playlist
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
                        element.playing = true
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
        window.scrollTo(0, this.scrollRef.current.offsetTop);
    }

    render() {
        const {currentPlaying, currentPlayingIndex, videoPlaylist} = this.state
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
                <div ref={this.scrollRef} className="video-large">
                    {videoPlaylist.map((element : any, key : any) => {
                        if (key === currentPlayingIndex) {
                            return <ReactPlayer
                                key={key}
                                item_id={key}
                                url={element.url}
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
            </div>
        )
    }
}

export default Playlist