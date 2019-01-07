cc.Class({
    extends: cc.Component,

    properties: {
        resetGameBtn: cc.Button,
        backBtn: cc.Button,
        resgureBtn: cc.Button,
        scoreLabel: cc.Label,
        expLabel: cc.Label,
        totalExpLabel: cc.Label,
        _instance: {
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._instance = cc.find('Canvas/Main Camera').getComponent('GameManager');
        this.resetGameBtn.node.on('click', this.resetGameBtnCallback, this);
        this.backBtn.node.on('click', this.backGameBtnCallback, this);
        this.resgureBtn.node.on('click', this.resgureBtnCallback, this);
        this.scoreLabel.string = this._instance.score; 
        this.expLabel.string = this._instance.exp; 
        this.totalExpLabel.string = this._instance.totalExp; 
    },

    resetGameBtnCallback (event) {
        this._instance.resetGame();
    },

    resgureBtnCallback(event) {
        if (CC_WECHATGAME) {
            cc.loader.loadRes('texture/share',(err, data) => {
                wx.shareAppMessage({
                    title: '追不上我吧，啦啦啦啦啦啦~',
                    imageUrl: data.url,
                    success(res) {
                        this._instance.resgureGame();
                    },
                    fail(res) {
                        console.log('分享失败');
                    }
                })
            })
        }
    },

    backGameBtnCallback (event) {
        cc.director.resume();
        cc.director.loadScene('main');
    }
});