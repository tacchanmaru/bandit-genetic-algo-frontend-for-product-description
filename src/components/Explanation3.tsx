import React from "react";

import Button from "@mui/material/Button";

type Props = {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
};

const Explanation3: React.FC<Props> = (props) => {
  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <p style={{ fontSize: "24px" }}>
        以上でパートAの28問は終了です。次はパートBに回答していただきます。
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

export default Explanation3;
