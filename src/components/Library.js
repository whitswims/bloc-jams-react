import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import { Grid, Row, Col } from 'react-bootstrap';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <Grid>
      <Row className="show-grid">
        <section className='library'>
          {
            
            this.state.albums.map( (album, index) =>
            <Col xs={12} sm={12} md={6} key={index}>
              <div className={"image" + index}>
              <Link to={`/album/${album.slug}`} key={index}>
                <img src={album.albumCover} alt={album.title} />
                <div id="album-name">{album.title}</div>
                <div id="artist-name">{album.artist}</div>
                <div id="number-of-songs">{album.songs.length} songs</div>
              </Link>
              </div>
             </Col>
         )
          }
        </section>
      </Row>
      </Grid>
    );
  }
}

export default Library;