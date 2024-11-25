import React from "react";

import Button from "@mui/material/Button";

type Props = {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  withLabel: boolean;
};

const Explanation2: React.FC<Props> = (props) => {
  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h1>アプリの説明【重要!】</h1>
      <p style={{ fontSize: "24px" }}>
        このアプリでは、
        <b>
          出品者が自分で商品説明の文章を書くだけでなく、AIを活用して書くこともできる
        </b>
        ようになっています。
      </p>

      {props.withLabel && (
        <>
          <p style={{ fontSize: "24px" }}>
            このアプリでは、
            <b>
              だれが商品説明の文章を書いたかが、以下の図のように、文章の最後に表示されます。
            </b>
          </p>
          <img src="label_example.png" alt="label_example" />
        </>
      )}

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

export default Explanation2;
