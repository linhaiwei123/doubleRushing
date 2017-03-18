cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        this.node.on("touchstart",function(){
            let level = window.level;
            let sceneName = 'level-' + level + '-scene';
            window.gameOver = false;
            cc.director.loadScene(sceneName);
        },this)
    },

});
