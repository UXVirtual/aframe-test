import 'aframe';
import 'aframe-extras';
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

import Grid from './components/Grid';
import Sky from './components/Sky';

class VRScene extends React.Component {

    constructor(props){
        super(props);
        var extras = require('aframe-extras');
        extras.controls.registerAll();
        extras.primitives.registerAll();
    }


  render () {

    return (
      <Scene physics-world="gravity: 0 -9.8 0" vr-mode-ui="enabled: true">

          <a-assets>
              <a-mixin id="checkpoint"></a-mixin>
              <a-mixin id="checkpoint-hovered" color="#6CEEB5"></a-mixin>
              <a-asset-item id="uxvirtual-outer-obj" src="assets/obj/uxvirtual-logo/uxvirtual-outer.obj"></a-asset-item>
              <a-asset-item id="uxvirtual-outer-mtl" src="assets/obj/uxvirtual-logo/uxvirtual-outer.mtl"></a-asset-item>
              <a-asset-item id="uxvirtual-inner-b-obj" src="assets/obj/uxvirtual-logo/uxvirtual-inner-b.obj"></a-asset-item>
              <a-asset-item id="uxvirtual-inner-b-mtl" src="assets/obj/uxvirtual-logo/uxvirtual-inner-b.mtl"></a-asset-item>
              <a-asset-item id="uxvirtual-inner-t-obj" src="assets/obj/uxvirtual-logo/uxvirtual-inner-t.obj"></a-asset-item>
              <a-asset-item id="uxvirtual-inner-t-mtl" src="assets/obj/uxvirtual-logo/uxvirtual-inner-t.mtl"></a-asset-item>
              <a-asset-item id="desert-tower-obj" src="assets/obj/desert-tower/desert-tower.obj"></a-asset-item>
              <a-asset-item id="desert-tower-mtl" src="assets/obj/desert-tower/desert-tower.mtl"></a-asset-item>

              <audio id="newbuntu-sound" src="assets/mp3/newbuntu.ogg" preload="auto" />
                  <audio id="spaceambient-sound" src="assets/mp3/spaceambient.ogg" preload="auto" />
                      <audio id="system-ready-sound" src="assets/mp3/system-ready.ogg" preload="auto" />
              <img id="grid" src="assets/img/grid.png" crossOrigin="anonymous"/>
              <img id="sky" src="assets/img/skybox2.jpg" crossOrigin="anonymous" />
          </a-assets>

          <Entity id="start-sound" position="0 0 -20" sound="src: #newbuntu-sound; autoplay: true; loop: false; volume: 10;"/>

          <Entity id="desert-tower" position="-100.70 -25.47 37.63" rotation="2.82 45.00 4.50" scale="0.5 0.42 0.5" obj-model="obj: #desert-tower-obj; mtl: #desert-tower-mtl" />

          <Entity id="desert-tower" position="29.65 -12.75 -74.01" rotation="0 18.00 -19.00" scale="0.7 0.68 0.7" obj-model="obj: #desert-tower-obj; mtl: #desert-tower-mtl" />


          <Entity id="desert-tower" position="-54.7 20.72 -74.01" obj-model="obj: #desert-tower-obj; mtl: #desert-tower-mtl" />

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

              <Entity camera id="camera" universal-controls="movementControls: checkpoint"
                      checkpoint-controls="mode: teleport" position="0 1.764 0">
                  <Entity cursor="maxDistance: 30"
                            position="0 0 -1"
                            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03;"
                            material="color: #CCC; shader: flat;" />
                  </Entity>

          <Entity id="terrain" position="0 -75 0" rotation="0 -90 0" terrain-model='color: #736357; roughness: 1; shading: flat; DEM: url(assets/obj/terrain/noctis-3500-clip-envi.bin); planeWidth: 346; planeHeight: 346; segmentsWidth: 199; segmentsHeight: 199; zPosition: 100;'></Entity>


          <a-sky src="#sky" rotation="0 -90 0"/>
                  <Grid src="#grid" transparent="true"></Grid>

                  <a-cylinder checkpoint radius="1" height="0.1" position="0 0 -5.2" color="#39BB82"></a-cylinder>
                  <a-cylinder checkpoint radius="1" height="0.1" position="3 0 0" color="#39BB82"></a-cylinder>
                  <a-cylinder checkpoint radius="1" height="0.1" position="-3 0 0" color="#39BB82"></a-cylinder>

          <Entity light="color: #736357;" position="-1 1 0"></Entity>
          <Entity id="point-light" light="color: #ffb820; type: point;" position="0 5 0"></Entity>
          <Entity id="ambient-light" light="color: #736357; type: ambient"></Entity>

      </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));
