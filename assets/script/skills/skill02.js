cc.Class({
    extends: cc.Component,
    properties: {
        _angle: {
            default: null
        }
    },

    onLoad() {
        const joy = cc.find('Canvas/JoyStick/ring').getComponent('JoystickBG');
        this._angle = joy._angle ? joy._angle : -90;
        this.scheduleOnce(function() {
            this.node.destroy();
        }, 5);
    },

    onCollisionEnter: function (other, self) {
        console.log(other.node.group)
        if (other.node.group === 'enemy') {
            other.node.destroy();
        }
    },

    update(dt) {
        this.node.rotation += 2000 * dt;
        this.node.x += Math.cos(this._angle * (Math.PI/180)) * 20 * dt * 10;
        this.node.y += Math.sin(this._angle * (Math.PI/180)) * 20 * dt * 10;
    }
});
