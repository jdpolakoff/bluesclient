import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AudioPlayer from './AudioPlayer'

class PodDivs extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {

    return (
      <div>
      <h2>Playlist:</h2>
        {this.props.podDivs}
      </div>
    );
  }
}

export default PodDivs;
