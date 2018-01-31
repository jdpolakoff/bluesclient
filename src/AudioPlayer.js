import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import $ from 'jquery'
import ReactAudioPlayer from 'react-audio-player';
import Navbar from './Navbar'

class AudioPlayer extends Component {
  constructor(){
    super()
    this.state = {
      pods: {},
      selectedPod: {},
      divClass: 'card'
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

    if (podDivs.length > 0){
      podDivs.forEach((pod)=>{
        if (pod.props.value === this.state.selectedPod.src){
          console.log(pod)
        }
      })
    }


      return (
        <div>
        <Navbar song={this.state.selectedPod}/>
        <h1>WPFW 89.3-FM<br/>Dont Forget The Blues</h1>
        <div className="contain">
          {podDivs}
        </div>
        <audio controls controlsList="nodownload" autoPlay="true" src={this.state.selectedPod.src}>
        </audio >
        </div>
      )
    } else {
      return <p>loading...</p>
    }
  }
}

export default AudioPlayer;
