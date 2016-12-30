import 'aframe';
import 'aframe-terrain-model-component';
import 'aframe-animation-component';
import 'aframe-teleport-controls';
import 'aframe-bmfont-text-component';
import 'aframe-physics-components';
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

    return (
      <Scene physics-world="gravity: 0 -9.8 0" vr-mode-ui="enabled: true">

          <a-assets>
              <a-asset-item id="uxvirtual-outer-obj" src="assets/obj/uxvirtual-logo/uxvirtual-outer.obj"></a-asset-item>
              <a-asset-item id="uxvirtual-outer-mtl" src="assets/obj/uxvirtual-logo/uxvirtual-outer.mtl"></a-asset-item>
              <a-asset-item id="uxvirtual-inner-b-obj" src="assets/obj/uxvirtual-logo/uxvirtual-inner-b.obj"></a-asset-item>
              <a-asset-item id="uxvirtual-inner-b-mtl" src="assets/obj/uxvirtual-logo/uxvirtual-inner-b.mtl"></a-asset-item>
              <a-asset-item id="uxvirtual-inner-t-obj" src="assets/obj/uxvirtual-logo/uxvirtual-inner-t.obj"></a-asset-item>
              <a-asset-item id="uxvirtual-inner-t-mtl" src="assets/obj/uxvirtual-logo/uxvirtual-inner-t.mtl"></a-asset-item>

              <audio id="newbuntu-sound" src="assets/mp3/newbuntu.ogg" preload="auto" />
                  <audio id="spaceambient-sound" src="assets/mp3/spaceambient.ogg" preload="auto" />
                      <audio id="system-ready-sound" src="assets/mp3/system-ready.ogg" preload="auto" />
              <img id="grid" src="assets/img/grid.png" crossOrigin="anonymous"/>
              <img id="sky" src="assets/img/skybox2.jpg" crossOrigin="anonymous" />
          </a-assets>

          <Entity id="start-sound" position="0 0 -20" sound="src: #newbuntu-sound; autoplay: true; loop: false; volume: 10;"/>

          <Entity id="logo" position="0 0 -20" sound="src: #spaceambient-sound; autoplay: true; loop: true; volume: 30">
              <Entity obj-model="obj: #uxvirtual-outer-obj; mtl: #uxvirtual-outer-mtl" sound="src: #system-ready-sound; autoplay: false; loop: false; volume: 30; on: click">
                  <a-animation attribute="rotation"
                               dur="10000"
                               fill="forwards"
                               to="0 360 0"
                               repeat="indefinite"></a-animation>
              </Entity>
              <Entity obj-model="obj: #uxvirtual-inner-b-obj; mtl: #uxvirtual-inner-b-mtl">
                  <a-animation attribute="rotation"
                               dur="10000"
                               fill="forwards"
                               to="0 360 0"
                               delay="500"
                               repeat="indefinite"></a-animation>
              </Entity>
              <Entity obj-model="obj: #uxvirtual-inner-t-obj; mtl: #uxvirtual-inner-t-mtl">
                  <a-animation attribute="rotation"
                               dur="10000"
                               fill="forwards"
                               to="0 360 0"
                               delay="250"
                               repeat="indefinite"></a-animation>
              </Entity>
          </Entity>


          <Entity position="0 1.8 4" rotation="0 0 0">
              <Entity teleport-controls vive-controls="hand: left" />
              <Entity vive-controls="hand: right" />

              <Camera id="camera">
                  <a-cursor
                  animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150" />
              </Camera>

          </Entity>

          <Entity id="terrain" position="0 -75 0" rotation="0 -90 0" terrain-model='color: #736357; roughness: 1; shading: flat; DEM: url(assets/obj/terrain/noctis-3500-clip-envi.bin); planeWidth: 346; planeHeight: 346; segmentsWidth: 199; segmentsHeight: 199; zPosition: 100;'></Entity>


          <a-sky src="#sky" rotation="0 -90 0"/>
          <Entity position="0 -1 0"
                    geometry="primitive: box; width: 10000; height: 0.1; depth: 10000;" rotation="-90 0 0"
                    material="src: #grid; repeat: 10000 10000; transparent: true;"
                  physics-body="mass: 0; boundingBox: 10000 0.1 10000"
              />

          <Entity light="color: #736357;" position="-1 1 0"></Entity>
          <Entity light="color: #ffb820; type: point;" position="0 5 0"></Entity>
          <Entity light="color: #736357; type: ambient"></Entity>

      </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));
