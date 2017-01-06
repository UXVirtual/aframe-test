AFRAME.registerComponent('auto-hand-teleport-controls', {
    dependencies: ['auto-hand-controls'],

    init: function () {
        this.el.addEventListener('lookmanewhands', this.onNewHands.bind(this));
    },

    onNewHands: function (evt) {
        var hands = evt.detail && evt.detail.hands;

        var camera = this.el.sceneEl.querySelector('#camera');


        //console.log('Raycaster: ',raycaster);

        if (hands) {
            Object.keys(hands).forEach(function (key) {
                if (hands.hasOwnProperty(key)) {
                    hands[key].setAttribute('teleport-controls', 'collisionEntity', '#terrain');
                    hands[key].addEventListener('gripclose',function(){
                        console.log('Grip closed');

                        //TODO: check why this doesn't return intersecting objects - array always empty
                        var cursor = camera.querySelector('[cursor]');
                        console.log('IntersectedEls: ',cursor.components.raycaster.intersectedEls);




                    });
                }
            });
        }
    }
});