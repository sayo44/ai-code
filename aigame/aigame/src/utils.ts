import { Category, Goods } from "./types";

// 5类商品
export const categories: Category[] = [
  { id: 1, name: "水果", icon: "🍎" },
  { id: 2, name: "肉类", icon: "🥩" },
  { id: 3, name: "蔬菜", icon: "🥦" },
  { id: 4, name: "饮料", icon: "🥤" },
  { id: 5, name: "零食", icon: "🍪" }
];

// 每类商品的icon和名称库
const goodsData: Record<number, { name: string; icon: string }[]> = {
  1: [
    { name: "苹果", icon: "🍎" },
    { name: "梨", icon: "🍐" },
    { name: "香蕉", icon: "🍌" },
    { name: "葡萄", icon: "🍇" }
  ],
  2: [
    { name: "猪肉", icon: "🥩" },
    { name: "牛肉", icon: "🥩" },
    { name: "鸡腿", icon: "🍗" },
    { name: "虾", icon: "🍤" }
  ],
  3: [
    { name: "西红柿", icon: "🍅" },
    { name: "黄瓜", icon: "🥒" },
    { name: "胡萝卜", icon: "🥕" },
    { name: "土豆", icon: "🥔" }
  ],
  4: [
    { name: "可乐", icon: "🥤" },
    { name: "牛奶", icon: "🥛" },
    { name: "果汁", icon: "🧃" },
    { name: "茶", icon: "🍵" }
  ],
  5: [
    { name: "饼干", icon: "🍪" },
    { name: "薯条", icon: "🍟" },
    { name: "巧克力", icon: "🍫" },
    { name: "蛋糕", icon: "🍰" }
  ]
};

// 洗牌
export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 生成20个商品，5类，每类4个，顺序打乱
export function generateGoods(): Goods[] {
  const goods: Goods[] = [];
  categories.forEach(cat => {
    const items = shuffle(goodsData[cat.id]);
    for (let i = 0; i < 4; i++) {
      const item = items[i % items.length];
      goods.push({
        id: `${cat.id}-${i}-${Math.random().toString(36).slice(2, 6)}`,
        name: item.name,
        categoryId: cat.id,
        icon: item.icon
      });
    }
  });
  return shuffle(goods);
} 