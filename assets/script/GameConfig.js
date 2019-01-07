module.exports = {
  EnemyType : cc.Enum({
    NORAML: 0,
    MEDIUM: 1,
    HUGE: 2
  }),

  //  Type: Directive, Surround, Buff
  skills: [
    {
      id: 1,
      title: '凤舞九天',
      des: '传说为陆小凤独创，此招一出，天不得时，日月无光',
      icon: 'skill_01',
      cd: 20,
      exp: 1000,
      type: 'Surround',
      range: 4,
      prefab: 'skill_1'
    }
  ],

  adUnitId: {
    video: 'adunit-1a2e3901300c1386',
    main: 'adunit-0eb3bc00d8f65bae'
  },

  DailyTaskExp: 200,
  SignInTaskExp: 50
}