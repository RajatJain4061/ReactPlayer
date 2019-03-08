import React from 'react';
import ReactPlayer from 'react-player';
import './../App.css';
import expand from '../icons/expand.png';
import { findDOMNode } from 'react-dom';
import  screenfull from 'screenfull';
import { Progress } from 'reactstrap';

interface PlayerItemProps {
    item_id:string,
    preview_start_time:number,
    preview_stop_time: number,
    width:string,
    list: boolean,
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
    currentTime: number,
    played: number,
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
    }

    state:PlayerItemState = {
        isPreviewing: false,
        playing:false,
        currentTime: 0,
        played: 0,
    }

    componentWillReceiveProps(nextProps:PlayerItemProps){
        this.setState({
            playing: nextProps.isplaying
        })
    }

    onClickFullscreen() {
       
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

    progress = (e: any) => {
        const totalTime =  e.playedSeconds;
        var minutes = Math.floor(totalTime/ 60)
        var seconds = Math.trunc(totalTime - minutes * 60);
        if(seconds > 10 && this.player.current!==null)
        {
            this.player.current.seekTo(this.props.preview_start_time)
        } else {
            this.setState({played: seconds})
        }
      }


    togglePreview = () => {
        if(this.state.isPreviewing){
            clearInterval(this.intervalHandle)
        } else {
            if(this.player.current!==null){
                this.player.current.seekTo(this.props.preview_start_time)
            }
            this.intervalHandle = setInterval(this.stopPreview, 1000);
        }

        this.setState({ playing: !this.state.playing, isPreviewing: !this.state.isPreviewing })
    }

    stopPreview = () => {
        if(this.player.current!==null){
            if(this.state.isPreviewing && parseInt(Math.round(this.player.current.getCurrentTime()).toFixed(0)) === this.props.preview_stop_time){            
                this.setState({ isPreviewing: false, playing: false}, () => {
                    clearInterval(this.intervalHandle)
                })
            }
        }
    }

    render = () => {
        const { playing, played } = this.state;

        const {isplaying, handler,list, ...playerProps} = this.props
         
        return (
            <div className = "player-view">
                <div className="player-wrapper" onClick={this.togglePreview} onMouseOver={this.togglePreview} onMouseOut={this.togglePreview} >
                    <ReactPlayer {...playerProps} onProgress={e => this.progress(e)}  ref={this.player} playing={playing} />
                   { list?
                    <div className="nav-controls-list" onClick={this.onClickFullscreen}>
                    <img className="img-expand-list" src={expand}  height="15"  width="15"/> 
                    <Progress className="progress-list" bar  value={played} max={10} />
                    </div>
                   : <div className="controls" onClick={this.onClickFullscreen}>
                   <img className="img-expand" src={expand}  height="20"  width="20"/> 
                   </div>}
                  
                </div>
            </div>
        );
    }
}

export default PlayerItem;