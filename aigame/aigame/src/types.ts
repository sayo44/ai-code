export type Category = {
  id: number;
  name: string;
  icon: string;
};

export type Goods = {
  id: string;
  name: string;
  categoryId: number;
  icon: string;
};

export type SortRecord = {
  goodsId: string;
  correct: boolean;
  time: number; // ms
}; 