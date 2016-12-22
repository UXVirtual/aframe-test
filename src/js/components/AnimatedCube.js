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

    render() {
        return (
            <Entity
                animation__rot={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
                animation__sca={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
                geometry='primitive: box'
                material={{color: this.state.color, opacity: 0.6}}
                position={this.props.position}
                onClick={this.changeColor.bind(this)}>
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