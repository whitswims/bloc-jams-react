import React from 'react';

const Landing = () => (
    <section className="landing">
      <h1 className="hero-title">Turn the music up!</h1>
    <section className="benefit-container">
      <div className="row">
       <div id="benefits">
         <div className="thumbnail">
          <img src="/assets/images/edu-grande-81410-unsplash.jpg" alt="Browsing Records"></img>
          <div className="caption">
            <h3>Choose your music</h3>
            <p>The world is full of music; why should you have to listen to music someone else chose?</p>
          </div>
         </div>
      </div>
      <div id="benefits">
         <div className="thumbnail">
          <img src="/assets/images/musicplayer.jpeg" alt="Stereo System"></img>
          <div className="caption">
            <h3>Unlimited, streaming, ad-free</h3>
            <p>No arbitrary limits. No distractions.</p>
          </div>
         </div>
      </div>
      <div id="benefits">
         <div className="thumbnail">
          <img src="/assets/images/MobileMusic.jpeg" alt="Mobile phone on desk"></img>
          <div className="caption">
            <h3>Mobile enabled</h3>
            <p>Listen to your music on the go.</p>
          </div>
         </div>
      </div>
     </div>
    </section>
    </section>
);

export default Landing;