// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const EnemyType =  cc.Enum({
    NORAML: 0,
    MEDIUM: 1,
    HUGE: 2
});

cc.Class({
    extends: cc.Component,

    properties: {
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
            default: 1,
            type: cc.Float
        },
        isDie: {
            default: false
        },
        _angle: {
            default: null
        },
        // onBeginContact: handleBeginContact
    },
    onLoad () {
        if (!this.target) {
            this.target = cc.find('Canvas/Character');
        }
    },
    update (dt) {
        // this.updateAngle();
        // this.node.x += Math.cos(this._angle * (Math.PI/180)) * this.speed * dt;
        // this.node.y += Math.sin(this._angle * (Math.PI/180)) * this.speed * dt;
        const targetPos = this.target.getPosition();
        const ownPos = this.node.getPosition();
        const targetVec = cc.v2(targetPos.x, targetPos.y);
        const ownVec = cc.v2(ownPos.x, ownPos.y);
        const vSub =  targetVec.sub(ownVec);
        const direction = vSub.normalize()
        const newPos = ownPos.add(direction.mul(this.speed));
        // const newPos = targetPos.add(cc.Vec2(3,3))
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
