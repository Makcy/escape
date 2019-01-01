const GameConfig = require('GameConfig');

module.exports = {
  setLocalData(key, data) {
    if (CC_WECHATGAME) {
      try {
        wx.setStorageSync(key, data);
      } catch (e) {
        console.log(`Set Local Data Error --${e}`);
      }
    }
  },

  getLocalData(key) {
    if (CC_WECHATGAME) {
      try {
        return wx.getStorageSync(key);
      } catch (e) {
        console.log(`Get Local Data Error --${e}`);
      }
    }
  },

  studySkill(skillId) {
    let exp = this.getLocalData('exp') || 0;
    const skills = this.getLocalData('ownSkills') || [];
    const skillInfo =  GameConfig.skills.find(s => s.id === skillId);
    if (!skillInfo) {
      throw new Error('skill not found')
    }
    if (exp < skillInfo.exp) {
      return false;
    }
    this.setLocalData('exp', exp - skillInfo.exp);
    skills.push(skillId)
    this.setLocalData('ownSkills', skills);
    return true;
  },

  addExp(value) {
    const exp = this.getLocalData('exp') || 0;
    this.setLocalData('exp', exp + value);
  },

  getUserInfoInWeChat () {
    if (CC_WECHATGAME) {
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success: () => {
                wx.getUserInfo({
                  success: res => {
                      this.setLocalData('userInfo', res.userInfo);
                  },
                  fail: res => {
                    console.log('get userInfo error', res);
                  }
                })
              },
              fail: res => {
                console.log('authorize userInfo error', res);
              }
            })
          }
        }
      })
    }
    return {
      avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKic5sexcbTkdPCyApnzRdianC7Y4jHxjlbxcf7nZHfK317L6h7EbXdEzZO8Wgbgfichu4aBQzPQqQPQ/132',
      nickname: '酒剑仙'
    }
  }
}