import React from "react";
import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Tooltip } from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

type Props = {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
};

const InitCheck: React.FC<Props> = (props) => {
  const [answer1, setAnswer1] = React.useState("");
  const [answer2, setAnswer2] = React.useState("");

  const handleChange1 = (e) => {
    setAnswer1(e.target.value);
  };
  const handleChange2 = (e) => {
    setAnswer2(e.target.value);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h1>実験内容の確認</h1>
      <p>
        以下の設問は、実験内容を正しく理解しているかを確認するためのものです。
        <br />
        全ての設問に正しい解答を選択した場合のみ、実験に進むことができます。
      </p>
      <h3>
        Q:
        この実験では、あなたはどのような状況を想定して回答することになりますか？
      </h3>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={handleChange1}
        >
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="フリマアプリで商品を購入したいと思っている"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="フリマアプリで商品を出品したいと思っている"
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label="フリマアプリでアカウントを作成したいと思っている"
          />
        </RadioGroup>
      </FormControl>
      <h3>
        Q: このタスクでは、どのように回答することが求められているでしょうか。
      </h3>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={handleChange2}
        >
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="相手の気持ちを考えて回答する"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="相手の気持ちを考えずに回答する"
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label="直感に従って回答する"
          />
        </RadioGroup>
      </FormControl>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={() => props.setPageNumber(props.pageNumber - 1)}
        >
          説明に戻る
        </Button>

        <Tooltip
          title={
            answer1 == "1" && answer2 == "3"
              ? ""
              : "全ての設問に正しい解答を選択すると、本番に進むことができます。"
          }
        >
          <span>
            <Button
              variant="contained"
              color="primary"
              className=""
              onClick={() => props.setPageNumber(props.pageNumber + 1)}
              disabled={answer1 == "1" && answer2 == "3" ? false : true}
            >
              実験に進む
            </Button>
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default InitCheck;
