module.exports = {
  shareMenu: (wx, data) => {
    wx.showShareMenu();
    wx.onShareAppMessage(() => {
      return {
        title: '追上我，来一场对决吧',
        imageUrl: data.url
      }
    });
  },

  playVideo: (successCb, adUnitId) => {
    let videoAd = wx.createRewardedVideoAd({
      adUnitId
    });

    videoAd.load()
    .then(() => videoAd.show())
    .catch(err => console.log(err.errMsg))

    videoAd.onClose((status) => {
        if (status && status.isEnded || status === undefined) {
            // 正常播放结束，可以下发游戏奖励
            successCb();
            console.log('正常播放结束');
            
        } else {
            // 播放中途退出，不下发游戏奖励
            console.log('中途退出');
        }
    })
  }
} 