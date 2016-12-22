import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'aframe-teleport-controls';
import 'babel-polyfill';
//import GUIVR from 'threevrtest/build/datguivr.min';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Camera from './components/Camera';
import AnimatedCube from './components/AnimatedCube';
import Text from './components/Text';
import Sky from './components/Sky';

class VRScene extends React.Component {


  render () {
    return (
      <Scene vr-mode-ui="enabled: true">

          <Entity teleport-controls hand-controls="left" position="0 -999999999 0" />

          <Entity hand-controls="right" position="0 -999999999 0" />

        <Camera>
          <a-cursor
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
>
          </a-cursor>

        </Camera>



        <Sky src="url(https://rawgit.com/aframevr/assets/gh-pages/360-image-gallery-boilerplate/img/sechelt.jpg)"/>

        <Text
          text='Hello World!'
          color='#DADADA'
          position='-1.75 1 -3'/>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

  />
            <AnimatedCube position='0 -0.5 -3' />

            <AnimatedCube position='0 1 10' />
      </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));
