module.exports = {
  shareMenu: (wx, data) => {
    wx.showShareMenu();
    wx.onShareAppMessage(() => {
      return {
        title: '追上我，来一场对决吧',
        imageUrl: data.url
      }
  });
  }
} 