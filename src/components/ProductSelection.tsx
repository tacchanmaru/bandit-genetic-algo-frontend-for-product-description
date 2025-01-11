import React, { useState, useEffect } from "react";
import { ToggleButton, Tooltip } from "@mui/material";
import PhoneApp from "./PhoneApp";
import { DisplayItemID } from "../App";
import { firebaseDb } from "../firebase";
import { push, ref } from "firebase/database";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

type Props = {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  displayItemIDLists: DisplayItemID[];
  userID: string;
};

const ProductSelection: React.FC<Props> = (props) => {
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
  const [selectedItem, setSelectedItem] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  // React.useEffect(() => {
  //   if (props.selectedItem !== 0) {
  //     props.setDisabledNext(false);
  //   }
  // }, [props, props.selectedItem]);

  function sendDataAndNext() {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      props.setPageNumber(props.pageNumber + 1);
    }, 1500);
    push(ref(firebaseDb, "results/selection"), {
      userID: props.userID,
      value: selectedItem,
      timestamp: Date.now(),
      pair: props.displayItemIDLists.map((item) => item.id),
    });
  }

  return (
    <div>
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
        {props.displayItemIDLists.map((item) => (
          <div>
            <PhoneApp taskID={item.id} />
            <div style={{ height: "200px" }} />
            <ToggleButton
              style={{
                width: "430px",
                margin: "0px 36px",
                textAlign: "center",
                backgroundColor: selectedItem === item.id ? "#ff333f" : "white",
                color: selectedItem === item.id ? "white" : "#ff333f",
                padding: "11px 15px",
                fontSize: "15px",
                fontWeight: "900",
                position: "fixed",
                bottom: "100px",
                zIndex: 20,
              }}
              value="check"
              selected={selectedItem === item.id}
              onChange={() => setSelectedItem(item.id)}
            >
              {selectedItem === item.id ? "選択済み" : "こちらの商品を選ぶ"}
            </ToggleButton>
            {/* <Button
            style={{
              width: "430px",
              margin: "0px 36px",
              textAlign: "center",
              backgroundColor: "#ff333f",
              color: "white",
              padding: "11px 15px",
              fontSize: "15px",
              fontWeight: "900",
            }}
            onClick={() => {
              props.setPageNumber(props.pageNumber + 1);
              setSelectedItem(item.id);
            }}
          >
            こちらの商品を購入したい
          </Button> */}
          </div>
        ))}
      </div>
      <div
        style={{
          height: "180px",
          backgroundColor: "white",
          position: "fixed",
          bottom: "0",
          zIndex: 10,
          width: "100%",
        }}
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
              : selectedItem == ""
              ? "回答を選択してください。"
              : ""
          }
        >
          <Button
            variant="contained"
            color="primary"
            className=""
            onClick={() => {
              if (hasReachedBottom && selectedItem !== "") {
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
              width: "932px",
              zIndex: 20,
              backgroundColor:
                selectedItem == "" || !hasReachedBottom ? "#ccc" : "",
              cursor:
                selectedItem == "" || !hasReachedBottom
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            回答を送信して次に進む
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
export default ProductSelection;
