import React from "react";

import Button from "@mui/material/Button";

type Props = {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
};

const Explanation1: React.FC<Props> = (props) => {
  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h1>あなたにしていただきたいこと【重要!】</h1>
      <p>
        あなたはフリマアプリで<b>商品を購入したい</b>と思っています。
        <b>商品説明文を読んで、購入したい商品を選んでください。</b>
      </p>

      <div style={{ textAlign: "right" }}>
        <span>
          <Button
            variant="contained"
            color="primary"
            className=""
            onClick={() => props.setPageNumber(props.pageNumber + 1)}
            style={{ margin: "16px 0px" }}
          >
            次に進む
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Explanation1;
