const GameTools = require('GameTools');
const GameConfig = require('GameConfig');
cc.Class({
    extends: cc.Component,

    properties: {   
        coldMask: cc.Sprite,
        currentSkill: null,
        isCd: true
    },

    onLoad () {
        // if (CC_WECHATGAME) {
        //     const currentSkillId = GameTools.getLocalData('currentSkill');
        //     if (!currentSkill || currentSkill === 0) {
        //         this.node.active = false;
        //     }
        //     this.currentSkill = GameConfig.skills.find(s => s.id === currentSkillId);
        // }
        const currentSkillId = 1
        this.currentSkill = GameConfig.skills.find(s => s.id === currentSkillId);

        this.node.on('click', this.skillBtnCallback, this);
    },

    skillBtnCallback(event) {
        if (!this.isCd) {
            // this.releaseSkill(this.currentSkill.id);
            this.coldMask.getComponent(cc.Sprite).fillStart = 0;
            this.isCd = true;
        }
    },

    releaseSkill(skillId) {

    },

    update (dt) {
        if (this.isCd) {
            const cdTime = this.currentSkill.cd;
            const sprite = this.coldMask.getComponent(cc.Sprite);
            sprite.fillStart -= 1 / cdTime * dt;
            if (sprite.fillStart <= -1) {
                this.isCd = false;
            }
        }
    },
});
