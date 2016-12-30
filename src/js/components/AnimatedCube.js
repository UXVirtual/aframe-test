import React from 'react';
import { Entity } from 'aframe-react';

const {
    Component,
    PropTypes,
    } = React;

export class AnimatedCube extends Component {

    constructor(props) {
        super(props);
        this.state = {color: 'red'};
    }

    changeColor() {
        const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
        this.setState({
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    applyImpulse() {
        var scene = document.querySelector('a-scene');
        var el = scene.querySelector('#'+this.props.id);
        var camera = scene.querySelector('#camera');

        console.log('Camera',camera);

        var matrixWorld = camera.object3D.matrixWorld;
        var position = new THREE.Vector3();
        position.setFromMatrixPosition(matrixWorld);

        var hitMeBody = el.components['physics-body'];
        //TODO figure out how to get vector coordinates based on direction that camera is facing (maybe need to do a raycast and get its vector?)
        //see https://github.com/jesstelford/aframe-click-drag-component/blob/master/src/index.js for examples of doing this based on mouse cursor position
        hitMeBody.applyImpulse(camera.object3D.rotation, position);
    }

    onClick() {
        this.changeColor();
        this.applyImpulse();
    }

    render() {
        return (
            <Entity id={this.props.id}
                animation__rot={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
                animation__sca={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
                geometry='primitive: box'
                physics-body="boundingBox: 1 1 1; mass: 25; velocity: 0 0 0"
                material={{color: this.state.color, opacity: 0.6}}
                position={this.props.position}
                onClick={this.onClick.bind(this)}>
                <Entity
                    animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
                    geometry='primitive: box; depth: 0.2; height: 0.2; width: 0.2'
                    material={{color: '#24CAFF'}}/>
            </Entity>
        );
    }
}

AnimatedCube.propTypes = {
    //src: PropTypes.string.isRequired,
};

export default AnimatedCube;