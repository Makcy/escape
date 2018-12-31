cc.Class({
  extends: cc.Component,

  properties: {
    rankingScrollView: cc.Sprite,
    backBtn: cc.Button
  },

  onLoad () {
    this.backBtn.node.on('click', this.backBtnCallback, this);
    this.fetchFriendRankView();
  },

  fetchFriendRankView() {
    console.log('主域')
    if (CC_WECHATGAME) {
      this.tex = new cc.Texture2D();
      window.wx.showShareMenu({withShareTicket: true});//设置分享按钮，方便获取群id展示群排行榜
      window.wx.postMessage({
          messageType: 1
      });
    }
  },

  backBtnCallback(event) {
    cc.director.loadScene('main');
  },

  _updateSubDomainCanvas() {
    if (window.sharedCanvas != undefined) {
      this.tex.initWithElement(window.sharedCanvas);
      this.tex.handleLoadedTexture();
      this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
    }
  },
  update() {
      this._updateSubDomainCanvas();
  }
});
