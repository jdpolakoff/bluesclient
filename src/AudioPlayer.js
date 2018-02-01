import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import $ from 'jquery'
import Navbar from './Navbar'
import blues from './images/blues.jpg'
import MusicPlayer from 'react-responsive-music-player'


class AudioPlayer extends Component {
  constructor(){
    super()
    this.state = {
      pods: {},
      selectedPod: {}    }
  }

  componentDidMount(){
    axios.get('https://damp-waters-85739.herokuapp.com/api')
      .then((response)=>{
        response.data.forEach((item)=>{
          var year = item.src.split('_')[1][0] + item.src.split('_')[1][1]
          var month = item.src.split('_')[1][2] + item.src.split('_')[1][3]
          var day = item.src.split('_')[1][4] + item.src.split('_')[1][5]
          item['date'] = `${month}/${day}/${year}`
          item['url'] = item.src
          item['artist'] = [`${item.name} ${month}/${day}/${year}`]
          item['title'] = item.name.split(' - ')[0]
          item['cover'] = blues
        })
        this.setState({pods: response.data}, function(){
          console.log(this.state.pods)
        })
      })
  }

  render() {
    if (!$.isEmptyObject(this.state.pods)){

    var podDivs = this.state.pods.map((pod)=>{
        return (
        <div onClick={()=> this.setState({selectedPod: pod})} value={pod.src} className={this.state.divClass}>
            <h2>{pod.name} {pod.date}</h2>
        </div>
      )
    })

    var streamUrl = this.state.selectedPod.src
    var streamTitle = this.state.selectedPod.name


      return (
        <div>
        <h1>WPFW 89.3 FM<br/>🎵Don't Forget The Blues🎵</h1>
        <MusicPlayer playlist={this.state.pods} />
        <div className="contain">
        <h2>Playlist:</h2>
          {podDivs}
        </div>
        </div>
      )
    } else {
      return <p>loading...</p>
    }
  }
}

export default AudioPlayer;
