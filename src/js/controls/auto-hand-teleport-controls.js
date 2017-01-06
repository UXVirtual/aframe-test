AFRAME.registerComponent('auto-hand-teleport-controls', {
    dependencies: ['auto-hand-controls'],

    init: function () {
        this.el.addEventListener('lookmanewhands', this.onNewHands.bind(this));
    },

    onNewHands: function (evt) {
        var hands = evt.detail && evt.detail.hands;
        if (hands) {
            Object.keys(hands).forEach(function (key) {
                if (hands.hasOwnProperty(key)) {
                    hands[key].setAttribute('teleport-controls', 'collisionEntity', '#terrain');
                }
            });
        }
    }
});