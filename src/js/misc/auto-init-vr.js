AFRAME.registerComponent('auto-init-vr', {
    init: function () {

        var scene = this;

        scene.el.addEventListener('loaded', function () {
            setTimeout(function(){
                console.log('Automatically entering VR...');
                scene.el.sceneEl.enterVR();
            },1000);
        });
    }
});