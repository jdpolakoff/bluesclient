import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AudioPlayer from './AudioPlayer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AudioPlayer />
      </div>
    );
  }
}

export default App;
