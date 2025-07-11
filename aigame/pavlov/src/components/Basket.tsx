import React from "react";
import { Category } from "../types";

type Props = {
  category: Category;
  onDrop: (categoryId: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  highlight: boolean;
};

const Basket: React.FC<Props> = ({ category, onDrop, onDragOver, highlight }) => (
  <div
    className="basket"
    onDrop={e => {
      e.preventDefault();
      onDrop(category.id);
    }}
    onDragOver={e => {
      e.preventDefault();
      onDragOver(e);
    }}
    style={{
      minWidth: 80,
      minHeight: 80,
      margin: 8,
      border: highlight ? "2px solid #1890ff" : "2px dashed #bbb",
      borderRadius: 12,
      background: highlight ? "#e6f7ff" : "#fafafa",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 32,
      transition: "all 0.2s"
    }}
  >
    <span>{category.icon}</span>
    <span style={{ fontSize: 14 }}>{category.name}</span>
  </div>
);

export default Basket; 