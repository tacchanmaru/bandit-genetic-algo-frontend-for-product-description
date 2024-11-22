import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { products } from "../data/Products";
import { firebaseDb } from "../firebase";
import { push, ref } from "firebase/database";
import { shuffleArray } from "../utils";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

type Props = {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  productID: number;
  userID: string;
  withLabel: boolean;
};

const Check: React.FC<Props> = (props) => {
  const [withLabelAnswer, setWithLabelAnswer] = React.useState("");

  const [productIDAnswer, setProductIDAnswer] = React.useState(0);
  const [displayProductIDLists, setDisplayProductIDLists] = useState([
    { id: 30 },
    { id: 15 },
  ]);

  useEffect(() => {
    setDisplayProductIDLists(
      shuffleArray([{ id: props.productID }, ...displayProductIDLists])
    );
  }, [props.productID]);

  const handlePurposeChange = (e) => {
    setWithLabelAnswer(e.target.value);
  };

  function sendDataAndNext() {
    push(ref(firebaseDb, "results/concentration"), {
      userID: props.userID,
      productID: props.productID,
      productIDAnswer: productIDAnswer,
      withLabelAnswer: withLabelAnswer,
      withLabel: props.withLabel,
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
              src={products.find((p) => p.id === item.id)?.imageUrl || ""}
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
                checked={productIDAnswer === item.id}
                // onChange={handleRadioChange}
                onChange={() => {
                  handleRatingChange(item.id);
                }}
                value={item.id}
                id={String(i)}
                name="radio-buttons"
                inputProps={{ "aria-label": String(item.id) }}
                style={{ padding: "0px", margin: "auto" }}
              />
            </div>
          </div>
        ))}
      </div>
      <h3>
        問2:
        商品説明文の最後に、だれが文章を書いたかを示した情報がありましたか。
      </h3>
      <div style={{ textAlign: "center", display: "flex", flexFlow: "column" }}>
        <img src="label_example.png" alt="label_example" width="300px" />

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={handlePurposeChange}
          >
            <FormControlLabel
              value="Yes"
              control={<Radio />}
              label="はい、ありました"
            />
            <FormControlLabel
              value="No"
              control={<Radio />}
              label="いいえ、ありませんでした"
            />
            <FormControlLabel
              value="I don't know"
              control={<Radio />}
              label="忘れました"
            />
          </RadioGroup>
        </FormControl>
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
            disabled={
              withLabelAnswer == "" || productIDAnswer == 0 ? true : false
            }
          >
            回答を送信して次に進む
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Check;
