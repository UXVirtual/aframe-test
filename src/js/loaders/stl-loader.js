/**
 * STL Loader for A-Frame.
 */
var THREE = require('three')
var STLLoader = require('three-stl-loader')(THREE)

module.exports = {
    dependencies: [ 'material' ],

    schema: {
        src: { default: '' }
    },

    update: function () {
        var el = this.el;
        var data = this.data;
        var model = this.model;
        var stlUrl = this.parseUrl(data.src);
        if (model) { el.object3D.remove(model); }
        if (stlUrl) {
            this.loadStl(stlUrl);
        } else {
            console.warn('Model URL not provided');
        }
    },

    /**
     * Load a .STL using THREE.STLLoader.
     * @param  {string} stlUrl
     */
    loadStl: function (stlUrl) {
        var self = this;
        var loader = new STLLoader();
        loader.load(stlUrl, function (geom) {

            var object = new THREE.Mesh( geom );

            self.model = object;
            self.applyMaterial();
            self.el.object3D.add(object);
            self.el.emit('model-loaded', {format: 'stl', model: object});
        });
    },

    /**
     * Apply aframe material component (not .MTL) to a loaded model.
     */
    applyMaterial: function () {
        var material = this.el.components.material.material;
        if (!this.model) { return; }

        this.model.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });
    },

    /**
     * Parses src from `url(src)`.
     * Based on parseUrl() from aframe-core's src-loader.js.
     * @param  {string} src - String to parse.
     * @return {string} The parsed src, if parseable.
     */
    parseUrl: function parseUrl (src) {
        var parsedSrc = src.match(/\url\((.+)\)/);
        if (!parsedSrc) { return; }
        return parsedSrc[1];
    }
};