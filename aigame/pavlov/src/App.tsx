import React from "react";
import Game from "./components/Game";

const App: React.FC = () => (
  <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>
    <h1 style={{ textAlign: "center", margin: 0, padding: 16, fontSize: 24 }}>
      超市分拣认知小游戏
    </h1>
    <Game />
    <div style={{ textAlign: "center", color: "#888", marginTop: 24, fontSize: 12 }}>
      © 2024 巴浦洛夫认知小游戏
    </div>
  </div>
);

export default App; 