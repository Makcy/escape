const GameTools = require('GameTools');
cc.Class({
    extends: cc.Component,

    properties: {
        backBtn: cc.Button,
        expLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        GameTools.setLocalData('exp', 10000);
        const exp = GameTools.getLocalData('exp') || 0;
        this.expLabel.string = exp;
        this.backBtn.node.on('click', this.backBtnCallback, this);
    },

    start () {

    },

    backBtnCallback(event) {
        cc.director.loadScene('main');
    },

    // update (dt) {},
});
