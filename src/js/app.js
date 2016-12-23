import 'aframe';
import 'aframe-animation-component';
import 'aframe-teleport-controls';
import 'aframe-bmfont-text-component';
import 'babel-polyfill';
import 'kframe';

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

      var optimerBoldTypeface = require('three/examples/fonts/optimer_bold.typeface');

    return (
      <Scene vr-mode-ui="enabled: true">

          <a-assets>
              <a-asset-item id="optimerBoldFont" src="#optimerBoldTypeface" />
              a-assets>
              <img id="grid" src="https://img.gs/bbdkhfbzkk/stretch/https://i.imgur.com/25P1geh.png" crossOrigin="anonymous"/>
              <img id="sky" src="https://img.gs/bbdkhfbzkk/2048x2048,stretch/http://i.imgur.com/WqlqEkq.jpg" crossOrigin="anonymous" />
              <audio id="driveradio" src="http://streaming.radionomy.com/DRIVE:80" preload="auto" crossOrigin="anonymous" />

          </a-assets>

          <a-sound src="src: #driveradio" autoplay="true" position="0 1 10"></a-sound>

          <Entity bmfont-text="text: Hello world; color: white" position='-1.75 1 -3'></Entity>

          <Entity position="0 1.8 4" rotation="0 0 0">
              <Entity teleport-controls vive-controls="hand: left" />
              <Entity vive-controls="hand: right" />
            <Camera>
              <a-cursor
                animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150" />
            </Camera>
          </Entity>


        <a-sky src="#sky" rotation="0 -90 0"/>

          <Entity position="0 -1 0"
                    geometry="primitive: plane; width: 10000; height: 10000" rotation="-90 0 0"
                    material="src: #grid; repeat: 10000 10000; transparent: true;"/>

          <Entity light="color: #ccccff; intensity: 1; type: ambient;" visible=""/>
          <Entity light="color: #ffaaff; intensity: 1.5;" position="5 5 5"/>
          <Entity light="color: white; intensity: 0.5;" position="-5 5 15"/>
          <Entity light="color: white; type: ambient;"/>
            <AnimatedCube position='0 2 -3' />
            <AnimatedCube position='0 1 10' />
      </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));
