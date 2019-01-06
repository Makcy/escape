const GameTools = require('GameTools');
const GameConfig = require('GameConfig');
const share = require('share');
cc.Class({
    extends: cc.Component,

    properties: {
        startBtn: {
            default: null,
            type: cc.Button
        },
        rankBtn: {
            default: null,
            type: cc.Button
        },
        skillBtn: {
            default: null,
            type: cc.Button
        },
        taskBtn: {
            default: null,
            type: cc.Button
        },
        bannerAd: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (CC_WECHATGAME) {
            this.bannerAd = share.showBanner(GameConfig.adUnitId.main);
            cc.loader.loadRes('texture/share',(err, data) => {
                share.shareMenu(wx, data);
            });
        }
        this.startBtn.node.on('click', this.startBtnCallback, this);
        this.rankBtn.node.on('click', this.rankBtnCallback, this);
        this.skillBtn.node.on('click', this.skillBtnCallback, this);
        this.taskBtn.node.on('click', this.taskBtnCallback, this);
    },

    startBtnCallback(event) {
        const skills = GameTools.getLocalData('ownSkills');
        if (!skills || skills.length === 0) {
            this.switchScene('game');
            return;
        }
        this.switchScene('prepare');
    },

    rankBtnCallback(event) {
        this.switchScene('rank');
    },

    skillBtnCallback(event) {
        this.switchScene('skill');
    },

    taskBtnCallback(event) {
        this.switchScene('task');
    },
    
    switchScene(sceneName) {
        cc.director.loadScene(sceneName);
        if (this.bannerAd) {
            share.destroyBanner(this.bannerAd);
        }
    }

    // update (dt) {},
});
