import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import { Button, Glyphicon, Grid, Row, Col } from 'react-bootstrap';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    }); 

    this.state = {
      album: album,
      albumLength: album.songs.length,
      buttonStatus: "icon ion-md-play",
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      formattedCurrentTime: 0.0,
      formattedDuration: 0.0,
      hover: false,
      hoverSong: album.songs[0],
      isPlaying: false,
      isPaused: true,
      toShow: "show",
      volume: 0.8
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true});
    this.setState({ isPause: false});
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPaused: true});
    this.setState({ isPlaying: false});
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumeupdate: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumeupdate',this.eventListeners.volumeupdate);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
      this.setState({ isPaused: true});
      this.formatTime(this.state.duration);
    } else {
      if (!isSameSong) { this.setSong(song);}
      this.play();
      this.setState({ isPaused: false});
      this.formatTime(this.state.duration);
    }
    if (this.state.isPaused && isSameSong) {
      this.play();
      this.setState ({ isPaused: false});
      this.formatTime(this.state.duration);

    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex -1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.min(this.state.albumLength, currentIndex +1);
      if (newIndex === this.state.albumLength || newIndex > this.state.albumLength){
        const newSong = this.state.album.songs[0];
        this.setSong(newSong);
        this.play();
      }else {
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
      }
    }

  handleTimeChange(e) {
      const newTime = this.audioElement.duration * e.target.value;
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime: newTime });
    }
    
  handleVolumeChange(e) {
      const newVolume = e.target.value;
      this.audioElement.volume = newVolume;
      this.setState({ volume: newVolume }); 
    }

  onMouseEnterHandler(song){
    const isSameSong = this.state.currentSong === song;
      this.setState({hover:true});
      if (this.state.hover === true && isSameSong) {
      this.displayButton(song); 
    } else if(!isSameSong) {
      this.setState({hoverSong: song});
      this.displayButton(song); 
    } else {
      this.setState({hoverSong: song});
      this.displayButton(song);
    } 
  }    
  
  onMouseLeaveHandler(song) {
    this.setState({hover:false});
    this.setState({hoverSong: ""});
  }

  displayButton(song) {
    const isSameSong =this.state.currentSong === song;
      if (isSameSong) {
        if (this.state.isPlaying) {   
          return <Button /* bsStyle="btn btn-md btn-primary active" */>
                  <Glyphicon glyph="glyphicon glyphicon-pause" />
                 </Button>;
        } else if (!this.state.isPlaying) {   
          return <Button /* bsStyle="btn btn-md btn-primary" */>
                  <Glyphicon glyph="glyphicon glyphicon-play" />
                 </Button>;
        }
      }
      else if (this.state.hover === true && this.state.hoverSong === song){
        return <Button /* bsStyle="btn btn-md btn-primary active" */>
                <Glyphicon glyph="glyphicon glyphicon-play" />
               </Button>;
      }
      else if (this.state.hover === false && !this.state.hoverSong === song){
        return"";
      }
    }

  formatTime(duration) {
    if (this.isNumeric(duration)) {
      const min = parseInt((duration / 60) % 60, 10);
      const sec = parseInt(duration % 60, 10);
      const newTime = min +':'+('0' + sec).slice(-2);
      return newTime;
    }
    else {
      return("-:--");
    }
  }

  isNumeric(n) {
    if (!isNaN(parseFloat(n)) && isFinite(n)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <section className="album">
       <section className="album-display">
       <Grid>
         <Row className="show-grid">
           <Col xs={12} sm={12} md={6}>
             <section className="album-info">
             <section className="album-cover">
               <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
             </section>
             </section>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <section className="song-selection">
              <div className="album-details">
                <h1 id="album-title">{this.state.album.title}</h1>
              <div id="release-info">{this.state.album.releaseInfo}</div>
              </div>

            <section className="player-selection">
            <section className="player-table">
               <table id="song-list">
             <colgroup>
               <col id="song-number-column" />
               <col id="song-title-column" />
               <col id="song-duration-column" />
             </colgroup>
             <tbody>
              {
                this.state.album.songs.map( (song, index) =>
                  <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={this.onMouseEnterHandler.bind(this, song)}   onMouseLeave={this.onMouseLeaveHandler.bind(this, song)}  >
                   <td className="">{this.displayButton(song)}{this.state.currentSong === song || this.state.hoverSong === song ? "" : index + 1 + "."}</td>
                   <td>{''}{song.title}</td>
                   <td> {this.formatTime(song.duration)}</td>
                  </tr>
              )
            }
              </tbody>
            </table>
          </section>
          </section>
        <PlayerBar 
          isPlaying={this.state.isPlaying} 
          isPaused={this.state.isPaused}
          currentSong={this.state.currentSong} 
          currentTime={this.audioElement.currentTime}
          currentVolume={this.audioElement.currentVolume}
          duration={this.audioElement.duration}
          formattedCurrentTime={this.formatTime(this.state.currentTime)}
          formattedDuration={this.formatTime(this.state.duration)}
          handleSongClick={()=> this.handleSongClick(this.state.currentSong)}
          handlePrevClick={()=> this.handlePrevClick(this.state.currentSong)}
          handleNextClick={()=> this.handleNextClick(this.state.currentSong)}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
          </section>
        </Col>
       </Row>
      </Grid>
    </section>
  </section>
    );
  }
}

export default Album;