const GameTools = require('GameTools');
cc.Class({
    extends: cc.Component,

    properties: {
        balanceLabel: cc.Label,
        closeBtn: cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad () {
        // this.balanceLabel.string = '当前金币：0';
        this.closeBtn.node.on('click', this.closeBtnCallback, this);
        // if (CC_WECHATGAME)  {
        //     const currentExp = GameTools.getLocalData('exp');
        //     this.balanceLabel.string = `当前金币：${currentExp}`;
        // }
    },

    setBalance (value) {
        this.balanceLabel.string = value;
    },

    closeBtnCallback () {
        this.node.destroy();
    }
});
