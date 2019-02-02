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
      des: '陆小凤失传已久的独创绝招，此招一出，天不得时，日月无光',
      icon: 'skill_01',
      cd: 20,
      exp: 1000,
      type: 'Surround',
      range: 4,
      prefab: 'skill_1'
    },
    {
      id: 2,
      title: '落英神剑掌',
      des: '桃花影落飞神剑，身法飘逸潇洒，黄老邪的独门绝学',
      icon: 'skill_02',
      cd: 2,
      exp: 2000,
      type: 'Shoot',
      range: 4,
      prefab: 'skill_2'
    }
  ],

  adUnitId: {
    video: 'adunit-1a2e3901300c1386',
    main: 'adunit-0eb3bc00d8f65bae'
  },

  DailyTaskExp: 200,
  SignInTaskExp: 50,
  ShareTexts: [
    '[微信红包]恭喜发财大吉大利',
    '你有一个拜年红包，请查收'
  ]
}