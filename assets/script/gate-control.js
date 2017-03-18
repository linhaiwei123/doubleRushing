cc.Class({
    extends: cc.Component,

    properties: {
        nextLevel: 0,
        _sceneLoading: false,
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'player'){
            if(!this._sceneLoading){
                this._sceneLoading = true;
                let sceneName = 'level-' + this.nextLevel + '-scene';
                 cc.director.loadScene(sceneName);
            }
           
        }
    }


});
