import React, { useEffect, useRef, useState } from "react";
import { categories, generateGoods } from "../utils";
import { Goods, SortRecord } from "../types";
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

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const goodsTimeMap = useRef<Record<string, number>>({});

  // 初始化
  const startGame = () => {
    const goods = generateGoods();
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

  useEffect(() => {
    startGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line
  }, []);

  // 拖拽开始
  const handleDragStart = (goods: Goods) => {
    setDragging(goods);
    goodsTimeMap.current[goods.id] = Date.now();
  };

  // 拖拽到篮子
  const handleDrop = (categoryId: number) => {
    if (!dragging) return;
    if (dragging.categoryId === categoryId) {
      // 正确
      setShelfGoods(list => list.filter(g => g.id !== dragging.id));
      setCorrect(c => c + 1);
      setScore(s => Math.min(s + 2, MAX_SCORE));
      setRecords(rs => [
        ...rs,
        {
          goodsId: dragging.id,
          correct: true,
          time: (Date.now() - (goodsTimeMap.current[dragging.id] || Date.now()))
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
          goodsId: dragging.id,
          correct: false,
          time: (Date.now() - (goodsTimeMap.current[dragging.id] || Date.now()))
        }
      ]);
    }
    setDragging(null);
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
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 8 }}>
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
          minHeight: 160,
          background: "#f5f5f5",
          borderRadius: 12,
          padding: 8,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginBottom: 16
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
              draggable={true}
            />
          ))
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end"
        }}
      >
        {categories.map(cat => (
          <Basket
            key={cat.id}
            category={cat}
            onDrop={handleDrop}
            onDragOver={() => handleDragOver(cat.id)}
            highlight={highlightId === cat.id}
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
        onClose={() => setModalOpen(false)}
        finished={finished}
      />
    </div>
  );
};

export default Game; 