import React from "react";
import Button from "@mui/material/Button";

type Props = {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

const Explanation: React.FC<Props> = (props) => {
  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h1>パートAであなたにしていただきたいこと【重要!】</h1>

      <p style={{ fontSize: "24px" }}>
        この研究は、さまざまなフォントを用いて提示される文章に対する第一印象を調べるものです。
        そのため
        <u>
          <b>直感に従って</b>
        </u>
        判断を行ってください。
      </p>
      <p style={{ fontSize: "24px" }}>
        あなたは
        <u>
          <b>フリマアプリで商品を購入したい</b>
        </u>
        と思っています。
        <u>
          <b>商品説明文を読んで、購入したい商品を選んでください。</b>
        </u>
      </p>
      <p>
        <br />
        回答を選択すると、画面下の「回答を送信して次に進む」ボタンを押せるようになります。ボタンを押して、次の質問に進んでください。設問は全部で28問あります。
      </p>
      <div>
        <p>
          上記の内容をしっかりと読んでください。確かに理解できたと思ったら、以下のボタンをクリックしてください。
        </p>
      </div>
      <div style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          className=""
          onClick={() => props.setPageNumber(props.pageNumber + 1)}
        >
          次に進む
        </Button>
      </div>
    </div>
  );
};

export default Explanation;
