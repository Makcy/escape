cc.Class({
    extends: cc.Component,

    properties: {
        resetGameBtn: cc.Button,
        backBtn: cc.Button,
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
        this.scoreLabel.string = this._instance.score; 
        this.expLabel.string = this._instance.exp; 
        this.totalExpLabel.string = this._instance.totalExp; 
    },

    resetGameBtnCallback (event) {
        this._instance.resetGame();
    },

    backGameBtnCallback (event) {
        cc.director.loadScene('main');
    }
});