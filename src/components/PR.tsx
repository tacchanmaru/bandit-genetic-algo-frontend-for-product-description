import * as React from "react";
import { Button } from "@mui/material";
import "./SplatoonResultBar.css";

type Props = {
  endExperiment: () => void;
};

const PR: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          position: "fixed",
          top: "60px",
        }}
      >
        <div
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            margin: "24px",
            textAlign: "center",
          }}
        >
          実はこのフリマアプリ、未来じゃないんです。
        </div>
        <img src="mercari_ai.png" alt="mercari_ai" style={{ width: "70%" }} />
        <p
          style={{
            margin: "8px",
          }}
        >
          メルカリには、「AI出品サポート」の機能があります。
          <br />
          写真を撮ってカテゴリーを選ぶだけで商品情報が作成され、最短3タップで出品が完了します。
          <br />
          詳細は、以下のリンクをご参照ください。
          <br />
          <a href="https://about.mercari.com/press/news/articles/20240910_aisupport/">
            https://about.mercari.com/press/news/articles/20240910_aisupport/
          </a>
        </p>
        <Button
          variant="contained"
          color="primary"
          className=""
          onClick={() => {
            props.endExperiment();
          }}
          style={{
            margin: "8px",
            backgroundColor: "#ff333f",
            color: "white",
          }}
        >
          体験を終了する
        </Button>
      </div>
    </div>
  );
};
export default PR;
