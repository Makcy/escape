const GameConfig = require('GameConfig');
const GameTools = require('GameTools');

cc.Class({
    extends: cc.Component,

    properties: {
        backBtn: cc.Button,
        videoBtn: cc.Button,
        signInBtn: cc.Button,
        tipPrefab: cc.Prefab
    },

    onLoad() {
        this.backBtn.node.on('click', this.backBtnCallback, this);
        this.videoBtn.node.on('click', this.videoTaskBtnCallback, this);
        this.signInBtn.node.on('click', this.signInBtnTaskCallback, this);

        const signInTask = GameTools.getLocalData('signIn');
        const videoTask = GameTools.getLocalData('video');
        if (signInTask === GameTools.formatTime(new Date(), 'yyyy-MM-dd')) {
            this.signInBtn.interactable = false;
        }

        // if (videoTask === GameTools.formatTime(new Date(), 'yyyy-MM-dd')) {
        //     this.videoBtn.interactable = false;
        // }
    },

    backBtnCallback(event) {
        cc.director.loadScene('main');
    },

    videoTaskBtnCallback(event) {
        if (CC_WECHATGAME) {
            // share.playVideo(
            //     this.taskSuccess,
            //     GameConfig.adUnitId.video
            // );
            let videoAd = wx.createRewardedVideoAd({
                adUnitId: GameConfig.adUnitId.video
              });
          
              videoAd.load()
              .then(() => videoAd.show())
              .catch(err => console.log(err.errMsg))
          
              videoAd.onClose((status) => {
                  if (status && status.isEnded || status === undefined) {
                      // 正常播放结束，可以下发游戏奖励
                      this.taskSuccess();
                      console.log('正常播放结束');
                  } else {
                      // 播放中途退出，不下发游戏奖励
                      console.log('中途退出');
                  }
              })
        }
    },

    signInBtnTaskCallback(event) {
        this.signInBtn.interactable = false;
        GameTools.setLocalData('signIn', GameTools.formatTime(new Date(), 'yyyy-MM-dd'));
        GameTools.addExp(GameConfig.SignInTaskExp);
        this.displayTip(GameConfig.SignInTaskExp);
    },

    taskSuccess() {
        console.log('金币领取成功')
        // this.videoBtn.interactable = false;
        GameTools.setLocalData('video', GameTools.formatTime(new Date(), 'yyyy-MM-dd'));
        GameTools.addExp(GameConfig.DailyTaskExp);
        this.displayTip(GameConfig.DailyTaskExp);
    },

    displayTip(value) {
        const tipPanel = cc.instantiate(this.tipPrefab);
        const displayInfo = tipPanel.getComponent('GameTip');
        displayInfo.setBalance(value);
        tipPanel.parent = cc.find('Canvas');
    }
});
