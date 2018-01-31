import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'
import MarqueeDouble from 'react-marquee-double'


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }


  render() {


    return (
        <div>
        <nav className="navigation">
          <h1 className="nowPlaying">Now playing: {this.props.song.name} {this.props.song.date}</h1>
        </nav>
        </div>
    );
  }
}

export default Home;
