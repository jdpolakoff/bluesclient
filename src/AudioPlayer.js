import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import $ from 'jquery'
import Navbar from './Navbar'
import blues from './images/blues.jpg'
import MusicPlayer from 'react-responsive-music-player'
import { Link } from 'react-router-dom'
import ReactDisqusComments from 'react-disqus-comments'
import PodDivs from './PodDivs'


class AudioPlayer extends Component {
  constructor(){
    super()
    this.state = {
      pods: {},
      selectedPod: {},
      podDivs: [],
      currentSong: {}
    }
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
        this.setState({pods: response.data}, ()=> {
          if (this.state.pods){
            var podDivs = this.state.pods.map((pod)=>{
              if (this.musicPlayer) {
                if (`${pod.name} ${pod.date}` === `${this.musicPlayer.props.playlist[this.musicPlayer.state.activeMusicIndex].name} ${this.musicPlayer.props.playlist[this.musicPlayer.state.activeMusicIndex].date}`){
                  return (
                    <div>
                    <h2 className="selected">{pod.name} {pod.date}</h2>
                    </div>
                  )
                }
              if (`${pod.name} ${pod.date}` !== `${this.musicPlayer.props.playlist[this.musicPlayer.state.activeMusicIndex].name} ${this.musicPlayer.props.playlist[this.musicPlayer.state.activeMusicIndex].date}`){
                return (
                  <div>
                  <h2>{pod.name} {pod.date}</h2>
                  </div>
                )
              }
             }
            })
            this.setState({podDivs: podDivs})
          }
        })
      })
  }


  render() {


    var url = 'https://dontforgettheblues.herokuapp.com'
    var uniqueId = '8568'
    var title = "Don't Forget The Blues"

    if (!$.isEmptyObject(this.state.pods)){

      return (
        <div>
        <div className="header">
          <h1>WPFW 89.3 FM<br/>
          {"🎵Don't Forget The Blues🎵"}<br/>
          <a href="http://www.wpfwfm.org/radio/support-us/vehicle-donation-program" target="_blank"><span id="donate">Donate to WPFW</span></a></h1>
        </div>
          <MusicPlayer playlist={this.state.pods} ref={ref => {
            this.musicPlayer = ref
          }}
          />
        <div className="contain">
          <PodDivs podDivs={this.state.podDivs} />
        </div>
        <div className="comments">
        <ReactDisqusComments
          shortname="dont-forget-the-blues"
          title={title}
          identifier={uniqueId}
          url={url}
        />
        </div>
        </div>
      )
    } else {
      return <p>loading music...</p>
    }
  }
}

export default AudioPlayer;
