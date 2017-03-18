cc.Class({
    extends: cc.Component,

    properties: {
        g: -10,
        _leftBlock: 0,
        _rightBlock: 0,
        _upBlock: 0,
        _downBlock: 0,

        jumpSpeed: 0,
        moveSpeed: 0,
        _speedY: 0,
       
        _wantClimb: false,

        _left: false,
        _right: false,
        _up: false,
        _down: false,

        _jumping: false,
        
    },

    onLoad: function () {
        cc.systemEvent.on('keydown',this.onKeyDown.bind(this));
        cc.systemEvent.on('keyup',this.onKeyUp.bind(this));

        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    }, 

    onCollisionExit: function(other,self){
        if(other.node.group == 'wall' || other.node.group == 'sprite'){
            this.onLeaveWall(other,self);
        }
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'wall' || other.node.group == 'sprite'){
            this.onTouchWall(other,self);
        }
        if(other.node.group == 'enemy'){
            //game over
            if(!window.gameOver){
                window.gameOver = true;
                cc.director.loadScene('game-over-scene');
            }
        }
    },


    onTouchWall: function(other,self){
        let otherAabb = other.world.aabb.clone();
        let selfAabb = self.world.aabb.clone();
        let otherPreAabb = other.world.preAabb.clone();
        let selfPreAabb = self.world.preAabb.clone();

        let blockArray = [];

        if(selfPreAabb.yMax <= otherPreAabb.yMin && selfAabb.yMax >= otherAabb.yMin){
            //up pre Block
            let upPreBlock = Math.abs(selfAabb.y - selfPreAabb.y);
           
            blockArray.push({direction: 'up',distance: upPreBlock});

        }
        if(selfPreAabb.yMin >= otherPreAabb.yMax && selfAabb.yMin <= otherAabb.yMax){
            //down pre Block
            let downPreBlock = Math.abs(selfAabb.y - selfPreAabb.y);
            
            blockArray.push({direction: 'down',distance: downPreBlock});
        }
        if(selfPreAabb.xMax <= otherPreAabb.xMin && selfAabb.xMax >= otherAabb.xMin){
            //right pre Block
            let rightPreBlock = Math.abs(selfAabb.x - selfPreAabb.x);
            //
            blockArray.push({direction: 'right',distance: rightPreBlock});
        }
         if(selfPreAabb.xMin >= otherPreAabb.xMax && selfAabb.xMin <= otherAabb.xMax){
            //left pre Block
            let leftPreBlock = Math.abs(selfAabb.x - selfPreAabb.x);
           
            blockArray.push({direction: 'left',distance: leftPreBlock});
        }
        other.blockArray = blockArray;
        for(let item of blockArray){
            switch(item.direction){
                case 'left': this._leftBlock++;break;
                case 'right': this._rightBlock++;break;
                case 'up': this._upBlock++;break;
                case 'down': this._downBlock++;break;
            }
        }
    },


    onLeaveWall: function(other,self){
        if(other.blockArray){
            for(let item of other.blockArray){
                switch(item.direction){
                    case 'left': this._leftBlock--;break;
                    case 'right': this._rightBlock--;break;
                    case 'up': this._upBlock--;break;
                    case 'down': this._downBlock--;break;
                }
            }
        }
    },



    onKeyDown: function(e){
        switch(e.keyCode){
            case cc.KEY.a:{
                this._left = true;
                break;
            };
            case cc.KEY.d: {
                this._right = true;
                break;
            }
            case cc.KEY.w:{
                if(this._jumping){break;}
                this._up = true;
                break;
            };
            case cc.KEY.s: {
                this._down = true;
                break;
            };
            case cc.KEY.space: {
                this._wantClimb = true;
                break;
            }
        }
    },

    onKeyUp: function(e){
        switch(e.keyCode){
            case cc.KEY.a:{
                this._left = false;
                break;
            };
            case cc.KEY.d: {
                this._right = false;
                break;
            }
            // case cc.KEY.w:{
            //     this._up = false;
            //     break;
            // };
            case cc.KEY.s: {
                this._down = false;
                break;
            };
            case cc.KEY.space: {
                this._wantClimb = false;
                break;
            }
        }
    },

    update: function(dt){
       
       if(this._left && !this._leftBlock){this.node.x -= this.moveSpeed};
       if(this._right && !this._rightBlock){this.node.x += this.moveSpeed};

       if(this._up){
            this._speedY = this.jumpSpeed;
            this._jumping = true;
            this._up = false;
       }
       else if(this._downBlock || (this._wantClimb && (this._leftBlock || this._rightBlock))){
           this._speedY = 0;
           this._jumping = false;
       }else{
           this._speedY += this.g * dt;
       }

       let distanceY = this._upBlock && this._speedY > 0 ?  0 : this._speedY * dt;

       this.node.y += distanceY;
    }

});
