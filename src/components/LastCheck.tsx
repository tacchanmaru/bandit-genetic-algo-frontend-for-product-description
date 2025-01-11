import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { firebaseDb } from "../firebase";
import { push, ref } from "firebase/database";
import { shuffleArray } from "../utils";

import Radio from "@mui/material/Radio";

type Props = {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  userID: string;
};

const Check: React.FC<Props> = (props) => {
  const [productIDAnswer, setProductIDAnswer] = React.useState(0);
  const [displayProductIDLists, setDisplayProductIDLists] = useState([]);

  useEffect(() => {
    setDisplayProductIDLists(
      shuffleArray(["photo/15/1.jpg", "photo/8/2.jpg", "itemPhoto.jpg"])
    );
  }, []);

  function sendDataAndNext() {
    push(ref(firebaseDb, "results/concentration"), {
      userID: props.userID,
      productIDAnswer: productIDAnswer,
      timestamp: Date.now(),
    });
  }

  const handleRatingChange = (id: number) => {
    setProductIDAnswer(id);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h1>実験後のアンケート</h1>
      <h3>問1: 実験の中で購入した商品はどれですか。</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {displayProductIDLists.map((item, i) => (
          <div
            style={{ textAlign: "center", display: "flex", flexFlow: "column" }}
          >
            <img
              src={item}
              style={{
                width: "300px",
                height: "auto",
                maxHeight: "300px",
                margin: "auto",
                objectFit: "contain",
              }}
              alt="preview"
            />
            <div style={{ margin: "16px" }}>
              <Radio
                checked={productIDAnswer === item}
                // onChange={handleRadioChange}
                onChange={() => {
                  handleRatingChange(item);
                }}
                value={item}
                id={String(i)}
                name="radio-buttons"
                inputProps={{ "aria-label": String(item) }}
                style={{ padding: "0px", margin: "auto" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <Button
            variant="contained"
            color="primary"
            className=""
            onClick={() => {
              sendDataAndNext();
              props.setPageNumber(props.pageNumber + 1);
            }}
            style={{
              margin: "16px auto",
              // backgroundColor: "#ff333f",
              color: "white",
              padding: "11px 15px",
              fontSize: "15px",
              fontWeight: "900",
              width: "932px",
            }}
            disabled={productIDAnswer == 0 ? true : false}
          >
            回答を送信して次に進む
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Check;
