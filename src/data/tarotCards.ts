import { TarotCard } from '../types/tarot';

export const tarotCards: TarotCard[] = [
  // 大阿卡纳 (Major Arcana)
  {
    id: 0,
    name: "The Fool",
    nameCN: "愚者",
    type: "major",
    keywords: ["新开始", "纯真", "冒险"],
    upright: ["新的开始", "纯真", "自发性", "自由精神"],
    reversed: ["鲁莽", "冒险主义", "愚蠢"],
    description: "愚者代表着新的开始和无限的可能性。他象征着纯真、自发性和对未知的勇敢探索。"
  },
  {
    id: 1,
    name: "The Magician",
    nameCN: "魔术师",
    type: "major",
    keywords: ["意志力", "技能", "专注"],
    upright: ["意志力", "渴望", "创造", "表现"],
    reversed: ["操控", "恶意", "缺乏能量"],
    description: "魔术师代表着意志力和创造力的结合。他拥有将想法转化为现实的能力。"
  },
  {
    id: 2,
    name: "The High Priestess",
    nameCN: "女祭司",
    type: "major",
    keywords: ["直觉", "内在智慧", "神秘"],
    upright: ["直觉", "潜意识", "内在指导"],
    reversed: ["缺乏内在指导", "忽视直觉"],
    description: "女祭司象征着直觉和内在智慧。她提醒我们要倾听内心的声音。"
  },
  {
    id: 3,
    name: "The Empress",
    nameCN: "皇后",
    type: "major",
    keywords: ["丰饶", "母性", "创造力"],
    upright: ["丰饶", "女性力量", "美丽", "自然"],
    reversed: ["创意阻塞", "依赖他人"],
    description: "皇后代表着丰饶和创造力。她是母性能量和自然力量的体现。"
  },
  {
    id: 4,
    name: "The Emperor",
    nameCN: "皇帝",
    type: "major",
    keywords: ["权威", "结构", "控制"],
    upright: ["权威", "建立", "结构", "父亲形象"],
    reversed: ["暴君", "严格", "缺乏纪律"],
    description: "皇帝象征着权威和秩序。他代表着结构、稳定和父性的保护力量。"
  },
  {
    id: 5,
    name: "The Hierophant",
    nameCN: "教皇",
    type: "major",
    keywords: ["传统", "精神指导", "宗教"],
    upright: ["精神指导", "传统", "遵从", "宗教"],
    reversed: ["反叛", "非传统", "新方法"],
    description: "教皇代表着传统智慧和精神指导。他是连接天地的桥梁。"
  },
  {
    id: 6,
    name: "The Lovers",
    nameCN: "恋人",
    type: "major",
    keywords: ["爱情", "关系", "选择"],
    upright: ["爱", "和谐", "关系", "价值观匹配"],
    reversed: ["不和谐", "错位", "不平衡"],
    description: "恋人牌象征着爱情和深度连接。它也代表着重要的选择和价值观的统一。"
  },
  {
    id: 7,
    name: "The Chariot",
    nameCN: "战车",
    type: "major",
    keywords: ["胜利", "意志力", "控制"],
    upright: ["控制", "意志力", "胜利", "断言"],
    reversed: ["缺乏控制", "缺乏方向"],
    description: "战车代表着通过意志力和决心获得的胜利。它象征着前进的动力。"
  },
  {
    id: 8,
    name: "Strength",
    nameCN: "力量",
    type: "major",
    keywords: ["内在力量", "勇气", "耐心"],
    upright: ["力量", "勇气", "耐心", "控制"],
    reversed: ["软弱", "自我怀疑", "缺乏能量"],
    description: "力量牌代表着内在的力量和勇气。真正的力量来自于温柔和耐心。"
  },
  {
    id: 9,
    name: "The Hermit",
    nameCN: "隐士",
    type: "major",
    keywords: ["内省", "寻求", "指导"],
    upright: ["内省", "寻求真理", "内在指导"],
    reversed: ["孤立", "迷失", "固执"],
    description: "隐士象征着内在的探索和寻求真理的旅程。他提醒我们要向内寻找答案。"
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    nameCN: "命运之轮",
    type: "major",
    keywords: ["命运", "变化", "循环"],
    upright: ["好运", "业力", "生命周期", "转折点"],
    reversed: ["坏运气", "缺乏控制", "破坏循环"],
    description: "命运之轮代表着生命的周期性和不断变化的本质。它提醒我们变化是永恒的。"
  },
  {
    id: 11,
    name: "Justice",
    nameCN: "正义",
    type: "major",
    keywords: ["公正", "真理", "法律"],
    upright: ["公正", "公平", "真理", "因果"],
    reversed: ["不公", "缺乏问责", "不诚实"],
    description: "正义牌代表着公平、真理和道德责任。它提醒我们行动会有相应的后果。"
  },
  {
    id: 12,
    name: "The Hanged Man",
    nameCN: "倒吊人",
    type: "major",
    keywords: ["牺牲", "等待", "换角度"],
    upright: ["牺牲", "等待", "换角度", "投降"],
    reversed: ["拖延", "抗拒", "停滞"],
    description: "倒吊人象征着自愿的牺牲和换个角度看问题的智慧。有时候放手才能获得。"
  },
  {
    id: 13,
    name: "Death",
    nameCN: "死神",
    type: "major",
    keywords: ["结束", "转变", "重生"],
    upright: ["结束", "转变", "过渡", "释放"],
    reversed: ["抗拒改变", "停滞", "腐朽"],
    description: "死神牌代表着结束和新的开始。它象征着转变和重生的必要性。"
  },
  {
    id: 14,
    name: "Temperance",
    nameCN: "节制",
    type: "major",
    keywords: ["平衡", "耐心", "调和"],
    upright: ["平衡", "调和", "耐心", "目标"],
    reversed: ["不平衡", "过度", "缺乏耐心"],
    description: "节制牌代表着平衡和调和。它教导我们在生活中寻找中庸之道。"
  },
  {
    id: 15,
    name: "The Devil",
    nameCN: "恶魔",
    type: "major",
    keywords: ["束缚", "诱惑", "物质主义"],
    upright: ["束缚", "成瘾", "物质主义", "玩乐"],
    reversed: ["释放", "恢复控制", "克服成瘾"],
    description: "恶魔牌代表着束缚和诱惑。它提醒我们要警惕物质世界的陷阱。"
  },
  {
    id: 16,
    name: "The Tower",
    nameCN: "塔",
    type: "major",
    keywords: ["突然改变", "觉醒", "启示"],
    upright: ["突然改变", "动荡", "觉醒", "启示"],
    reversed: ["避免灾难", "延迟变化", "恐惧改变"],
    description: "塔牌代表着突然的变化和启示。虽然可能带来震撼，但也带来新的理解。"
  },
  {
    id: 17,
    name: "The Star",
    nameCN: "星星",
    type: "major",
    keywords: ["希望", "信仰", "指导"],
    upright: ["希望", "信仰", "目标", "灵感"],
    reversed: ["缺乏信仰", "绝望", "不安全感"],
    description: "星星牌象征着希望和信仰。它在黑暗中为我们指引方向。"
  },
  {
    id: 18,
    name: "The Moon",
    nameCN: "月亮",
    type: "major",
    keywords: ["幻觉", "恐惧", "潜意识"],
    upright: ["幻觉", "恐惧", "潜意识", "直觉"],
    reversed: ["释放恐惧", "压抑情感", "内在混乱"],
    description: "月亮牌代表着幻觉和潜意识的世界。它提醒我们要面对内心的恐惧。"
  },
  {
    id: 19,
    name: "The Sun",
    nameCN: "太阳",
    type: "major",
    keywords: ["快乐", "成功", "积极"],
    upright: ["快乐", "成功", "积极", "活力"],
    reversed: ["暂时的阴霾", "缺乏成功"],
    description: "太阳牌象征着快乐、成功和生命力。它带来光明和希望。"
  },
  {
    id: 20,
    name: "Judgement",
    nameCN: "审判",
    type: "major",
    keywords: ["觉醒", "内在呼唤", "重生"],
    upright: ["觉醒", "内在呼唤", "宽恕", "内在智慧"],
    reversed: ["严厉的自我判断", "缺乏自我意识"],
    description: "审判牌代表着精神的觉醒和重生。它呼唤我们回归真实的自我。"
  },
  {
    id: 21,
    name: "The World",
    nameCN: "世界",
    type: "major",
    keywords: ["完成", "成就", "旅程结束"],
    upright: ["成就", "旅程完成", "满足", "成功"],
    reversed: ["缺乏成就感", "停滞"],
    description: "世界牌象征着完成和成就。它代表着一个周期的圆满结束。"
  },

  // 权杖组合 (Wands/Rods) - 火元素
  {
    id: 22,
    name: "Ace of Wands",
    nameCN: "权杖王牌",
    type: "minor",
    suit: "wands",
    number: 1,
    keywords: ["新项目", "创造力", "灵感"],
    upright: ["创造力", "新项目", "灵感", "成长"],
    reversed: ["缺乏能量", "拖延", "缺乏激情"],
    description: "权杖王牌代表着创造力和新项目的开始。它象征着无限的潜力和生命力。"
  },
  {
    id: 23,
    name: "Two of Wands",
    nameCN: "权杖二",
    type: "minor",
    suit: "wands",
    number: 2,
    keywords: ["计划", "决定", "个人权力"],
    upright: ["计划", "作出决定", "个人权力"],
    reversed: ["缺乏计划", "害怕未知", "缺乏控制"],
    description: "权杖二象征着制定计划和做出重要决定的时刻。"
  },
  {
    id: 24,
    name: "Three of Wands",
    nameCN: "权杖三",
    type: "minor",
    suit: "wands",
    number: 3,
    keywords: ["扩展", "远见", "领导"],
    upright: ["扩展", "远见", "海外机会", "领导"],
    reversed: ["缺乏远见", "延迟", "缺乏进展"],
    description: "权杖三代表着扩展视野和寻求新机会的时期。"
  },
  {
    id: 25,
    name: "Four of Wands",
    nameCN: "权杖四",
    type: "minor",
    suit: "wands",
    number: 4,
    keywords: ["庆祝", "家庭", "稳定"],
    upright: ["庆祝", "家庭", "婚礼", "社区"],
    reversed: ["缺乏稳定", "家庭问题", "延迟庆祝"],
    description: "权杖四象征着庆祝、稳定和家庭和谐的时期。"
  },
  {
    id: 26,
    name: "Five of Wands",
    nameCN: "权杖五",
    type: "minor",
    suit: "wands",
    number: 5,
    keywords: ["冲突", "竞争", "分歧"],
    upright: ["冲突", "竞争", "分歧", "斗争"],
    reversed: ["避免冲突", "合作", "内在冲突"],
    description: "权杖五代表着冲突和竞争，但也可能带来成长和进步。"
  },
  {
    id: 27,
    name: "Six of Wands",
    nameCN: "权杖六",
    type: "minor",
    suit: "wands",
    number: 6,
    keywords: ["胜利", "认可", "成功"],
    upright: ["胜利", "公众认可", "进步", "自信"],
    reversed: ["私人成就", "自我怀疑", "缺乏认可"],
    description: "权杖六象征着胜利和公众认可，是努力得到回报的时刻。"
  },
  {
    id: 28,
    name: "Seven of Wands",
    nameCN: "权杖七",
    type: "minor",
    suit: "wands",
    number: 7,
    keywords: ["挑战", "坚持", "防守"],
    upright: ["挑战", "坚持", "保护立场", "勇气"],
    reversed: ["放弃", "屈服", "缺乏勇气"],
    description: "权杖七代表着面对挑战时要坚持自己的立场和信念。"
  },
  {
    id: 29,
    name: "Eight of Wands",
    nameCN: "权杖八",
    type: "minor",
    suit: "wands",
    number: 8,
    keywords: ["快速行动", "进展", "消息"],
    upright: ["快速行动", "进展", "航空旅行", "消息"],
    reversed: ["拖延", "受阻", "缺乏进展"],
    description: "权杖八象征着快速的发展和积极的变化。"
  },
  {
    id: 30,
    name: "Nine of Wands",
    nameCN: "权杖九",
    type: "minor",
    suit: "wands",
    number: 9,
    keywords: ["坚韧", "毅力", "防守"],
    upright: ["坚韧", "毅力", "测试", "边界"],
    reversed: ["偏执", "固执", "拒绝妥协"],
    description: "权杖九代表着在困难中保持坚韧和毅力的重要性。"
  },
  {
    id: 31,
    name: "Ten of Wands",
    nameCN: "权杖十",
    type: "minor",
    suit: "wands",
    number: 10,
    keywords: ["负担", "责任", "成功的代价"],
    upright: ["负担", "额外责任", "辛苦工作", "压力"],
    reversed: ["卸下负担", "委托", "寻求支持"],
    description: "权杖十象征着成功所带来的责任和负担。"
  },
  {
    id: 32,
    name: "Page of Wands",
    nameCN: "权杖侍从",
    type: "minor",
    suit: "wands",
    number: 11,
    keywords: ["探索", "兴奋", "自由精神"],
    upright: ["探索", "兴奋", "自由精神", "好奇心"],
    reversed: ["缺乏方向", "拖延", "缺乏承诺"],
    description: "权杖侍从代表着年轻的能量和对新冒险的渴望。"
  },
  {
    id: 33,
    name: "Knight of Wands",
    nameCN: "权杖骑士",
    type: "minor",
    suit: "wands",
    number: 12,
    keywords: ["行动", "冲动", "冒险"],
    upright: ["行动", "冲动", "冒险", "鲁莽"],
    reversed: ["无行动", "缺乏自制", "鲁莽"],
    description: "权杖骑士象征着充满激情的行动，但也要警惕鲁莽。"
  },
  {
    id: 34,
    name: "Queen of Wands",
    nameCN: "权杖皇后",
    type: "minor",
    suit: "wands",
    number: 13,
    keywords: ["自信", "温暖", "决心"],
    upright: ["自信", "温暖", "决心", "社交"],
    reversed: ["自私", "嫉妒", "缺乏信心"],
    description: "权杖皇后代表着自信、温暖和对他人的鼓励。"
  },
  {
    id: 35,
    name: "King of Wands",
    nameCN: "权杖国王",
    type: "minor",
    suit: "wands",
    number: 14,
    keywords: ["领导", "愿景", "企业家精神"],
    upright: ["自然领袖", "愿景", "企业家", "荣誉"],
    reversed: ["专横", "鲁莽", "缺乏自制"],
    description: "权杖国王象征着天生的领导能力和创业精神。"
  },

  // 圣杯组合 (Cups) - 水元素
  {
    id: 36,
    name: "Ace of Cups",
    nameCN: "圣杯王牌",
    type: "minor",
    suit: "cups",
    number: 1,
    keywords: ["爱", "情感", "直觉"],
    upright: ["爱", "新关系", "同情心", "创造力"],
    reversed: ["情感阻塞", "失去信仰", "空虚"],
    description: "圣杯王牌代表着爱情和情感的新开始。"
  },
  {
    id: 37,
    name: "Two of Cups",
    nameCN: "圣杯二",
    type: "minor",
    suit: "cups",
    number: 2,
    keywords: ["伙伴关系", "爱情", "统一"],
    upright: ["统一关系", "伙伴关系", "互相吸引"],
    reversed: ["不平衡关系", "分裂", "不和"],
    description: "圣杯二象征着两人之间的深度连接和相互理解。"
  },
  {
    id: 38,
    name: "Three of Cups",
    nameCN: "圣杯三",
    type: "minor",
    suit: "cups",
    number: 3,
    keywords: ["友谊", "庆祝", "创造力"],
    upright: ["友谊", "庆祝", "创造力", "合作"],
    reversed: ["孤立", "独处", "内向"],
    description: "圣杯三代表着友谊和集体庆祝的快乐时光。"
  }
  // 注：为了保持代码简洁，这里只列出了部分牌组，实际应用中会包含完整的78张牌
];