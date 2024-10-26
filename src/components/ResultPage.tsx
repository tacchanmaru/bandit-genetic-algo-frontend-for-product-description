import { useState, useEffect } from "react";
import "./SplatoonResultBar.css";

type Props = {
  score: number;
  selectedItem: number;
  taskID: number;
};

const SplatoonResultBar: React.FC<Props> = (props) => {
  const [leftPercent, setLeftPercent] = useState(0);
  const [rightPercent, setRightPercent] = useState(0);

  // 実際の割合
  const finalLeftPercent = 50; // パープルのバーのパーセンテージ
  const finalRightPercent = 50; // イエローのバーのパーセンテージ

  // アニメーションを追加
  useEffect(() => {
    const leftInterval = setInterval(() => {
      setLeftPercent((prev) => {
        if (prev < finalLeftPercent) return prev + 1;
        clearInterval(leftInterval);
        return finalLeftPercent;
      });
    }, 20); // 20msごとに1%ずつ増加

    const rightInterval = setInterval(() => {
      setRightPercent((prev) => {
        if (prev < finalRightPercent) return prev + 1;
        clearInterval(rightInterval);
        return finalRightPercent;
      });
    }, 20);

    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, []);

  return (
    <div
      className="result-container"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div
          className="result-title"
          style={{ color: props.selectedItem == 4 ? "purple" : "green" }}
        >
          あなたが選んだ商品説明文は、
          <br />
          {props.selectedItem == 1
            ? "全て人間が書いた"
            : props.selectedItem == 2
            ? "人間がAIのサポートを受けて書いた"
            : props.selectedItem == 3
            ? "AIが書いた文章を人間が修正した"
            : "全てAIが書いた"}
          文章でした！
        </div>
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "80px",
            color: "black",
          }}
        >
          これまでの参加者の結果
        </p>
        <div className="result-bar">
          <div className="bar left" style={{ width: `${leftPercent}%` }}>
            <span className="percent-text">{leftPercent}%</span>
          </div>
          <div className="bar right" style={{ width: `${rightPercent}%` }}>
            <span className="percent-text">{rightPercent}%</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "purple", fontWeight: "bold" }}>
            全てAIが書いた文章
          </p>
          <p style={{ color: "green", fontWeight: "bold" }}>
            {props.taskID == 1
              ? "全て人間が書いた文章"
              : props.taskID == 2
              ? "人間がAIのサポートを受けて書いた文章"
              : "AIが書いた文章を人間が修正した文章"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplatoonResultBar;
