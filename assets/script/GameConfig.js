module.exports = {
  EnemyType : cc.Enum({
    NORAML: 0,
    MEDIUM: 1,
    HUGE: 2
  }),

  //  Type: Directive, Surround, Buff
  skills: [
    {
      id: 0,
      title: '凤舞九天',
      des: '传闻为陆小凤所创，此招一出，天不得时，日月无光',
      icon: 'skill_01',
      cd: 5,
      exp: 0,
      type: 'Surround',
      range: 4,
      prefab: 'skill_01'
    },
    {
      id: 1,
      title: '凤舞九天',
      des: '传闻为陆小凤所创，此招一出，天不得时，日月无光',
      icon: 'skill_01',
      cd: 10,
      exp: 2000,
      type: 'Surround',
      range: 4,
      prefab: 'skill_01'
    }
  ]
}