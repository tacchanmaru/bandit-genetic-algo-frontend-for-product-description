import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { ref, push } from "firebase/database";
import { firebaseDb } from "../firebase";

type Props = {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  userID: string;
  // setDisabledNext: (disabledNext: boolean) => void;
  withLabel: boolean;
  randomID: number;
  productID: number;
  selectedItem: number;
  ratings: { [key: number]: number };
  setIsTarget: React.Dispatch<React.SetStateAction<boolean>>;
};

const Questionnaire: React.FC<Props> = (props) => {
  const [gender, setGender] = React.useState("");
  const [age, setAge] = React.useState<number>();
  const [work, setWork] = React.useState("");
  const inputRef = useRef<HTMLInputElement>();
  const [inputError, setInputError] = useState(false);

  const handleChangeGender = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const handleChangeWork = (event: SelectChangeEvent) => {
    setWork(event.target.value as string);
  };

  const [education, setEducation] = React.useState("");
  const handleChangeEducation = (event: SelectChangeEvent) => {
    setEducation(event.target.value as string);
  };

  const [useApp, setUseApp] = React.useState("");
  const handleChangeUseApp = (event: SelectChangeEvent) => {
    setUseApp(event.target.value as string);
  };

  const [useAppPeriod, setUseAppPeriod] = React.useState("");
  const handleChangeUseAppPeriod = (event: SelectChangeEvent) => {
    setUseAppPeriod(event.target.value as string);
  };

  const [useAIPeriod, setUseAIPeriod] = React.useState("");
  const handleChangeUseAIPeriod = (event: SelectChangeEvent) => {
    setUseAIPeriod(event.target.value as string);
  };

  const handleChangeAge = (e) => {
    if (inputRef.current) {
      const ref = inputRef.current;
      if (!ref.validity.valid) {
        setInputError(true);
      } else {
        setInputError(false);
        setAge(e.target.value);
      }
    }
  };

  function setUserIDAndSend() {
    push(ref(firebaseDb, "users"), {
      userID: props.userID,
      age: age,
      gender: gender,
      work: work,
      education: education,
      useApp: useApp,
      useAppPeriod: useAppPeriod,
      useAIPeriod: useAIPeriod,
      withLabel: props.withLabel,
      randomID: props.randomID,
      productID: props.productID,
      timestamp: Date.now(),
    });
    props.setPageNumber(props.pageNumber + 1);
    // props.setDisabledNext(false);
  }
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
      <h1>以下のアンケートにご協力ください</h1>
      <TextField
        id="outlined-basic"
        label="年齢"
        variant="outlined"
        inputProps={{ maxLength: 2, pattern: "^[0-9]+" }}
        onChange={(e) => handleChangeAge(e)}
        error={inputError}
        inputRef={inputRef}
        helperText="半角数字で入力してください"
        fullWidth
        style={{ margin: "1em 0px" }}
      ></TextField>
      <FormControl fullWidth style={{ margin: "1em 0px" }}>
        <InputLabel id="gender">性別</InputLabel>
        <Select
          labelId="gender"
          id="demo-simple-select"
          value={gender}
          label="性別"
          onChange={handleChangeGender}
        >
          <MenuItem value={"man"}>男性</MenuItem>
          <MenuItem value={"woman"}>女性</MenuItem>
          <MenuItem value={"others"}>どちらでもない / 回答しない</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ margin: "1em 0px" }}>
        <InputLabel id="demo-simple-select-label">職業</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={work}
          label="職業"
          onChange={handleChangeWork}
        >
          <MenuItem value={"会社員・団体職員"}>会社員・団体職員</MenuItem>
          <MenuItem value={"会社役員・団体役員"}>会社役員・団体役員</MenuItem>
          <MenuItem value={"公務員"}>公務員</MenuItem>
          <MenuItem value={"医師"}>医師</MenuItem>
          <MenuItem value={"弁護士・税理士・その他士業"}>
            弁護士・税理士・その他士業
          </MenuItem>
          <MenuItem value={"教職員"}>教職員</MenuItem>
          <MenuItem value={"個人事業主・自営業"}>個人事業主・自営業</MenuItem>
          <MenuItem value={"契約・派遣社員"}>契約・派遣社員</MenuItem>
          <MenuItem value={"パート・アルバイト"}>パート・アルバイト</MenuItem>
          <MenuItem value={"専業主婦・主夫"}>専業主婦・主夫</MenuItem>
          <MenuItem value={"年金受給者"}>年金受給者</MenuItem>
          <MenuItem value={"学生"}>学生</MenuItem>
          <MenuItem value={"無職"}>無職</MenuItem>
          <MenuItem value={"その他"}>その他</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ margin: "1em 0px" }}>
        <InputLabel id="demo-simple-select-label">最終学歴</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={education}
          label="最終学歴"
          onChange={handleChangeEducation}
        >
          <MenuItem value={"高卒"}>高卒（在学中も含む）</MenuItem>
          <MenuItem value={"専門学校卒"}>専門学校卒（在学中も含む）</MenuItem>
          <MenuItem value={"短大卒"}>短大卒（在学中も含む）</MenuItem>
          <MenuItem value={"大学卒"}>大学卒（在学中も含む）</MenuItem>
          <MenuItem value={"大学院卒"}>大学院卒（在学中も含む）</MenuItem>
          <MenuItem value={"その他"}>その他</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ margin: "1em 0px" }}>
        <InputLabel id="demo-simple-select-label">
          フリマアプリの利用有無
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={useApp}
          label="フリマアプリの利用有無"
          onChange={handleChangeUseApp}
        >
          <MenuItem value={"検索するだけ"}>検索するだけ</MenuItem>
          <MenuItem value={"買うだけ"}>買うだけ</MenuItem>
          <MenuItem value={"売るだけ"}>売るだけ</MenuItem>
          <MenuItem value={"両方"}>両方</MenuItem>
          <MenuItem value={"なし"}>なし</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ margin: "1em 0px" }}>
        <InputLabel id="demo-simple-select-label">
          フリマアプリの利用期間
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={useAppPeriod}
          label="フリマアプリの利用期間"
          onChange={handleChangeUseAppPeriod}
        >
          <MenuItem value={"none"}>なし</MenuItem>
          <MenuItem value={"1ヶ月未満"}>1ヶ月未満</MenuItem>
          <MenuItem value={"3ヶ月未満"}>3ヶ月未満</MenuItem>
          <MenuItem value={"半年未満"}>半年未満</MenuItem>
          <MenuItem value={"1年未満"}>1年未満</MenuItem>
          <MenuItem value={"3年未満"}>3年未満</MenuItem>
          <MenuItem value={"3年以上"}>3年以上</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ margin: "1em 0px" }}>
        <InputLabel id="demo-simple-select-label">
          文章を生成するAI（ChatGPTやGeminiなど）の利用頻度
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={useAIPeriod}
          label="文章を生成するAI（ChatGPTやGeminiなど）の利用頻度"
          onChange={handleChangeUseAIPeriod}
        >
          <MenuItem value={"ほぼ毎日"}>ほぼ毎日</MenuItem>
          <MenuItem value={"２、３日に１回程度"}>２、３日に１回程度</MenuItem>
          <MenuItem value={"週に１回程度"}>週に１回程度</MenuItem>
          <MenuItem value={"２，３週間に１回程度"}>
            ２，３週間に１回程度
          </MenuItem>
          <MenuItem value={"月に１回程度"}>月に１回程度</MenuItem>
          <MenuItem
            value={"これまで数回使ったことがある程度。普段はあまり使わない。"}
          >
            これまで数回使ったことがある程度。普段はあまり使わない。
          </MenuItem>
          <MenuItem value={"使ったことがない。"}>使ったことがない。</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        className=""
        onClick={() => {
          if (
            useAppPeriod != "none" &&
            useApp != "なし" &&
            age != undefined &&
            age >= 18
          ) {
            setUserIDAndSend();
            props.setPageNumber(props.pageNumber + 1);
          } else {
            setUserIDAndSend();
            props.setIsTarget(false);
          }
        }}
        disabled={
          useAppPeriod != "" &&
          useApp != "" &&
          age != undefined &&
          work != "" &&
          gender != "" &&
          education != "" &&
          useAIPeriod != ""
            ? false
            : true
        }
        style={{
          margin: "8px",
        }}
      >
        次に進む
      </Button>
      {/* <div style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          className="button"
          style={{
            margin: "16px 0px",
            backgroundColor: "#ff333f",
            color: "white",
          }}
          onClick={() => {
            setUserIDAndSend();
          }}
          disabled={age != "" && work != "" && gender != "" ? false : true}
        >
          結果を送信する
        </Button>
      </div> */}
    </div>
  );
};

export default Questionnaire;
