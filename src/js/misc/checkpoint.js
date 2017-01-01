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

  play: function () { this.el.addEventListener('click', this.fire); },
  pause: function () { this.el.addEventListener('click', this.fire); },
  remove: function () { this.pause(); },

  tick: function () {

    var camera = this.el.sceneEl.querySelector('[camera]');

    if (!camera) {
      throw new Error('No `camera` component found.');
    }

    var distance = this.el.object3D.position.distanceTo( camera.object3D.position );

    var newScale = this.originalScale.x*(distance/this.data.size);

    this.el.object3D.scale.set(newScale,newScale,newScale);

    //console.log(this.el.object3D);
  },

  setCheckpoint: function(){

    var targetEl = this.el.sceneEl.querySelector('[checkpoint-controls]');

    if (!targetEl) {
      throw new Error('No `checkpoint-controls` component found.');
    }
    targetEl.components['checkpoint-controls'].setCheckpoint(this.el);
    var scene = this.el.sceneEl;
    var animation = scene.querySelector('#scene-fade-out-animation');
    animation.removeEventListener('animationend',this.setCheckpoint.bind(this));

    scene.emit('fadeIn');
  },

  fire: function () {

    var scene = this.el.sceneEl;
    var animation = scene.querySelector('#scene-fade-out-animation');

    animation.addEventListener('animationend',this.setCheckpoint.bind(this));

    scene.emit('fadeOut');
  }
};
