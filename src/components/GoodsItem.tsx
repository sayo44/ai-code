import React, { TouchEvent } from "react";
import { Goods } from "../types";

type Props = {
  goods: Goods;
  onDragStart: (goods: Goods) => void;
  draggable: boolean;
  onTouchStart?: (goods: Goods, e: TouchEvent) => void;
  onTouchMove?: (e: TouchEvent) => void;
  onTouchEnd?: (e: TouchEvent) => void;
};

const GoodsItem: React.FC<Props> = ({ 
  goods, 
  onDragStart, 
  draggable,
  onTouchStart,
  onTouchMove,
  onTouchEnd
}) => {
  // 处理触摸开始事件，增加灵敏度
  const handleTouchStart = (e: TouchEvent) => {
    if (!onTouchStart) return;
    
    // 阻止默认行为，防止滚动和缩放
    e.preventDefault();
    
    // 调用父组件的触摸开始处理函数
    onTouchStart(goods, e);
    
    // 添加触摸反馈
    const element = e.currentTarget as HTMLDivElement;
    element.style.transform = "scale(1.05)";
    element.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  };
  
  // 处理触摸移动事件，增加灵敏度
  const handleTouchMove = (e: TouchEvent) => {
    if (!onTouchMove) return;
    
    // 阻止默认行为，防止滚动和缩放
    e.preventDefault();
    
    // 调用父组件的触摸移动处理函数
    onTouchMove(e);
  };
  
  // 处理触摸结束事件，增加灵敏度
  const handleTouchEnd = (e: TouchEvent) => {
    if (!onTouchEnd) return;
    
    // 阻止默认行为，防止滚动和缩放
    e.preventDefault();
    
    // 调用父组件的触摸结束处理函数
    onTouchEnd(e);
    
    // 恢复原始样式
    const element = e.currentTarget as HTMLDivElement;
    element.style.transform = "scale(1)";
    element.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  };

  return (
    <div
      className="goods-item"
      draggable={draggable}
      onDragStart={e => {
        onDragStart(goods);
        e.dataTransfer.setData("goodsId", goods.id);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        opacity: draggable ? 1 : 0.5,
        fontSize: 32,
        textAlign: "center",
        margin: 4,
        border: "1px solid #eee",
        borderRadius: 8,
        background: "#fff",
        cursor: draggable ? "grab" : "not-allowed",
        width: 70, // 增加宽度，便于触摸
        height: 70, // 增加高度，便于触摸
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        touchAction: "none",
        userSelect: "none",
        transition: "transform 0.1s, box-shadow 0.1s", // 添加过渡效果
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "relative", // 添加相对定位，便于拖拽
        zIndex: 1 // 确保在拖拽时显示在上层
      }}
    >
      <span>{goods.icon}</span>
      <span style={{ fontSize: 12 }}>{goods.name}</span>
    </div>
  );
};

export default GoodsItem;