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
        あなたはフリマアプリを見ています。
        <br />
        このアプリでは、出品者が自分で商品説明の文章を書くだけでなく、AIを活用して書くこともできます。
        <br />
        次の質問に答えてください
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
