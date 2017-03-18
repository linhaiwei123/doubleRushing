cc.Class({
    extends: cc.Component,

    properties: {
        level:0,
        time: 0,
        _timeStamp: null,
        _timeTipsLabel: null,
        _sceneLoading: false,
    },

    onLoad: function () {
        window.gameOver = false;
        window.level = this.level;
        this._timeTipsLabel = this.getComponent(cc.Label);
        this._timeStamp = Date.now();
    },

    update: function(dt){
        let restTime = Math.floor((this._timeStamp + this.time * 1000 - Date.now())/1000) ;
        if(restTime <= 0){
            if(!this._sceneLoading){
                this._sceneLoading = true;
                cc.director.loadScene('game-over-scene');
            }
        }else{
            this._timeTipsLabel.string = restTime;
        }
    }



});
