
/**
 * A-Frame Lava Material Component
 *
 * Port of the shader for three.js from https://threejs.org/examples/webgl_shader_lava.html
 *
 * @usage
 *
 * In constructor method of app.js add: AFRAME.registerComponent('lava-material', require('./components/shaders/LavaMaterial'));
 *
 * then add the following to the entity you wish to have the shader
 *
 * lava-material="texture1: url(assets/img/shaders/lava/cloud.png); texture2: url(assets/img/shaders/lava/lavatile.jpg);"
 */

const AFRAME = require('aframe'),
    vertexShader = require('../../glsl/lava.vertex.glsl'),
    fragmentShader = require('../../glsl/lava.fragment.glsl');

const textureLoader = new THREE.TextureLoader();

module.exports = {

    dependencies: ['material', 'geometry'],

    schema: {
        fogdensity: { type: 'float', default: 0.1 },
        fogcolor: { type: 'color', default: new THREE.Vector3(0,0,0) },
        resolution: { type: 'vec2', default: new THREE.Vector2() },
        uvscale: { type: 'int', default: 2 },
        texture1: {type: 'src', default: 'url(assets/img/shaders/lava/cloud.png)'},
        texture2: {type: 'src', default: 'url(assets/img/shaders/lava/lavatile.jpg)'}
    },

    init: function () {

        this.clock = new THREE.Clock();

        const data = this.data,
            mesh = this.el.getObject3D('mesh');

        var uniforms = {
            fogDensity: { value: data.fogdensity },
            fogColor:   { value: data.fogcolor },
            time:       { value: 1.0 },
            resolution: { value: data.resolution },
            uvScale:    { value: new THREE.Vector2(data.uvscale,data.uvscale) },
            texture1:   { value: textureLoader.load( data.texture1 ) },
            texture2:   { value: textureLoader.load( data.texture2 ) }
        };

        uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT = THREE.RepeatWrapping;
        uniforms.texture2.value.wrapS = uniforms.texture2.value.wrapT = THREE.RepeatWrapping;

        this.material = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });

        mesh.material = this.material;
    },

    /**
     * Update all uniforms passed as inputs to the shader.
     */
    tick: function () {

        var delta = 5 * this.clock.getDelta();
        this.material.uniforms.time.value += 0.2 * delta;
    }
};