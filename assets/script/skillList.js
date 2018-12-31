const SKILL_ITEM_HEIGHT = 250
const GameConfig = require('GameConfig');
const GameTools = require('GameTools');
cc.Class({
    extends: cc.Component,

    properties: {
        skillItem: {
            type: cc.Prefab,
            default: null
        },
        contentNode: {
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // TODO: read user info
        this.loadAllSkill();
    },

    start () {

    },

    loadAllSkill () {
        this.contentNode.height = GameConfig.skills.length * SKILL_ITEM_HEIGHT;
        const ownSkills = GameTools.getLocalData('ownSkills') || [];
        for(let i = 0; i < GameConfig.skills.length; i++) {
           const info = GameConfig.skills[i];
           const item = cc.instantiate(this.skillItem);
           const skillCom = item.getComponent('skillInfo');
           cc.loader.loadRes(`ui/skillIcon/${info.icon}`, cc.SpriteFrame, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            skillCom.setSkillInfo({
                title: info.title,
                icon: data,
                des: info.des,
                cd: info.cd,
                exp: info.exp,
                id: info.id,
                unLock: ownSkills.includes(info.id) || false
            });
            item.parent = this.contentNode;
            item.setPosition(cc.v2(0, -10 - i * SKILL_ITEM_HEIGHT));
           });
        };
    },

    loadAvaliableSkill () {

    }

    // update (dt) {},
});
