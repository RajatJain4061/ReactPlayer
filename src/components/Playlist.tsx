import React, {Component} from 'react';
import PlayerItem from './PlayerItem';
import ReactPlayer from './ReactPlayer';

interface PlaylistProps {
    playlist : any;
}

interface PlayerItemState {
    currentPlaying : any
    currentPlayingIndex: number,
}

class Playlist extends Component < PlaylistProps,
PlayerItemState > {
    private player : any;
    constructor(props : PlaylistProps) {
        super(props)
        this.player = React.createRef();
        this.handler = this.handler.bind(this)
    }

    state : PlayerItemState = {
        currentPlaying: undefined,
        currentPlayingIndex: 1,
    }

    handler = (key : string) => {
        this.setState({currentPlaying: key})
    }

    onClickFullscreen = (id: number) => {
        this.setState({currentPlayingIndex: id})  
        console.log(id)
    }

    render() {
        const {currentPlaying, currentPlayingIndex} = this.state
        return (
            <div className="video-player">
                <div className="video-list">
                    {this.props.playlist.map((element : any, key : any) => {
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
                            url={element.url}
                            current_playing={this.onClickFullscreen}
                            preview_start_time={element.previewStartTime} 
                            preview_stop_time={element.previewStopTime} 
                            width={element.frameWidth}
                            height={element.frameHeight}
                            playsinline={false}
                            title={element.title}
                            isplaying={playing}
                            handler={this.handler}
                            />
                        }, this)}
                </div>
                <div className="video-block">
                    {this.props.playlist.map((element : any, key : any) => {
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
                            list={false}
                            current_playing={this.onClickFullscreen}
                            preview_start_time={element.previewStartTime} 
                            preview_stop_time={element.previewStopTime} 
                            width={element.frameWidth}
                            height={element.frameHeight}
                            playsinline={false}
                            title={element.title}
                            isplaying={playing}
                            handler={this.handler}
                            />
                        }, this)}
                </div>
                <div className="video-large">
                {this.props.playlist.map((element : any, key : any) => {
                    if(key === currentPlayingIndex) {
                    return <ReactPlayer key={key}
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