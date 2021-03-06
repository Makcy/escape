const shareUtil = require('./share.js');
const GameTools = require('GameTools');

const GameManager = cc.Class({
    extends: cc.Component,
    statics: {
        instance: null
    },
    properties: {
        FrameSize: {
            default: {}
        },
        scoreLabel: cc.Label,
        score: 0,
        exp: 0,
        totalExp: 0,
        tempExp: 0,
        isGameOver: false,
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
        gameOverPanelPrefab: {
            type: cc.Prefab,
            default: null,
            displayName: '游戏结束面板'
        },
        spawnNum: {
            type: cc.Integer,
            default: 5,
            displayName: '敌人出生点数量'
        },
        character: cc.Node
    },

    onLoad () {
        if (CC_WECHATGAME) {
            this.totalExp = GameTools.getLocalData('exp') || 0;
        }
        this.FrameSize = cc.view.getFrameSize();
        this.initShare();
        this.gameStart();
    },

    update () {
        if (cc.director.getScene().name === 'game') {
            if (!this.isGameOver) {
                if (this.score % 1000 === 200) {
                    this.resetSpawn();
                    this.spawnEnemy();
                }
                this.score += 2;
                this.scoreLabel.string = this.score;
            } 
        }
    },

    initShare() {
        if (CC_WECHATGAME) {
            cc.loader.loadRes('texture/share',(err, data) => {
                shareUtil.shareMenu(wx, data);
            });
        }
    },
    
    spawnCharacter () {
        this.character = cc.instantiate(this.CharacterPrefab);
        this.character.parent = cc.find('Canvas');
        this.character.setPosition(cc.v2(0, 0));
    },

    setJoystick () {
        const joyStick = cc.instantiate(this.JoyStickPrefab);
        joyStick.parent = cc.find('Canvas');
        joyStick.setPosition(cc.v2(0, -200));
    },

    resetSpawn () {
        this.spawn = [];
        this.spawn.push(cc.v2(this.getMockPoint('x'), this.FrameSize.height / 2));
        this.spawn.push(cc.v2(this.getMockPoint('x'), -this.FrameSize.height / 2));
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

    getMockPoint (point = 'x') {
        const span = point === 'x' ? this.FrameSize.width : this.FrameSize.height;
        return  span / 2 * Math.random() * Math.pow(-1, Math.floor(Math.random() * 10));    
    },

    setGameState (state) {
        switch (state) {
            case 'GAMEOVER': this.gameOver(); break;
        }
    },

    gameOver () {
        this.isGameOver = true;
        this.exp = Math.floor(this.score / 50);
        cc.director.pause();
        const gameOverPanel = cc.instantiate(this.gameOverPanelPrefab);
        gameOverPanel.parent = cc.find('Canvas');
        // this._gameOverPanel.setPosition(cc.v2(0, 0));
        if (CC_WECHATGAME) {
            const newExp = GameTools.addExp(this.exp - this.tempExp);
            this.totalExp = newExp;
            //  submit score
            wx.postMessage({
                messageType: 2,
                data: {
                    score: this.score
                }
            });
        }
    },

    resgureGame() {
        this.cleanGameOverPanel();
        this.cleanEnemyies();
        this.isGameOver = false;
        cc.director.resume();
    },

    resetGame () {
        // if (cc.director.isPaused && this.isGameOver) {
        // }
        this.score = 0;
        this.tempExp = 0;
        this.cleanScreenNode();
        this.isGameOver = false;
        this.gameStart();
        cc.director.resume();
    },

    gameStart () {
        this.spawnCharacter();
        this.setJoystick();
    },

    cleanJoyStick() {
        const joyStick = cc.find('Canvas/JoyStick');
        joyStick.destroy();
    },

    cleanEnemyies() {
        this.spawnNode.destroyAllChildren();
    },

    cleanGameOverPanel() {
        const gamePanel = cc.find('Canvas/GameOver');
        gamePanel.destroy();
    },

    cleanCharacter() {
        this.character.destroy();
        this.character = null;
    },

    cleanScreenNode () {
        this.cleanGameOverPanel();
        this.cleanJoyStick();
        this.cleanEnemyies();
        this.cleanCharacter();
    }
});

if (!GameManager.instance) {
    GameManager.instance = new GameManager();
}
module.exports =  GameManager;
