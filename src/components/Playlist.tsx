import React, { Component } from 'react';
import PlayerItem from './PlayerItem';


interface PlaylistProps { playlist: any;}

class Playlist extends Component<PlaylistProps> {
    
    constructor(props:PlaylistProps) {
        super(props)
    
        this.handler = this.handler.bind(this)
    }

    state = {
        currentPlaying:undefined
    }

    handler = (key:string) => {
        this.setState({
            currentPlaying:key
        })
    }

    render() {
        const { currentPlaying } = this.state
        return (
            <div>
                {this.props.playlist.map((element:any,key:any) => {
                    let playing = false
                    if(currentPlaying !== undefined && currentPlaying === key){
                        playing = true
                    } else {
                        playing = false
                    }
                    
                    return <PlayerItem 
                                key={key}
                                item_id={key} 
                                url={element.url}
                                preview_start_time={element.previewStartTime} 
                                preview_stop_time={element.previewStopTime} 
                                width={element.frameWidth}
                                height={element.frameHeight}
                                playsinline={false}
                                title={element.title}
                                isplaying={playing}
                                handler={this.handler}
                                />
                },this)}
            </div>
        )
    }
}

export default Playlist