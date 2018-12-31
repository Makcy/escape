const GameTools = require('GameTools');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (CC_WECHATGAME) {
            cc.loader.loadRes('texture/login',(err, data) => {
                const sysInfo = wx.getSystemInfoSync();
                const image = wx.createImage();
                image.src = data;
                const button = wx.createUserInfoButton({
                    type: 'image',
                    image: image.src,
                    style: {
                      left: sysInfo.windowWidth / 2 - 85.5,
                      top: sysInfo.windowHeight / 2 + 43,
                      width: 171,
                      height: 56.8
                    }
                });
                button.onTap((res) => {
                    const userInfo = GameTools.getLocalData('userInfo');
                    const ownSkills = GameTools.getLocalData('ownSkills');

                    console.log(`LoginInfo: ${userInfo}`);
                    if (!res.userInfo) {
                        return;
                    }
                    if (!userInfo){
                        GameTools.setLocalData('userInfo', res.userInfo);
                    }
                    if (!ownSkills || ownSkills.length === 0) {
                        GameTools.setLocalData('ownSkills', []);
                    }
                    cc.director.loadScene('main');
                    button.destroy();
                });
            });
        }
    },
    
    loginBtnCallback(event) {
        const userInfo = GameTools.getLocalData('userInfo');
        if (!userInfo) {
            const info = GameTools.getUserInfoInWeChat();
            console.log(info)
        } else {
            cc.director.loadScene('main');
            console.log('本地存在UserInfo信息', userInfo);
        }
    }
});
