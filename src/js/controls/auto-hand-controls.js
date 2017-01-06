AFRAME.registerComponent('auto-hand-controls', {
//  dependencies: ['tracked-controls'], // to make sure the system is present

    init: function () {
        // to make sure the tracked-controls system is present, put it on the scene (NOT an entity)
        this.el.sceneEl.setAttribute('tracked-controls', '');

        this.tick = AFRAME.utils.throttleTick ?
            AFRAME.utils.throttleTick(this.throttledTick, 1000, this) :
            this.throttledTick.bind(this);
    },

    throttledTick: function (t, dt) {
        var hands = [];
        var singlehand = 'right';
        var isPresent = true;
        if (AFRAME.utils.trackedControls.isControllerPresent(this.el.sceneEl, undefined, {})) {
            hands.push('left');
            hands.push('right');
        } else
        if (AFRAME.utils.gearvrControls && AFRAME.utils.gearvrControls.isControllerPresent()) {
            hands.push(singlehand);
        } else {
            isPresent = false;
        }
        if (this.isPresent === isPresent) { return; }
        this.isPresent = isPresent;
        if (isPresent) {
            this.hand = this.hand || {};
            hands.forEach(function (hand) {
                var handEl = this.hand[hand] = document.createElement('a-entity');
                handEl.setAttribute('id', hand + '-hand');
                handEl.setAttribute('hand-controls', hand);
                if (hand === singlehand && AFRAME.utils.gearvrControls) { handEl.setAttribute('gearvr-controls', ''); }
                this.el.appendChild(handEl);
            }, this);
            this.el.emit('lookmanewhands', {hands: this.hand});
        } else
        if (this.hand) {
            Object.keys(this.hand).forEach(function (hand) {
                var handEl = this.hand && this.hand[hand];
                if (handEl) {
                    delete this.hand[hand];
                    if (handEl.parentNode) { handEl.parentNode.removeChild(handEl); }
                }
            }, this);
            this.el.emit('lookmanohands', {});
        }
    }
});