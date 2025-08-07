import { Category, Goods } from "./types";

// 7类商品
export const categories: Category[] = [
  { id: 1, name: "水果", icon: "🍎" },
  { id: 2, name: "肉类", icon: "🥩" },
  { id: 3, name: "蔬菜", icon: "🥦" },
  { id: 4, name: "饮料", icon: "🥤" },
  { id: 5, name: "零食", icon: "🍪" },
  { id: 6, name: "海鲜", icon: "🦐" },
  { id: 7, name: "糕点", icon: "🍰" }
];

// 每类商品的icon和名称库
const goodsData: Record<number, { name: string; icon: string }[]> = {
  1: [
    { name: "苹果", icon: "🍎" },
    { name: "梨", icon: "🍐" },
    { name: "香蕉", icon: "🍌" },
    { name: "葡萄", icon: "🍇" },
    { name: "西瓜", icon: "🍉" },
    { name: "橙子", icon: "🍊" },
    { name: "草莓", icon: "🍓" },
    { name: "桃子", icon: "🍑" }
  ],
  2: [
    { name: "猪肉", icon: "🥩" },
    { name: "牛肉", icon: "🥩" },
    { name: "鸡腿", icon: "🍗" },
    { name: "羊肉", icon: "🥩" },
    { name: "火腿", icon: "🍖" },
    { name: "香肠", icon: "🍖" }
  ],
  3: [
    { name: "西红柿", icon: "🍅" },
    { name: "黄瓜", icon: "🥒" },
    { name: "胡萝卜", icon: "🥕" },
    { name: "土豆", icon: "🥔" },
    { name: "茄子", icon: "🍆" },
    { name: "青椒", icon: "🫑" },
    { name: "洋葱", icon: "🧅" },
    { name: "大蒜", icon: "🧄" }
  ],
  4: [
    { name: "可乐", icon: "🥤" },
    { name: "牛奶", icon: "🥛" },
    { name: "果汁", icon: "🧃" },
    { name: "茶", icon: "🍵" },
    { name: "咖啡", icon: "☕" },
    { name: "啤酒", icon: "🍺" }
  ],
  5: [
    { name: "薯片", icon: "🥠" },
    { name: "薯条", icon: "🍟" },
    { name: "巧克力", icon: "🍫" },
    { name: "爆米花", icon: "🍿" },
    { name: "坚果", icon: "🥜" },
    { name: "棒棒糖", icon: "🍭" }
  ],
  6: [
    { name: "虾", icon: "🦐" },
    { name: "鱼", icon: "🐟" },
    { name: "蟹", icon: "🦀" },
    { name: "贝类", icon: "🦪" },
    { name: "章鱼", icon: "🐙" },
    { name: "龙虾", icon: "🦞" }
  ],
  7: [
    { name: "蛋糕", icon: "🍰" },
    { name: "甜甜圈", icon: "🍩" },
    { name: "华夫饼", icon: "🧇" },
    { name: "泡芙", icon: "🧁" },
    { name: "面包", icon: "🍞" },
    { name: "蛋挞", icon: "🥧" }
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

// 随机选择5个分类，每类随机分配商品，总共约20个商品
export function generateGoods(): Goods[] {
  const goods: Goods[] = [];
  
  // 随机选择5个分类
  const shuffledCategories = shuffle([...categories]);
  const selectedCategories = shuffledCategories.slice(0, 5);
  
  // 计算每个分类平均应该有多少商品
  const totalGoods = 20;
  const avgGoodsPerCategory = Math.floor(totalGoods / selectedCategories.length);
  
  // 随机分配商品数量，确保总数约为20个
  let remainingGoods = totalGoods;
  const goodsCountPerCategory = selectedCategories.map((_, index) => {
    // 最后一个分类获取所有剩余的商品数
    if (index === selectedCategories.length - 1) {
      return remainingGoods;
    }
    
    // 随机分配商品数量，但确保每个分类至少有2个商品
    const min = 2;
    const max = Math.min(6, remainingGoods - (selectedCategories.length - index - 1) * min);
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    
    remainingGoods -= count;
    return count;
  });
  
  // 为每个分类生成商品
  selectedCategories.forEach((cat, index) => {
    // 确保每次都重新洗牌，增加随机性
    const items = shuffle(goodsData[cat.id]);
    // 该分类需要的商品数量
    const goodsCount = goodsCountPerCategory[index];
    
    // 每类选择不重复的商品
    const selectedItems = [];
    const usedIndices = new Set();
    
    // 确保选择不重复的商品
    while (selectedItems.length < goodsCount && usedIndices.size < items.length) {
      const randomIndex = Math.floor(Math.random() * items.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        selectedItems.push(items[randomIndex]);
      }
    }
    
    // 如果商品种类不足，则用已有的填充
    while (selectedItems.length < goodsCount) {
      selectedItems.push(items[selectedItems.length % items.length]);
    }
    
    // 将选中的商品添加到商品列表
    selectedItems.forEach((item, i) => {
      goods.push({
        id: `${cat.id}-${i}-${Math.random().toString(36).slice(2, 6)}`,
        name: item.name,
        categoryId: cat.id,
        icon: item.icon
      });
    });
  });
  
  return shuffle(goods);
}