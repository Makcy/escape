const SKILL_ITEM_HEIGHT = 150
const gameConfig = require('GameConfig');
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
        this.contentNode.height = gameConfig.skills.length * SKILL_ITEM_HEIGHT;
        for(let i = 0; i < gameConfig.skills.length; i++) {
           const info = gameConfig.skills[i];
           const item = cc.instantiate(this.skillItem);
           
           const skillCom = item.getComponent('skillInfo');
           cc.loader.loadRes(`ui/skillIcon/${info.icon}`, cc.SpriteFrame, (err, data) => {
            console.log(`ui/skillIcon/${info.icon}`)
            if (err) {
                console.log(err);
                return;
            }
            console.log(data);
            skillCom.setSkillInfo({
                title: info.title,
                icon: data,
                des: info.des,
                cd: info.cd
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
