import * as React from "react";
import { Button } from "@mui/material";

type Props = {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
};

const Instraction: React.FC<Props> = (props) => {
  return (
    <div
      className="ChatBox"
      style={{
        margin: "auto",
        display: "flex",
        flexFlow: "column",
        maxWidth: "600px",
      }}
    >
      <p
        style={{
          margin: "8px",
        }}
      >
        同じ商品について、2人の人が出品しています。商品説明文を読み比べて、そこから受ける印象を答えてください。
        <br />
        商品説明文には、AIが書いたものや、AIのサポートを受けて人間が書いたものが含まれる場合もあります。
      </p>
      <Button
        variant="contained"
        color="primary"
        className=""
        onClick={() => {
          props.setPageNumber(props.pageNumber + 1);
        }}
        style={{
          margin: "8px",
        }}
      >
        次に進む
      </Button>
    </div>
  );
};
export default Instraction;
