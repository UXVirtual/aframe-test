//enhanced version of a-grid from https://github.com/donmccurdy/aframe-extras/blob/master/src/primitives/a-grid.js
//supports option for grid material transparency

AFRAME.registerPrimitive('a-grid2',  {
    defaultComponents: {
        geometry: {
            primitive: 'plane',
            width: 10000,
            height: 10000
        },
        rotation: {x: -90, y: 0, z: 0},
        material: {
            src: 'url(assets/img/grid.png)',
            repeat: '10000 10000',
            transparent: true
        }
    },
    mappings: {
        width: 'geometry.width',
        height: 'geometry.height',
        src: 'material.src',
        transparent: 'material.transparent'
    }
});

import React from 'react';

export default props => {
    const extraProps = AFRAME.utils.extend({}, props);

    return <a-grid2
        {...extraProps}/>
};
