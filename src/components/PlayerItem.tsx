import React from 'react';
import ReactPlayer from 'react-player';
import './../App.css';
import { number } from 'prop-types';

interface PlayerItemProps {
    item_id:string,
    preview_start_time:number,
    preview_stop_time: number,
    width:string,
    height:string,
    playsinline:boolean,
    title:string,
    isplaying:boolean,
    handler:any,
    url:string,
}

interface PlayerItemState {
    isPreviewing:boolean,
    playing:boolean,
    player: any
}

class PlayerItem extends React.Component<PlayerItemProps, PlayerItemState, any> {
    private player: React.RefObject<ReactPlayer>;
    private intervalHandle: ReturnType<typeof setTimeout> = setTimeout(() => '', 1000);

    constructor(props:PlayerItemProps){
        super(props);
        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.togglePreview = this.togglePreview.bind(this);
        this.stopPreview = this.stopPreview.bind(this);
        this.player = React.createRef();
        this.intervalHandle;
        this.setState({
            player:this.player
        });
    }

    state:PlayerItemState = {
        isPreviewing: false,
        playing:false,
        player:false
    }

    componentWillReceiveProps(nextProps:PlayerItemProps){
        this.setState({
            playing: nextProps.isplaying
        })
    }

    togglePlayPause = () => {
        this.setState({
            playing: !this.state.playing,
            isPreviewing: this.state.playing
        }, () => {
            if(this.state.playing){
                this.props.handler(this.props.item_id) 
            }
        })
    }


    togglePreview = () => {
        
        if(this.state.isPreviewing){
            clearInterval(this.intervalHandle)
        } else {
            if(this.state.player){
                this.state.player.current.seekTo(this.props.preview_start_time)
            }
            this.intervalHandle = setInterval(this.stopPreview, 1000);
        }

        this.setState({ playing: !this.state.playing, isPreviewing: !this.state.isPreviewing })
    }

    stopPreview = () => {
        if(this.state.player){
            if(this.state.isPreviewing && parseInt(Math.round(this.state.player.current.getCurrentTime()).toFixed(0)) === this.props.preview_stop_time){            
                this.setState({ isPreviewing: false, playing: false}, () => {
                    clearInterval(this.intervalHandle)
                })
            }
        }
    }

    render = () => {
        const { playing } = this.state;

        const {isplaying, handler, ...playerProps} = this.props

        return (
            <div>
                <h2>{this.props.title}</h2>
                <div className="player-wrapper" onMouseOver={this.togglePreview} onMouseOut={this.togglePreview}>
                    <ReactPlayer {...playerProps}  ref={this.player} playing={playing} />
                </div>
                <button className="player-controls" onClick={this.togglePlayPause}>{playing ? 'Pause' : 'Play'}</button>
            </div>
        );
    }
}

export default PlayerItem;