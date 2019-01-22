cc.Class({
    extends: cc.Component,

    properties: {
        videoBtn: cc.Button,
        palyGameBtn: cc.Button,
        closeBtn: cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.videoBtn.node.on('click', this.videoBtnCallback, this);
        this.palyGameBtn.node.on('click', this.playGameBtnCallback, this);
        this.closeBtn.node.on('click', this.closeBtnCallback, this);
    },

    videoBtnCallback () {
        cc.director.loadScene('task');
    },

    playGameBtnCallback () {
        cc.director.loadScene('main');
    },

    closeBtnCallback () {
        this.node.destroy();
    }
});
