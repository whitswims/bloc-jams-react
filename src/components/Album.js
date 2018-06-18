import React, { Component } from 'react';
import albumData from './../data/albums';


class Album extends Component {
  render() {
    return (
      <section className="album">
        {this.props.match.params.slug} Album will go here
      </section>
    );
  }
}

export default Album;