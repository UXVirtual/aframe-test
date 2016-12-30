//enhanced version of a-grid from https://github.com/donmccurdy/aframe-extras/blob/master/src/primitives/a-grid.js
//supports option for grid material transparency

AFRAME.registerPrimitive('a-grid2',  {
    defaultComponents: {
        geometry: {
            primitive: 'plane',
            width: 75,
            height: 75
        },
        rotation: {x: -90, y: 0, z: 0},
        material: {
            src: 'url(https://cdn.rawgit.com/donmccurdy/aframe-extras/v1.16.3/assets/grid.png)',
            repeat: '75 75',
            transparent: false
        }
    },
    mappings: {
        width: 'geometry.width',
        height: 'geometry.height',
        src: 'material.src',
        transparent: 'material.transparent'
    }
});

import {Entity} from 'aframe-react';
import React from 'react';

export default props => {
    const extraProps = AFRAME.utils.extend({}, props);

    return <a-grid2
        {...extraProps}/>
};
