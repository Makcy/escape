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
    },

    backBtnCallback(event) {
        cc.director.loadScene('main');
    },

    videoTaskBtnCallback(event) {
        const daily = GameTools.getLocalData('daily');
        if (daily === GameTools.formatTime(new Date(), 'yyyy-MM-dd')) {
            // TODO 今日已经领取
            return;
        }
        if (CC_WECHATGAME) {
            share.playVideo(
                this.taskSuccess,
                GameConfig.adUnitId.video
            );
        }
    },

    signInBtnTaskCallback(event) {
        GameTools.addExp(GameConfig.SignInTaskExp);
    },

    taskSuccess() {
        console.log('金币领取成功')
        GameTools.addExp(GameConfig.DailyTaskExp);
    }
});
