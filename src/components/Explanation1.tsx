import React from "react";

import Button from "@mui/material/Button";

type Props = {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
};

const Explanation1: React.FC<Props> = (props) => {
  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h1>実験について</h1>
      <p style={{ fontSize: "24px" }}>
        この実験は、パートA（28問）とパートB（8問）の2つのパートから構成されています。
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
