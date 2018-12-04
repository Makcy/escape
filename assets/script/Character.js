let FrameSize = {};
let SCREEN_WIDTH;
let SCREEN_HEIGHT;
cc.Class({
    extends: cc.Component,

    properties: {
        prePosition: {
            default: new cc.Vec2()
        },
        animCtrl: {
            type: cc.Animation,
            default: cc.Vec2(0, 0)
        },
        isPlayingFrontAnim: {
            default: false,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (!this.animCtrl && !this.prePosition) {
            this.animCtrl = this.node.getComponent(cc.Animation);
            this.prePosition = this.node.position;
        }

        if (JSON.stringify(FrameSize) === '{}') {
            FrameSize = cc.view.getFrameSize();
            SCREEN_WIDTH = FrameSize.width / 2 - 100;
            SCREEN_HEIGHT = FrameSize.height / 2 - 100;
        }
    },

    update (dt) {
        if (this.prePosition.y < this.node.position.y && !this.isPlayingFrontAnim) {
            this.animCtrl.play('front');
            this.isPlayingFrontAnim = !this.isPlayingFrontAnim;
        }

        if (this.prePosition.y >= this.node.position.y && this.isPlayingFrontAnim) {
            this.isPlayingFrontAnim = !this.isPlayingFrontAnim;
            this.animCtrl.play('back');
        }
        
        if (this.node.position.x < -SCREEN_WIDTH) {
            this.node.setPosition(-SCREEN_WIDTH, this.node.position.y);
        }
        if (this.node.position.x > SCREEN_WIDTH) {
            this.node.setPosition(SCREEN_WIDTH, this.node.position.y);
        }
        if (this.node.position.y > SCREEN_HEIGHT) {
            this.node.setPosition(this.node.position.x, SCREEN_HEIGHT);
        }
        if (this.node.position.y < -SCREEN_HEIGHT) {
            this.node.setPosition(this.node.position.x, -SCREEN_HEIGHT);
        }
        
        this.prePosition = this.node.position;
    },
});
