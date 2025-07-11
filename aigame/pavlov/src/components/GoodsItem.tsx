import React from "react";
import { Goods } from "../types";

type Props = {
  goods: Goods;
  onDragStart: (goods: Goods) => void;
  draggable: boolean;
};

const GoodsItem: React.FC<Props> = ({ goods, onDragStart, draggable }) => (
  <div
    className="goods-item"
    draggable={draggable}
    onDragStart={e => {
      onDragStart(goods);
      e.dataTransfer.setData("goodsId", goods.id);
    }}
    style={{
      opacity: draggable ? 1 : 0.5,
      fontSize: 32,
      textAlign: "center",
      margin: 4,
      border: "1px solid #eee",
      borderRadius: 8,
      background: "#fff",
      cursor: draggable ? "grab" : "not-allowed",
      width: 60,
      height: 60,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <span>{goods.icon}</span>
    <span style={{ fontSize: 12 }}>{goods.name}</span>
  </div>
);

export default GoodsItem; 