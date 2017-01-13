import 'aframe';
import 'aframe-extras';
import 'aframe-terrain-model-component';
import 'aframe-animation-component';
import 'aframe-bmfont-text-component';
import 'aframe-physics-components';
import 'aframe-teleport-controls';
import 'babel-polyfill';
//import 'aframe-sun-sky/dist/aframe-sun-sky';
import 'kframe';
import 'aframe-look-at-billboard-component';

//import GUIVR from 'threevrtest/build/datguivr.min';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/Grid';
import Sky from './components/Sky';

import Checkpoint from './misc/checkpoint.js';
import CheckpointControls from './controls/checkpoint-controls.js';

//import a-frame only components (not React wrapped Components)
//import './misc/sun-position-setter';
import './controls/auto-hand-controls';
import './controls/auto-hand-teleport-controls';
import './misc/auto-init-vr';

class VRScene extends React.Component {

    constructor(props){
        super(props);

        var extras = require('aframe-extras');
        //AFRAME.registerComponent('universal-controls', extras.controls['universal-controls']);
        //AFRAME.registerComponent('checkpoint-controls', extras.controls['checkpoint-controls']);
        extras.controls.registerAll();
        //extras.primitives.registerAll();
        AFRAME.registerComponent('checkpoint', Checkpoint);
        AFRAME.registerComponent('a-ocean', extras.primitives['a-ocean']);

        AFRAME.registerComponent('lava-material', require('./components/shaders/LavaMaterial'));

        //extras.misc.registerAll();
    }

    componentDidMount() {
        console.log('scene initialized');

        var scene = document.querySelector('a-scene');
        var player = scene.querySelector('#player');

        console.log('Player: ',player);

        var isPresent = true;
        if (AFRAME.utils.trackedControls.isControllerPresent(scene, undefined, {})) {
            console.log('Two hands');
        } else
        if (AFRAME.utils.gearvrControls && AFRAME.utils.gearvrControls.isControllerPresent()) {
            console.log('One hand');
        } else {
            isPresent = false;
        }

        if(isPresent) {
            //enter VR automatically
            scene.enterVR();
        }/*else{
            console.log('Hand controls not available, using headset checkpoint controls instead');

            var camera = player.querySelector('#camera');

            console.log('Camera',camera);

            camera.setAttribute('universal-controls','movementControls: checkpoint');
            camera.setAttribute('checkpoint-controls','mode: teleport');
        }*/
    }

    render () {

        /*
         <a-asset-item id="michael-andrew-obj" src="assets/obj/michael-andrew/michael-andrew-lr.obj"></a-asset-item>
         <a-asset-item id="michael-andrew-mtl" src="assets/obj/michael-andrew/michael-andrew-lr.mtl"></a-asset-item>
         <a-asset-item id="kevin-obj" src="assets/obj/kevin/kevin.obj"></a-asset-item>
         <a-asset-item id="kevin-mtl" src="assets/obj/kevin/kevin.mtl"></a-asset-item>
         <a-asset-item id="asher-obj" src="assets/obj/asher/asher.obj"></a-asset-item>
         <a-asset-item id="asher-mtl" src="assets/obj/asher/asher.mtl"></a-asset-item>
         <a-asset-item id="manuel-obj" src="assets/obj/manuel/manuel-lr.obj"></a-asset-item>
         <a-asset-item id="manuel-mtl" src="assets/obj/manuel/manuel-lr.mtl"></a-asset-item>
         <a-asset-item id="shelley-obj" src="assets/obj/shelley/shelley-lr.obj"></a-asset-item>
         <a-asset-item id="shelley-mtl" src="assets/obj/shelley/shelley-lr.mtl"></a-asset-item>


         <Entity position="0 -0.46 -14.31">
         <a-animation attribute="rotation"
         dur="10000"
         fill="forwards"
         to="0 360 0"
         easing="linear"
         repeat="indefinite"></a-animation>
         <Entity id="michael-andrew" position="0 0 0" obj-model="obj: #michael-andrew-obj; mtl: #michael-andrew-mtl" rotation="-90 0 0" scale="10 10 10" />
         </Entity>

         <Entity position="7 -0.46 -14.31">
         <a-animation attribute="rotation"
         dur="10000"
         fill="forwards"
         to="0 360 0"
         easing="linear"
         repeat="indefinite"></a-animation>
         <Entity id="kevin" position="0 0 0" obj-model="obj: #kevin-obj; mtl: #kevin-mtl" rotation="-90 0 0" scale="10 10 10" />
         </Entity>

         <Entity position="-7 -0.46 -14.31">
         <a-animation attribute="rotation"
         dur="10000"
         fill="forwards"
         to="0 360 0"
         easing="linear"
         repeat="indefinite"></a-animation>
         <Entity id="asher" position="0 0 0" obj-model="obj: #asher-obj; mtl: #asher-mtl" rotation="-90 0 0" scale="10 10 10" />
         </Entity>

         <Entity position="-14 -0.46 -14.31">
         <a-animation attribute="rotation"
         dur="10000"
         fill="forwards"
         to="0 360 0"
         easing="linear"
         repeat="indefinite"></a-animation>
         <Entity id="manuel" position="0 0 0" obj-model="obj: #manuel-obj; mtl: #manuel-mtl" rotation="-90 0 0" scale="10 10 10" />
         </Entity>

         <Entity position="-21 -0.46 -14.31">
         <a-animation attribute="rotation"
         dur="10000"
         fill="forwards"
         to="0 360 0"
         easing="linear"
         repeat="indefinite"></a-animation>
         <Entity id="shelley" position="-0.31 0 2" obj-model="obj: #shelley-obj; mtl: #shelley-mtl" rotation="-90 0 180" scale="10 10 10" />
         </Entity>

         */

        return (
          <Scene physics-world="gravity: 0 -9.8 0" debug auto-init-vr vr-mode-ui="enabled: true">
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

                  <img id="sky" src="assets/img/skybox2.jpg" crossOrigin="anonymous" />

                  <audio id="newbuntu-sound" src="assets/mp3/newbuntu.ogg" preload="auto" />
                      <audio id="spaceambient-sound" src="assets/mp3/spaceambient.ogg" preload="auto" />
                          <audio id="system-ready-sound" src="assets/mp3/system-ready.ogg" preload="auto" />
              </a-assets>

              <Entity id="player" position="0 0 0" auto-hand-teleport-controls>
                  <a-camera id="camera" universal-controls="movementControls: checkpoint" checkpoint-controls="mode: teleport">
                      <Entity raycaster="objects: .clickable" cursor="fuse: true; fuseTimeout: 1500"
                              position="0 0 -5"
                              geometry="primitive: ring; radiusOuter: 0.30; radiusInner: 0.20;"
                              material="color: cyan; shader: flat;"

                          >
                          <a-animation begin="mouseleave" easing="ease-in" attribute="scale"
                                       fill="forwards" to="1 1 1" dur="150"></a-animation>
                          <a-animation begin="click" easing="ease-in" attribute="scale"
                                       fill="backwards" from="0.5 0.5 0.5" to="1 1 1" dur="150"></a-animation>
                          <a-animation begin="fusing" easing="ease-in" attribute="scale"
                                       fill="forwards" from="1 1 1" to="0.8 0.8 0.8" dur="1500"></a-animation>
                          </Entity>
                  </a-camera>
              </Entity>

              <Entity id="start-sound" position="0 0 -20" sound="src: #newbuntu-sound; autoplay: true; loop: false; volume: 10;"/>

              <Entity id="desert-tower" position="-100.70 -25.47 37.63" rotation="2.82 45.00 4.50" scale="0.5 0.42 0.5" obj-model="obj: #desert-tower-obj; mtl: #desert-tower-mtl" />

              <Entity id="desert-tower" position="29.65 -12.75 -74.01" rotation="0 18.00 -19.00" scale="0.7 0.68 0.7" obj-model="obj: #desert-tower-obj; mtl: #desert-tower-mtl" />

              <Entity id="desert-tower" position="-54.7 20.72 -74.01" obj-model="obj: #desert-tower-obj; mtl: #desert-tower-mtl" />

              <Entity id="logo" position="0 0 -20" sound="src: #spaceambient-sound; autoplay: true; loop: true; volume: 30">
                  <Entity obj-model="obj: #uxvirtual-outer-obj; mtl: #uxvirtual-outer-mtl" sound="src: #system-ready-sound; autoplay: false; loop: false; volume: 30; on: click" class="clickable">
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



              <Entity id="terrain" position="0 -75 0" rotation="0 -90 0" terrain-model='color: #736357; roughness: 1; shading: flat; DEM: url(assets/obj/terrain/noctis-3500-clip-envi.bin); planeWidth: 346; planeHeight: 346; segmentsWidth: 199; segmentsHeight: 199; zPosition: 100;'></Entity>


              <a-sky src="#sky" rotation="0 -90 0"/>
              <Grid id="ground" position="0 -1.764 0" transparent="true" />

              <Grid lava-material="texture1: url(assets/img/shaders/lava/cloud.png); texture2: url(assets/img/shaders/lava/lavatile.jpg); uvscale:512;" position="0 -3 0" transparent="false" />


              <Entity look-at="src: #camera" checkpoint id="checkpoint1" position="0 1.7 0" >
                    <a-cylinder class="clickable" height="0.1" color="#ffb820" rotation="90 0 0" />
                </Entity>

              <Entity look-at="src: #camera" checkpoint id="checkpoint2" position="-94.81 28.43 51.12">
                  <a-cylinder class="clickable" height="0.1" color="#ffb820" rotation="90 0 0" />
              </Entity>

              <Entity look-at="src: #camera" checkpoint id="checkpoint3" position="55.92 72.31 -66.90">
                  <a-cylinder class="clickable" height="0.1" color="#ffb820" rotation="90 0 0" />
              </Entity>

              <Entity look-at="src: #camera" checkpoint id="checkpoint4" position="-55.41 151.22 -52.76">
                  <a-cylinder class="clickable" height="0.1" color="#ffb820" rotation="90 0 0" />
              </Entity>

              <Entity look-at="src: #camera" checkpoint id="checkpoint5" position="58.8 74.69 -86.33">
                  <a-cylinder class="clickable" height="0.1" color="#ffb820" rotation="90 0 0" />
              </Entity>
              <Entity look-at="src: #camera" checkpoint id="checkpoint6" position="58.8 74.69 -86.33">
                  <a-cylinder class="clickable" height="0.1" color="#ffb820" rotation="90 0 0" />
              </Entity>

              <Entity light="color: #736357;" position="-1 1 0"></Entity>
                  <Entity id="point-light" light="color: #ffb820; type: point;" position="0 5 0"></Entity>
                  <Entity id="ambient-light" light="color: #736357; type: ambient"></Entity>

              </Scene>
            );
    }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));
