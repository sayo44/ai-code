import React, { useEffect, useRef, useState, TouchEvent } from "react";
import { categories, generateGoods, shuffle } from "../utils";
import { Goods, SortRecord, Category } from "../types";
import GoodsItem from "./GoodsItem";
import Basket from "./Basket";
import ResultModal from "./ResultModal";

const MAX_SCORE = 10;
const MAX_TIME = 60; // 秒

const Game: React.FC = () => {
  const [goodsList, setGoodsList] = useState<Goods[]>([]);
  const [shelfGoods, setShelfGoods] = useState<Goods[]>([]);
  const [dragging, setDragging] = useState<Goods | null>(null);
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [score, setScore] = useState(0);
  const [records, setRecords] = useState<SortRecord[]>([]);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [modalOpen, setModalOpen] = useState(false);
  const [finished, setFinished] = useState(false);
  // 添加当前游戏使用的分类状态，初始化为空数组
  const [activeCategories, setActiveCategories] = useState<Category[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const goodsTimeMap = useRef<Record<string, number>>({});
  
  // 用于跟踪拖动的商品元素
  const draggedItemRef = useRef<HTMLElement | null>(null);
  // 用于跟踪触摸位置偏移
  const touchOffsetRef = useRef<{x: number, y: number}>({x: 0, y: 0});
  // 用于创建虚拟拖动元素
  const ghostElementRef = useRef<HTMLDivElement | null>(null);

  // 初始化
  const startGame = () => {
    // 生成商品，这会从7个分类中随机选择5个
    const goods = generateGoods();
    
    // 从生成的商品中提取实际使用的分类ID
    const usedCategoryIds = new Set(goods.map(g => g.categoryId));
    
    // 根据实际使用的分类ID筛选出对应的分类对象
    const usedCategories = categories.filter(cat => usedCategoryIds.has(cat.id));
    
    console.log("游戏使用的分类:", usedCategories.map(c => c.name).join(", "));
    
    // 设置当前游戏使用的分类
    setActiveCategories(usedCategories);
    
    setGoodsList(goods);
    setShelfGoods(goods);
    setDragging(null);
    setHighlightId(null);
    setCorrect(0);
    setWrong(0);
    setScore(0);
    setRecords([]);
    setTimeLeft(MAX_TIME);
    setModalOpen(false);
    setFinished(false);
    startTimeRef.current = Date.now();
    goodsTimeMap.current = {};
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setModalOpen(true);
          setFinished(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };
  
  // 结束游戏
  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setModalOpen(false);
    setFinished(true);
    setTimeLeft(0);
    // 清空商品列表，表示游戏已结束
    setShelfGoods([]);
  };

  useEffect(() => {
    // 初始化游戏
    startGame();
    
    // 添加全局触摸事件监听器，防止页面滚动
    const preventScroll = (e: TouchEvent) => {
      if (touchedGoods) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchmove', preventScroll as any, { passive: false });
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      document.removeEventListener('touchmove', preventScroll as any);
      
      // 清理虚拟拖动元素
      if (ghostElementRef.current && ghostElementRef.current.parentNode) {
        ghostElementRef.current.parentNode.removeChild(ghostElementRef.current);
      }
    };
    // eslint-disable-next-line
  }, []);

  // 触摸相关状态
  const [touchStartPos, setTouchStartPos] = useState<{x: number, y: number} | null>(null);
  const [touchedGoods, setTouchedGoods] = useState<Goods | null>(null);
  
  // 拖拽开始
  const handleDragStart = (goods: Goods) => {
    setDragging(goods);
    goodsTimeMap.current[goods.id] = Date.now();
  };
  
  // 创建虚拟拖动元素
  const createGhostElement = (goods: Goods, x: number, y: number) => {
    // 移除旧的虚拟元素
    if (ghostElementRef.current && ghostElementRef.current.parentNode) {
      ghostElementRef.current.parentNode.removeChild(ghostElementRef.current);
    }
    
    // 创建新的虚拟元素
    const ghost = document.createElement('div');
    ghost.className = 'drag-ghost';
    ghost.style.position = 'absolute';
    ghost.style.left = `${x - 35}px`; // 居中显示
    ghost.style.top = `${y - 35}px`;  // 居中显示
    ghost.style.width = '70px';
    ghost.style.height = '70px';
    ghost.style.backgroundColor = 'white';
    ghost.style.borderRadius = '8px';
    ghost.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    ghost.style.display = 'flex';
    ghost.style.flexDirection = 'column';
    ghost.style.alignItems = 'center';
    ghost.style.justifyContent = 'center';
    ghost.style.zIndex = '1000';
    ghost.style.pointerEvents = 'none'; // 防止干扰触摸事件
    ghost.style.opacity = '0.9';
    ghost.style.fontSize = '32px';
    
    // 添加商品图标和名称
    const iconSpan = document.createElement('span');
    iconSpan.textContent = goods.icon;
    ghost.appendChild(iconSpan);
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = goods.name;
    nameSpan.style.fontSize = '12px';
    ghost.appendChild(nameSpan);
    
    // 添加到文档中
    document.body.appendChild(ghost);
    ghostElementRef.current = ghost;
  };
  
  // 更新虚拟拖动元素位置
  const updateGhostPosition = (x: number, y: number) => {
    if (ghostElementRef.current) {
      ghostElementRef.current.style.left = `${x - 35}px`; // 居中显示
      ghostElementRef.current.style.top = `${y - 35}px`;  // 居中显示
    }
  };
  
  // 移除虚拟拖动元素
  const removeGhostElement = () => {
    if (ghostElementRef.current && ghostElementRef.current.parentNode) {
      ghostElementRef.current.parentNode.removeChild(ghostElementRef.current);
      ghostElementRef.current = null;
    }
  };
  
  // 触摸开始
  const handleTouchStart = (goods: Goods, e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    
    // 记录触摸起始位置
    setTouchStartPos({x: touch.clientX, y: touch.clientY});
    setTouchedGoods(goods);
    goodsTimeMap.current[goods.id] = Date.now();
    
    // 记录被拖动的元素
    draggedItemRef.current = e.currentTarget as HTMLElement;
    
    // 计算触摸点相对于元素的偏移
    const rect = draggedItemRef.current.getBoundingClientRect();
    touchOffsetRef.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
    
    // 创建虚拟拖动元素
    createGhostElement(goods, touch.clientX, touch.clientY);
    
    // 添加视觉反馈
    draggedItemRef.current.style.opacity = '0.5';
  };
  
  // 触摸移动
  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!touchedGoods || !touchStartPos) return;
    
    const touch = e.touches[0];
    
    // 更新虚拟拖动元素位置
    updateGhostPosition(touch.clientX, touch.clientY);
    
    // 检查是否移动到了某个篮子上
    const baskets = document.querySelectorAll('.basket');
    let foundBasket = false;
    
    baskets.forEach((basket) => {
      const rect = basket.getBoundingClientRect();
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        const categoryId = parseInt(basket.getAttribute('data-category-id') || '0');
        setHighlightId(categoryId);
        foundBasket = true;
        
        // 添加视觉反馈
        (basket as HTMLElement).style.transform = 'scale(1.05)';
        (basket as HTMLElement).style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
      } else {
        // 恢复正常样式
        (basket as HTMLElement).style.transform = 'scale(1)';
        (basket as HTMLElement).style.boxShadow = '';
      }
    });
    
    if (!foundBasket) {
      setHighlightId(null);
    }
  };
  
  // 触摸结束
  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    if (!touchedGoods || !touchStartPos) return;
    
    const touch = e.changedTouches[0];
    
    // 移除虚拟拖动元素
    removeGhostElement();
    
    // 恢复被拖动元素的样式
    if (draggedItemRef.current) {
      draggedItemRef.current.style.opacity = '1';
    }
    
    // 检查是否在某个篮子上释放
    const baskets = document.querySelectorAll('.basket');
    let dropCategoryId: number | null = null;
    
    baskets.forEach((basket) => {
      const rect = basket.getBoundingClientRect();
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        dropCategoryId = parseInt(basket.getAttribute('data-category-id') || '0');
      }
      
      // 恢复所有篮子的正常样式
      (basket as HTMLElement).style.transform = 'scale(1)';
      (basket as HTMLElement).style.boxShadow = '';
    });
    
    if (dropCategoryId !== null) {
      handleDrop(dropCategoryId);
    }
    
    setTouchStartPos(null);
    setTouchedGoods(null);
    setHighlightId(null);
    draggedItemRef.current = null;
  };

  // 拖拽到篮子
  const handleDrop = (categoryId: number) => {
    const currentGoods = touchedGoods || dragging;
    if (!currentGoods) return;
    
    if (currentGoods.categoryId === categoryId) {
      // 正确
      setShelfGoods(list => list.filter(g => g.id !== currentGoods.id));
      setCorrect(c => c + 1);
      setScore(s => Math.min(s + 2, MAX_SCORE));
      setRecords(rs => [
        ...rs,
        {
          goodsId: currentGoods.id,
          correct: true,
          time: (Date.now() - (goodsTimeMap.current[currentGoods.id] || Date.now()))
        }
      ]);
      // 检查是否全部分拣完
      if (shelfGoods.length - 1 === 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeout(() => {
          setModalOpen(true);
          setFinished(true);
        }, 500);
      }
    } else {
      // 错误
      setWrong(w => w + 1);
      setRecords(rs => [
        ...rs,
        {
          goodsId: currentGoods.id,
          correct: false,
          time: (Date.now() - (goodsTimeMap.current[currentGoods.id] || Date.now()))
        }
      ]);
    }
    setDragging(null);
    setTouchedGoods(null);
    setHighlightId(null);
  };

  // 拖拽经过篮子
  const handleDragOver = (categoryId: number) => {
    setHighlightId(categoryId);
  };

  // 统计
  const avgTime =
    records.filter(r => r.correct).length > 0
      ? records
          .filter(r => r.correct)
          .reduce((a, b) => a + b.time, 0) /
        records.filter(r => r.correct).length /
        1000
      : 0;
  const accuracy =
    records.length > 0
      ? records.filter(r => r.correct).length / records.length
      : 0;

  return (
    <div style={{ 
      maxWidth: "100%", 
      width: "100%", 
      margin: "0 auto", 
      padding: 8,
      paddingBottom: 200, // 大幅增加底部padding，确保最后一行购物篮不被遮挡
      boxSizing: "border-box",
      touchAction: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      position: "relative", // 添加相对定位
      minHeight: "100vh" // 确保至少有视口高度
    }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8
        }}
      >
        <div>倒计时：<b>{timeLeft}s</b></div>
        <div>得分：<b>{score}</b></div>
        <div>
          正确：<b>{correct}</b> / 错误：<b>{wrong}</b>
        </div>
      </div>
      <div
        style={{
          minHeight: 120, // 进一步减小最小高度
          background: "#f5f5f5",
          borderRadius: 12,
          padding: "6px 12px", // 调整内边距，左右等宽
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between", // 改为两端对齐，使商品分布更均匀
          alignItems: "flex-start",
          marginBottom: 200, // 增加底部边距，为购物篮留出空间
          overflowY: "visible", // 改为visible，避免滚动
          maxHeight: "none" // 移除最大高度限制
        }}
      >
        {shelfGoods.length === 0 ? (
          <div style={{ width: "100%", textAlign: "center", color: "#888" }}>
            商品已分拣完毕！
          </div>
        ) : (
          shelfGoods.map(goods => (
            <GoodsItem
              key={goods.id}
              goods={goods}
              onDragStart={handleDragStart}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              draggable={true}
            />
          ))
        )}
      </div>
      
      {/* 购物篮容器 - 使用固定定位，确保始终在视口底部可见 */}
      <div
        style={{
          position: "fixed", // 改为固定定位
          bottom: 0, // 固定在底部
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between", // 改为两端对齐，减少间距
          alignItems: "center",
          flexWrap: "nowrap", // 不换行
          padding: "10px 10px 30px 10px", // 增加左右内边距，确保不会贴边
          backgroundColor: "rgba(255, 255, 255, 0.95)", // 添加半透明背景
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)", // 添加顶部阴影
          zIndex: 100, // 确保在最上层
          borderTopLeftRadius: 15, // 添加圆角
          borderTopRightRadius: 15,
          maxHeight: "120px" // 限制最大高度
        }}
      >
        {/* 只显示当前游戏中使用的分类 */}
        {activeCategories.map(cat => (
          <Basket
            key={cat.id}
            category={cat}
            onDrop={handleDrop}
            onDragOver={() => handleDragOver(cat.id)}
            highlight={highlightId === cat.id}
            className="basket"
            data-category-id={cat.id}
            style={{ transform: 'scale(0.9)' }} // 缩小购物篮尺寸
          />
        ))}
      </div>
      
      <ResultModal
        open={modalOpen}
        score={score}
        correct={correct}
        wrong={wrong}
        avgTime={avgTime}
        accuracy={accuracy}
        onRestart={startGame}
        onClose={endGame}
        finished={finished}
      />
    </div>
  );
};

export default Game;