module.exports = {
  schema: {
    defaultRotation: {type: 'vec3'},
    enableDefaultRotation: {default: false},
    size: {
      default: 10,
      type: 'number'
    }
  },

  init: function () {
    this.active = false;
    this.targetEl = null;
    this.fire = this.fire.bind(this);

    this.originalScale = this.el.components.scale.data;
  },

  tick: function () {

    var camera = this.el.sceneEl.querySelector('[camera]');

    if (!camera) {
      throw new Error('No `camera` component found.');
    }

    var distance = this.el.object3D.position.distanceTo( camera.object3D.position );

    var newScale = this.originalScale.x*(distance/this.data.size);

    this.el.object3D.scale.set(newScale,newScale,newScale);
  },

  play: function () { this.el.addEventListener('click', this.fire); },
  pause: function () { this.el.addEventListener('click', this.fire); },
  remove: function () { this.pause(); },

  fire: function () {
    var targetEl = this.el.sceneEl.querySelector('[checkpoint-controls]');
    if (!targetEl) {
      throw new Error('No `checkpoint-controls` component found.');
    }
    targetEl.components['checkpoint-controls'].setCheckpoint(this.el);
  }
};
