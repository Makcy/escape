const { EnemyType } = require('GameConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        animCtrl: {
            type: cc.Animation,
            default: null
        },
        isPlayingFrontAnim: {                   
            default: false,
        },
        type: {
            default: EnemyType.NORAML,
            type:  EnemyType,
            displayName: '敌人类型'
        },
        target: {
            default: null,
            type: cc.Node
        },
        speed: {
            default: 10,
            type: cc.Float
        },
        isDie: {
            default: false
        },
        _angle: {
            default: null
        },
        _instance: {
            default: null
        }
        // 碰撞 死亡
        // onBeginContact: handleBeginContact
    },
    onLoad () {
        this._instance = cc.find('Canvas/Main Camera').getComponent('GameManager');
        if (!this.target) {
            this.target = this._instance.character;
        }
        if (!this.animCtrl && !this.prePosition) {
            this.animCtrl = this.node.getComponent(cc.Animation);
            this.prePosition = this.node.position;
        }
        if (this.isDie) {
            this.node.destroy();
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
        this.prePosition = this.node.position;
        // Enemy Move 
        this.updateAngle();
        this.node.x += Math.cos(this._angle * (Math.PI/180)) * this.speed * dt * 10;
        this.node.y += Math.sin(this._angle * (Math.PI/180)) * this.speed * dt * 10;
    },
    updatePosition(dt) {
        const targetPos = this.target.getPosition();
        const ownPos = this.node.getPosition();
        const targetVec = cc.v2(targetPos.x, targetPos.y);
        const ownVec = cc.v2(ownPos.x, ownPos.y);
        const vSub =  targetVec.sub(ownVec);
        const direction = vSub.normalize()
        const newPos = ownPos.add(direction.mul(this.speed * dt * 10));
        this.node.setPosition(newPos);
    },
    updateAngle () {
        const ownPos = this.node.getPosition();
        const targetPos = this.target.getPosition();
        this._angle = Math.atan2(targetPos.y - ownPos.y, targetPos.x - ownPos.x) * (180/Math.PI);
    },
    handleBeginContact (contact, selfCollider, otherCollider) {

    }
});