import React from 'react';
import { Entity } from 'aframe-react';

const {
    Component,
    PropTypes,
    } = React;

export class Target extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Entity class="clickable" rotation="90 0 0">
                <a-cylinder material="opacity:0; color:#ffb820;" class="clickable" height="0.1" />
                <Entity obj-model={this.props['obj-model1']} scale="0.1 0.1 0.1"/>
                <Entity obj-model={this.props['obj-model2']} scale="0.1 0.1 0.1">
                    <a-animation attribute="rotation"
                                 dur="2000"
                                 fill="forwards"
                                 to="0 0 360"
                                 repeat="indefinite"></a-animation>
                </Entity>
            </Entity>
        );
    }
}

export default Target;