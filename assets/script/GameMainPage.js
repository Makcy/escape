cc.Class({
    extends: cc.Component,

    properties: {
        startBtn: {
            default: null,
            type: cc.Button
        },
        rankBtn: {
            default: null,
            type: cc.Button
        },
        skillBtn: {
            default: null,
            type: cc.Button
        },
        taskBtn: {
            default: null,
            type: cc.Button
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startBtn.node.on('click', this.startBtnCallback, this);
        this.rankBtn.node.on('click', this.rankBtnCallback, this);
        this.skillBtn.node.on('click', this.skillBtnCallback, this);
        this.taskBtn.node.on('click', this.taskBtnCallback, this);
    },

    startBtnCallback(event) {
        // cc.director.loadScene('game');
    },

    rankBtnCallback(event) {
        cc.director.loadScene('rank');
    },

    skillBtnCallback(event) {
        cc.director.loadScene('skill');
    },

    taskBtnCallback(event) {
        cc.director.loadScene('task');
    }

    // update (dt) {},
});
