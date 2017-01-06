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

        var scene = document.querySelector('a-scene');

        var camera = scene.querySelector('#camera');
        var raycaster = camera.querySelector('[cursor]');

        console.log('Raycaster: ',raycaster);


        player.addEventListener('lookmanewhands',function(){
            console.log('Found new hand');
            //TODO: hide checkpoints automatically
        });

        player.addEventListener('lookmanohands',function(){

            console.log('Hand removed');

        });
    }

    render () {

        return (
          <Scene physics-world="gravity: 0 -9.8 0" debug auto-init-vr vr-mode-ui="enabled: true" fog="color: #000; near: 1; far: 10000">
              <a-animation id="scene-fade-out-animation" attribute="fog.near" begin="fadeOut" to="1" duration="1000" easing="ease-in"></a-animation>
              <a-animation attribute="fog.far" begin="fadeOut" to="2" duration="1000" easing="ease-in"></a-animation>
              <a-animation attribute="fog.near" begin="fadeIn" to="1" duration="500" easing="ease-in"></a-animation>
              <a-animation attribute="fog.far" begin="fadeIn" to="10000" duration="500" easing="ease-in"></a-animation>
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
                      <Entity raycaster="far: 100; interval: 1000; objects: .clickable; recursive: false" cursor
                              position="0 0 -1"
                              geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03;"
                              material="color: #CCC; shader: flat;"
                              animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
                          />
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
              <a-ocean color="#92E2E2" position="0 -75 0" width="25" depth="25" density="15" speed="2"></a-ocean>
              <Grid id="ground" position="0 -1.764 0" transparent="true" />

                <Entity look-at="src: #camera" class="clickable" checkpoint id="checkpoint1" position="0 1.7 0" >
                    <a-cylinder height="0.1" color="#ffb820" rotation="90 0 0" />
                </Entity>

              <Entity look-at="src: #camera" class="clickable" checkpoint id="checkpoint2" position="-94.81 28.43 51.12">
                  <a-cylinder height="0.1" color="#ffb820" rotation="90 0 0" />
              </Entity>

              <Entity look-at="src: #camera" class="clickable" checkpoint id="checkpoint3" position="55.92 72.31 -66.90">
                  <a-cylinder height="0.1" color="#ffb820" rotation="90 0 0" />
              </Entity>

              <Entity look-at="src: #camera" class="clickable" checkpoint id="checkpoint4" position="-55.41 151.22 -52.76">
                  <a-cylinder height="0.1" color="#ffb820" rotation="90 0 0" />
              </Entity>

              <Entity look-at="src: #camera" class="clickable" checkpoint id="checkpoint5" position="58.8 74.69 -86.33">
                  <a-cylinder height="0.1" color="#ffb820" rotation="90 0 0" />
              </Entity>
              <Entity look-at="src: #camera" class="clickable" checkpoint id="checkpoint6" position="58.8 74.69 -86.33">
                  <a-cylinder height="0.1" color="#ffb820" rotation="90 0 0" />
              </Entity>

              <Entity light="color: #736357;" position="-1 1 0"></Entity>
                  <Entity id="point-light" light="color: #ffb820; type: point;" position="0 5 0"></Entity>
                  <Entity id="ambient-light" light="color: #736357; type: ambient"></Entity>

              </Scene>
            );
    }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));
