cc.Class({
    extends: cc.Component,

    properties: {
        title: {
            type: cc.Label,
            default: null
        },
        icon: {
            default: null,
            type: cc.Sprite
        },
        des: {
            type: cc.Label, 
            default: null
        },
        cd: {
            type: cc.Label,
            default: null
        },
        isGet: false,
        button: {
            default: null,
            type: cc.Button
        },
        btnDes: {
            default: null,
            type: cc.Label
        }
    },

    setSkillInfo({title, icon, des, cd}) {
        this.title.string = title;
        this.icon.getComponent(cc.Sprite).spriteFrame = icon;
        this.des.string = des;
        this.cd.string = `冷却时间：${cd}秒`
    },

    onLoad () {

    },

    start () {

    },

    // update (dt) {},
});
