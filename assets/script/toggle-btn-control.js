cc.Class({
    extends: cc.Component,

    properties: {
        toggleArray: [cc.Node],
        enterEnabled : false,
        exitEnabled : false,
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'player' || other.node.group == 'sprite'){
            for(let item of this.toggleArray){
                item.active = this.enterEnabled;
            }
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'player' || other.node.group == 'sprite'){
            for(let item of this.toggleArray){
                item.active = this.exitEnabled;
            }
        }
    }

});
