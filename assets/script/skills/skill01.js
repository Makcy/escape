cc.Class({
    extends: cc.Component,

    onLoad() {
        this.scheduleOnce(function() {
            this.node.destroy();
        }, 5);
    },

    onCollisionEnter: function (other, self) {
        if (other.node.group === 'enemy') {
            other.node.destroy();
        }
    },

    update(dt) {
        this.node.rotation += 200 * dt;
    }
});
