const GameTools = require('GameTools');
cc.Class({
    extends: cc.Component,

    properties: {
        backBtn: cc.Button,
        expLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // TODO: remove init exp    
        GameTools.setLocalData('exp', 1000);
        const exp = GameTools.getLocalData('exp') || 0;
        this.expLabel.string = exp;
        this.backBtn.node.on('click', this.backBtnCallback, this);
    },

    backBtnCallback(event) {
        cc.director.loadScene('main');
    },

    // update (dt) {},
});
