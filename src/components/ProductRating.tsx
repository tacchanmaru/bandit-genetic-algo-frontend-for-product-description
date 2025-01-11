import React, { useEffect, useState } from "react";
import PhoneApp from "./PhoneApp";
import { DisplayItemID } from "../App";
import { firebaseDb } from "../firebase";
import { push, ref } from "firebase/database";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ValueInput from "./ValueInput";
import { Tooltip } from "@mui/material";

type Props = {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  ratings: { [key: number]: number };
  setRatings: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
  displayItemID: DisplayItemID;
  userID: string;
};

const ProductRating: React.FC<Props> = (props) => {
  const [selectedValue, setSelectedValue] = useState<number>(0);
  // const [isAtBottom, setIsAtBottom] = useState(false);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 現在のスクロール位置とページの高さを取得
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // ページの一番下にいるかどうかを判定
      // setIsAtBottom(scrollTop + windowHeight >= documentHeight);
      if (scrollTop + windowHeight >= documentHeight) {
        setHasReachedBottom(true); // 一番下まで到達したらフラグを立てる
      }
    };

    // スクロールイベントを監視
    window.addEventListener("scroll", handleScroll);

    // 初期状態を確認
    handleScroll();

    // クリーンアップ
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function sendDataAndNext() {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      props.setPageNumber(props.pageNumber + 1);
    }, 1500);
    push(ref(firebaseDb, "results/rating"), {
      userID: props.userID,
      displayItemID: props.displayItemID.id,
      value: selectedValue,
      timestamp: Date.now(),
    });
  }

  useEffect(() => {
    setSelectedValue(props.ratings[props.displayItemID.id] || 0);
  }, [props.ratings, props.displayItemID.id]);

  // useEffect(() => {
  //   // ratingsのstateが更新されるたびに、console.logでratingsの中身を表示
  //   console.log(props.ratings);
  // }, [props.ratings]);

  // useEffect(() => {
  //   if (selectedValue === 0) {
  //     props.setDisabledNext(false);
  //   }
  // }, [props, props.ratings]);

  // RatingのonChangeイベントのハンドラ
  // const handleRatingChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   id: string
  // ) => {
  //   console.log(event);
  //   setSelectedValue(Number((event.target as HTMLInputElement).value));
  //   props.setRatings((prevRatings: { [key: number]: number }) => ({
  //     ...prevRatings,
  //     [id]: Number((event.target as HTMLInputElement).value),
  //   }));
  // };

  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            回答を登録しました。
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* {props.displayItemIDLists.map((item) => ( */}
        <div>
          <PhoneApp taskID={props.displayItemID.id} />
          <div style={{ height: "200px" }} />
        </div>
      </div>
      <div
        style={{
          height: "180px",
          backgroundColor: "white",
          position: "fixed",
          bottom: "0",
          zIndex: 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            textAlign: "center",
            width: "460px",
            margin: "12px 0px",
            backgroundColor: "white",
            padding: "12px",
          }}
        >
          <ValueInput
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            displayItemID={props.displayItemID}
            setRatings={props.setRatings}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Tooltip
              title={
                !hasReachedBottom
                  ? "一番下までスクロールして、商品説明文を読んでください。"
                  : selectedValue == 0
                  ? "回答を選択してください。"
                  : ""
              }
            >
              <Button
                variant="contained"
                color="primary"
                className=""
                onClick={() => {
                  if (hasReachedBottom && selectedValue !== 0) {
                    sendDataAndNext();
                    window.scrollTo(0, 0);
                  }
                }}
                style={{
                  margin: "auto",
                  padding: "11px 15px",
                  fontSize: "15px",
                  fontWeight: "900",
                  position: "fixed",
                  bottom: "40px",
                  width: "430px",
                  zIndex: 20,
                  backgroundColor:
                    selectedValue === 0 || !hasReachedBottom ? "#ccc" : "",
                  cursor:
                    selectedValue === 0 || !hasReachedBottom
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                回答を送信して次に進む
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
      {/* ))} */}
    </>
  );
};
export default ProductRating;
