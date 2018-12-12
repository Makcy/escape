cc.Class({
    extends: cc.Component,

    properties: {
        prePosition: {
            default: new cc.Vec2()
        },
        animCtrl: {
            type: cc.Animation,
            default: null
        },
        isPlayingFrontAnim: {
            default: false,
        },
        _SCREEN_WIDTH: {
            default: 0
        },
        _SCREEN_HEIGHT: {
            default: 0
        },
        _instance: {
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._instance = cc.find('Canvas/Main Camera').getComponent('GameManager');
        if (!this.animCtrl && !this.prePosition) {
            this.animCtrl = this.node.getComponent(cc.Animation);
            this.prePosition = this.node.position;
        }
        this._SCREEN_WIDTH = this._instance.FrameSize.width / 2;
        this._SCREEN_HEIGHT = this._instance.FrameSize.height / 2;
    },

    onEnable () {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        // cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    onCollisionEnter: function (other, self) {
        if (other.node.group === 'enemy') {
            this._instance.setGameState('GAMEOVER');
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
        if (this.node.position.x < -this._SCREEN_WIDTH) {
            this.node.setPosition(-this._SCREEN_WIDTH, this.node.position.y);
        }
        if (this.node.position.x > this._SCREEN_WIDTH) {
            this.node.setPosition(this._SCREEN_WIDTH, this.node.position.y);
        }
        if (this.node.position.y > this._SCREEN_HEIGHT) {
            this.node.setPosition(this.node.position.x, this._SCREEN_HEIGHT);
        }
        if (this.node.position.y < -this._SCREEN_HEIGHT) {
            this.node.setPosition(this.node.position.x, -this._SCREEN_HEIGHT);
        }
        
        this.prePosition = this.node.position;
    }
});
