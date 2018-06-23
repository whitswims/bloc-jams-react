import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    }); 

    this.state = {
      album: album,
      currentSong: album.songs[0],
      albumLength: album.songs.length,
      isPlaying: false,
      hover: false,
      toSHow: "show"
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true});
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song);}
      this.play();
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

  onMouseEnterHandler(song){
    const isSameSong = this.state.currentSong === song;
      this.setState({hover:true});
      if (this.state.hover === true && isSameSong) {
      this.displayButton(song); 
    } else {
      if(!isSameSong) {
      this.setSong(song)
      this.displayButton(song); 
    }
  }
      this.setState({toShow:"hide"})
  }   
  
  onMouseLeaveHandler(song) {
      this.setState({hover:false});
      this.setState({toShow:""});
  }
  displayButton(song) {
    const isSameSong =this.state.currentSong === song;
      if (this.state.hover === true && isSameSong) {
          if (this.state.isPlaying) { 
         return "icon ion-md-pause";
        } else if (!this.state.isPlaying) {
        return "icon ion-md-play";
         }
        } 
     }



  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
          <h1 id="album-title">{this.state.album.title}</h1>
          <h2 className="release-info">{this.state.album.artist}</h2>
          <div id="releaseInfo">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
          {
            this.state.album.songs.map( (song, index) =>
              <tr className="song" key={index} onClick={() => this.handleSongClick(song)}>
                <td className={this.displayButton(song)} onMouseEnter={this.onMouseEnterHandler.bind(this, song)} onMouseLeave={this.onMouseLeaveHandler.bind(this, song)}><span className={this.state.toShow}>{index + 1}.</span></td>
                <td>{song.title}</td>
                <td>{song.duration}</td>
              </tr>
          )
        }
          </tbody>
        </table>
        <PlayerBar 
          isPlaying={this.state.isPlaying} 
          currentSong={this.state.currentSong} 
          handleSongClick={()=> this.handleSongClick(this.state.currentSong)}
          handlePrevClick={()=> this.handlePrevClick(this.state.currentSong)}
          handleNextClick={()=> this.handleNextClick(this.state.currentSong)}
        />
      </section>
    );
  }
}

export default Album;