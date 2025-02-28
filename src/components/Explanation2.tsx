import React, { useState } from "react";
import Button from "@mui/material/Button";
import ValueInput from "./ValueInput";

type Props = {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

const Explanation: React.FC<Props> = (props) => {
  const [selectedValue, setSelectedValue] = useState<number>(0);
  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h1>パートBであなたにしていただきたいこと【重要!】</h1>
      {/* <p>以上でパートAの28問は終了です。次はパートBに回答していただきます。</p> */}

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
        <br />
        フォントに着目をして商品説明文を読み、
        <u>
          <b>この商品の出品者はどのぐらい信頼できる人物だと思うか</b>
        </u>
        について、選択肢（９段階）の中から１つ、できるだけ早く判断してださい。
      </p>
      <ValueInput
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        displayItemID={{ id: "" }}
        setRatings={() => {}}
      />
      <p style={{ fontSize: "24px" }}>
        なお、商品説明文の内容は一定ですが、メッセージのフォントの形状は実験を進めるごとに変化していきます。
      </p>
      <p>
        回答を選択すると、画面下の「回答を送信して次に進む」ボタンを押せるようになります。ボタンを押して、次の質問に進んでください。設問は全部で8問あります。
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
