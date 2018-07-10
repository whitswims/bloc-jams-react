import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class PlayerBar extends Component {

  buttonSwitcher (song){
    if (this.props.Playing) {
      return <Button bsStyle="btn btn-lg btn-primary active">
      <Glyphicon glyph="glyphicon glyphicon-pause" />
    </Button>;
    } else {
      return <Button bsStyle="btn btn-lg btn-primary active">
      <Glyphicon glyph="glyphicon glyphicon-play" />
    </Button>
    }
  }

    render() {
        return (
            <section className="player-bar">
              <section id="buttons">
                  <span className=""><Button id="previous" onClick={this.props.handlePrevClick} /* bsStyle="btn btn-lg btn-primary active" */>
          <Glyphicon glyph="glyphicon glyphicon-chevron-left" />
        </Button></span>
                  <span className=""> {this.props.isPlaying ? <Button id="play-pause" onClick={this.props.handleSongClick} /* bsStyle="btn btn-lg btn-primary active" */>
          <Glyphicon glyph="glyphicon glyphicon-pause" />
        </Button> : <Button id="play-pause" onClick={this.props.handleSongClick} /* bsStyle="btn btn-lg btn-primary active" */>
          <Glyphicon glyph="glyphicon glyphicon-play" />
        </Button>}</span>
                <Button id="next" onClick={this.props.handleNextClick} /* bsStyle="btn btn-lg btn-primary active" */>
          <Glyphicon glyph="glyphicon glyphicon-chevron-right" />
        </Button>
              </section>
              <section className="controls">
              <section id="time-control">
              <div className="current-time">{this.props.formattedCurrentTime}</div>
              <input 
                type="range" 
                className="seek-bar" 
                value={(this.props.currentTime / this.props.duration) || 0} 
                max="1" 
                min="0" 
                step="0.01"
                onChange={this.props.handleTimeChange} 
              />   
              <div className="total-time">{this.props.formattedDuration}</div> 
              </section>
              <section id="volume-control">
                <div className="icon ion-md-volume-low">{this.props.volume}</div>
                <input 
                type="range" 
                className="seek-bar"
                defaultValue=".80"
                max="1"
                min="0"
                step="0.01"
                onChange={this.props.handleVolumeChange}
                />
                <div className="icon ion-md-volume-high"></div>
              </section>
              </section>
            </section>
        );
    }
}

export default PlayerBar;