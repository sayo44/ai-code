import React from "react";

type Props = {
  open: boolean;
  score: number;
  correct: number;
  wrong: number;
  avgTime: number;
  accuracy: number;
  onRestart: () => void;
  onClose: () => void;
  finished: boolean;
};

function getAssessment(score: number, accuracy: number, avgTime: number) {
  if (score === 10 && accuracy >= 0.9 && avgTime < 2) {
    return {
      level: "优秀",
      suggestion: "认知水平优秀，继续保持！"
    };
  }
  if (score >= 8 && accuracy >= 0.8) {
    return {
      level: "良好",
      suggestion: "表现良好，可通过多练习进一步提升反应速度和准确率。"
    };
  }
  if (score >= 6 && accuracy >= 0.6) {
    return {
      level: "一般",
      suggestion: "建议加强专注力训练，提升反应速度。"
    };
  }
  return {
    level: "需提升",
    suggestion: "建议多做分类练习，提升认知反应能力。"
  };
}

const ResultModal: React.FC<Props> = ({
  open,
  score,
  correct,
  wrong,
  avgTime,
  accuracy,
  onRestart,
  onClose,
  finished
}) => {
  if (!open) return null;
  const { level, suggestion } = getAssessment(score, accuracy, avgTime);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          minWidth: 300,
          textAlign: "center"
        }}
      >
        <h2>{finished ? "游戏完成" : "游戏结束"}</h2>
        <div style={{ margin: "16px 0" }}>
          <div>得分：{score} / 10</div>
          <div>分类正确数：{correct}</div>
          <div>分类错误数：{wrong}</div>
          <div>平均反应时间：{avgTime.toFixed(2)} 秒</div>
          <div>分类正确率：{(accuracy * 100).toFixed(1)}%</div>
          <div>认知水平评估：<b>{level}</b></div>
          <div style={{ color: "#888", marginTop: 8 }}>{suggestion}</div>
        </div>
        <button onClick={onRestart} style={{ marginRight: 16 }}>再玩一次</button>
        <button onClick={onClose}>关闭</button>
      </div>
    </div>
  );
};

export default ResultModal; 