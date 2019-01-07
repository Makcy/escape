const GameConfig = require('GameConfig');
const share = require('share');
const GameTools = require('GameTools');

cc.Class({
    extends: cc.Component,

    properties: {
        backBtn: cc.Button,
        videoBtn: cc.Button,
        signInBtn: cc.Button
    },

    onLoad() {
        this.backBtn.node.on('click', this.backBtnCallback, this);
        this.videoBtn.node.on('click', this.videoTaskBtnCallback, this);
        this.signInBtn.node.on('click', this.signInBtnTaskCallback, this);

        const signInTask = GameTools.getLocalData('signIn');
        const videoTask = GameTools.getLocalData('video');
        if (signInTask === GameTools.formatTime(new Date(), 'yyyy-MM-dd')) {
            this.videoBtn.interactable = false;
        }

        if (videoTask === GameTools.formatTime(new Date(), 'yyyy-MM-dd')) {
            this.signInBtn.interactable = false;
        }
    },

    backBtnCallback(event) {
        cc.director.loadScene('main');
    },

    videoTaskBtnCallback(event) {
        if (CC_WECHATGAME) {
            share.playVideo(
                this.taskSuccess,
                GameConfig.adUnitId.video
            );
        }
    },

    signInBtnTaskCallback(event) {
        this.signInBtn.interactable = false;
        GameTools.setLocalData('signIn', GameTools.formatTime(new Date(), 'yyyy-MM-dd'));
        GameTools.addExp(GameConfig.SignInTaskExp);
    },

    taskSuccess() {
        console.log('金币领取成功')
        this.videoBtn.interactable = false;
        GameTools.setLocalData('video', GameTools.formatTime(new Date(), 'yyyy-MM-dd'));
        GameTools.addExp(GameConfig.DailyTaskExp);
    }
});
