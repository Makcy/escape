const GameTools = require('GameTools');
cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        icon: cc.Sprite,
        des: cc.Label,
        cd: cc.Label,
        exp: cc.Label,
        isGet: false,
        studyBtn: cc.Button,
        unlockSprite: cc.Sprite,
        btnDes: cc.Label,
        id: 0
    },

    setSkillInfo({title, icon, des, cd, exp, unLock, id}) {
        this.title.string = title;
        this.icon.getComponent(cc.Sprite).spriteFrame = icon;
        this.des.string = des;
        this.exp.string = `${exp}点`;
        this.cd.string = `${cd}秒`;
        this.id = id;
        if (unLock) {
            this.unLockSkill();
        }
    },

    onLoad () {
        this.studyBtn.node.on('click', this.studyBtnCallback, this);
    },

    studyBtnCallback(event) {
        const isStudy = GameTools.studySkill(this.id);
        if (isStudy) {
            this.unLockSkill();
            this.freshExpDisplay();
        }
    },

    unLockSkill() {
        this.studyBtn.node.active = false;
        this.unlockSprite.node.active = true;
    },

    freshExpDisplay() {
       if (cc.director.getScene().name === 'skill') {
           const expLabel = cc.find('Canvas/exp/value').getComponent(cc.Label);
           const expValue = GameTools.getLocalData('exp') || 0;
           expLabel.string = expValue;
       }
    }

    // update (dt) {},
});
