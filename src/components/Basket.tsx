import React from "react";
import { Category } from "../types";

type Props = {
  category: Category;
  onDrop: (categoryId: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  highlight: boolean;
  className?: string;
  "data-category-id"?: number;
  style?: React.CSSProperties;
};

// 购物篮SVG图标 - 去掉四方形边框
const ShoppingBasketIcon = ({ color = "#333" }: { color?: string }) => (
  <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M38 10C38 9 37.2 8 36 8H28V4C28 1.8 26.2 0 24 0H16C13.8 0 12 1.8 12 4V8H4C2.8 8 2 9 2 10L0 26C0 28.2 1.8 30 4 30H36C38.2 30 40 28.2 40 26L38 10ZM16 4H24V8H16V4ZM4 26L6 10H12V14C12 15.1 12.9 16 14 16C15.1 16 16 15.1 16 14V10H24V14C24 15.1 24.9 16 26 16C27.1 16 28 15.1 28 14V10H34L36 26H4Z" fill={color}/>
  </svg>
);

const Basket: React.FC<Props> = ({ 
  category, 
  onDrop, 
  onDragOver, 
  highlight,
  className,
  "data-category-id": dataCategoryId,
  style
}) => (
  <div
    className={`basket ${className || ''}`}
    data-category-id={dataCategoryId || category.id}
    onDrop={e => {
      e.preventDefault();
      onDrop(category.id);
    }}
    onDragOver={e => {
      e.preventDefault();
      onDragOver(e);
    }}
    style={{
      width: "calc(18% - 4px)", // 减小宽度百分比
      minWidth: 60, // 减小最小宽度
      minHeight: 70, // 减小高度
      margin: 2, // 减小外边距
      borderRadius: 12,
      background: highlight ? "rgba(230, 247, 255, 0.5)" : "transparent",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 28, // 减小字体大小
      transition: "all 0.2s",
      padding: 2, // 减小内边距
      boxShadow: highlight ? "0 0 12px rgba(24, 144, 255, 0.5)" : "none",
      position: "relative",
      ...style // 合并传入的样式
    }}
  >
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      marginBottom: 4 // 减小底部边距
    }}>
      <ShoppingBasketIcon color={highlight ? "#1890ff" : "#666"} />
      <div style={{ 
        position: "absolute", 
        top: "40%", 
        left: "50%", 
        transform: "translate(-50%, -50%)",
        fontSize: 24,
        color: highlight ? "#1890ff" : "#666"
      }}>
        {category.icon}
      </div>
    </div>
    <span style={{ 
      fontSize: 14, 
      textAlign: "center", 
      fontWeight: "bold",
      color: highlight ? "#1890ff" : "#333"
    }}>
      {category.name}
    </span>
  </div>
);

export default Basket;