module.exports = {
  schema: {
    defaultRotation: {type: 'vec3'},
    enableDefaultRotation: {default: false}
  },

  init: function () {
    this.active = false;
    this.targetEl = null;
    this.fire = this.fire.bind(this);
  },

  play: function () { this.el.addEventListener('click', this.fire); },
  pause: function () { this.el.addEventListener('click', this.fire); },
  remove: function () { this.pause(); },

  setCheckpoint: function(){

    var targetEl = this.el.sceneEl.querySelector('[checkpoint-controls]');


    console.log('targetEl:',targetEl);

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
