cc.Class({
    extends: cc.Component,

    properties: {
      
       speed: 0,
       player: cc.Node,
       //canvas: cc.Node,
       _targetPosition: null,
       _followPosition: null,
    },

    
    onLoad: function () {
        this._followPosition = this.node.position;

        this.canvas = cc.find('Canvas');
        
        this.canvas.on('touchstart',this.onTouchStart,this);
        cc.systemEvent.on('keydown',this.onKeyDown,this)
    },

    onKeyDown: function(e){
        switch(e.keyCode){
            case cc.KEY.f: {
                this._targetPosition = this._followPosition;
                this.node.position = this.player.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position)) 
                this.node.parent = this.player;
                
            }
        }  
    },

    onTouchStart: function(e){
        this._targetPosition = this.canvas.convertToNodeSpaceAR(e.getLocation());
        this.node.position = this.canvas.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position))
        this.node.parent = this.canvas;
    },

    update: function(dt){
        if(this._targetPosition){
            let restVector = cc.pSub(this._targetPosition,this.node.position);
            let moveVector = cc.pMult(cc.pNormalize(restVector),this.speed);
            let restDistance = restVector.mag();
            if(restDistance <= this.speed){
                this._targetPosition = null;
            }
            this.node.position = cc.pAdd(this.node.position,moveVector);
        }
    }

   
});
