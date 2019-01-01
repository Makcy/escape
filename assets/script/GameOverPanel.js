cc.Class({
    extends: cc.Component,

    properties: {
        resetGameBtn: {
            type: cc.Button,
            default: null
        },
        backBtn: {
            type: cc.Button,
            default: null
        },
        scoreLabel: {
            type: cc.Label,
            default: null
        },
        expLabel: {
            type: cc.Label,
            default: null
        },
        _instance: {
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._instance = cc.find('Canvas/Main Camera').getComponent('GameManager');
        this.resetGameBtn.node.on('click', this.resetGameBtnCallback, this);
        this.backBtn.node.on('click', this.backGameBtnCallback, this);
        this.scoreLabel.string = this._instance.score; 
        this.expLabel.string = this._instance.exp; 
    },

    resetGameBtnCallback (event) {
        this._instance.resetGame();
    },

    backGameBtnCallback (event) {
        cc.director.loadScene('main');
    }
});