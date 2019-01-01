const GameTools = require('GameTools');
const GameConfig = require('GameConfig');

cc.Class({
    extends: cc.Component,

    properties: {   
        coldMask: cc.Sprite,
        currentSkill: null,
        isCd: true,
        _instance: null
    },

    onLoad () {
        if (CC_WECHATGAME) {
            const currentSkillId = GameTools.getLocalData('currentSkill');
            if (!currentSkillId || currentSkillId === 0) {
                this.node.active = false;
            }
            this.currentSkill = GameConfig.skills.find(s => s.id === currentSkillId);
        } else {
            //  TODO: mock data
            this.currentSkill = GameConfig.skills.find(s => s.id === 1);
        }
        this._instance = cc.find('Canvas/Main Camera').getComponent('GameManager');
        this.node.on('click', this.skillBtnCallback, this);
    },

    skillBtnCallback(event) {
        if (!this.isCd) {
            this.releaseSkill(this.currentSkill.id);
            this.coldMask.getComponent(cc.Sprite).fillStart = 0;
            this.isCd = true; 
        }
    },

    releaseSkill(skillId) {
        cc.loader.loadRes(`skill/skill_${skillId}`, cc.Prefab, (err, prefab) => {
            if (!prefab) return;
            const skill = cc.instantiate(prefab);
            // skill.parent = cc.find('Canvas');
            // skill.setPosition(this._instance.character.position);
            skill.parent = this._instance.character;
        });
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
