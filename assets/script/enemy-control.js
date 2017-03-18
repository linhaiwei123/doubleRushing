cc.Class({
    extends: cc.Component,

    properties: {
        pointArray: [cc.Vec2],
        deltaDuration: 0,
        loop: false,
    },

    onLoad: function () {
        this.move();
    },

    move: function(){
        let item = this.pointArray.shift();
        if(item){
            if(this.loop){
                this.pointArray.push(item);   
            }
            this.node.runAction(cc.sequence(
                cc.moveTo(this.deltaDuration,item),
                cc.callFunc(this.move.bind(this))
            ));
        }
    }

    


});
