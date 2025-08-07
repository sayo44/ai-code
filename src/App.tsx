import React from "react";
import Game from "./components/Game";

const App: React.FC = () => (
  <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>
    <h1 style={{ textAlign: "center", margin: 0, padding: 16, fontSize: 24 }}>
      超市分拣员
    </h1>
    <Game />
  </div>
);

export default App; 