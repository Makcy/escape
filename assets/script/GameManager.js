const GameManager =cc.Class({
    extends: cc.Component,
    statics: {
        instance: null
    },
    properties: {
        FrameSize: {
            default: {}
        },
        scoreLabel: {
            default: null,
            type: cc.Label
        },
        score: {
            default: 0,
            type: cc.Integer
        },
        isGameOver: {
            default: false
        },
        CharacterPrefab: {
            default: null,
            type: cc.Prefab,
            displayName: '主角'
        }, 
        JoyStickPrefab: {
            default: null,
            type: cc.Prefab,
            displayName: '摇杆'
        },
        NormalEnemyPrefab: {
            default: null, 
            type: cc.Prefab,
            displayName: '普通敌人Prefab'
        },
        MidEnemyPrefab: {
            default: null,
            type: cc.Prefab,
            displayName: '中型敌人Prefab'
        },
        HugeEnemeyPrefab: {
            default: null,
            type: cc.Prefab,
            displayName: '史诗敌人Prefab'
        },
        spawnNode: {
            type: cc.Node,
            default: null,
            displayName: '出生节点'
        },
        spawn: {
            default: [],
            type: [cc.Vec2],
            displayName: '出生点'
        },
        spawnNum: {
            type: cc.Integer,
            default: 5,
            displayName: '敌人出生点数量'
        },
        character: {
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.FrameSize = cc.view.getFrameSize();
        this.spawnCharacter();
        this.setJoystick();
        this.resetSpawn();
        this.spawnEnemy();
    },

    update () {
        if (!this.isGameOver) {
            if (this.score % 8000 === 0) {
                // this.resetSpawn();
                // this.spawnEnemy();
            }
            this.score += 2;
            this.scoreLabel.string = this.score;
        }
    },
    
    spawnCharacter () {
        if (!this.character) {
            this.character = cc.instantiate(this.CharacterPrefab);
            this.character.parent = cc.find('Canvas');
            this.character.setPosition(cc.v2(0, 0));
        } else {
            // TODO: reset properties
        }
    },

    setJoystick () {
        const joyStick = cc.instantiate(this.JoyStickPrefab);
        joyStick.parent = cc.find('Canvas');
        // joyStick.setPosition(cc.v2(0, -200));
    },

    resetSpawn () {
        this.spawn = [];
        this.spawn.push(cc.v2(this.getMockPoint('x'), this.FrameSize.height / 2));
        this.spawn.push(cc.v2(this.getMockPoint('x'), -this.height / 2));
        this.spawn.push(cc.v2(this.FrameSize.width / 2, this.getMockPoint('y')));
        this.spawn.push(cc.v2(this.FrameSize.width / 2, this.getMockPoint('y')));
        this.spawn.push(cc.v2(-this.FrameSize.width / 2, this.getMockPoint('y')));
        this.spawn.push(cc.v2(-this.FrameSize.width / 2, this.getMockPoint('y')));
    },

    spawnEnemy () {
        this.spawn.map(p => {
            const enemy = cc.instantiate(this.NormalEnemyPrefab);
            enemy.parent = this.spawnNode;
            enemy.setPosition(p);
        });
    },

    getMockPoint(point = 'x') {
        const span = point === 'x' ? this.FrameSize.width : this.FrameSize.height;
        return  span / 2 * Math.random() * Math.pow(-1, Math.floor(Math.random() * 10));    
    }
});

if (!GameManager.instance) {
    GameManager.instance = new GameManager();
}
module.exports =  GameManager;
