import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
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
  productID: number;
  // displayItemIDLists: DisplayItemID[];
  // setDisplayItemIDLists: (displayItemIDLists: DisplayItemID[]) => void;
  // setDisabledNext: (disabledNext: boolean) => void;
  withLabel: boolean;
  ratings: { [key: number]: number };
  setRatings: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
  displayItemID: DisplayItemID;
  userID: string;
};

const ProductRating: React.FC<Props> = (props) => {
  const valueList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedValue, setSelectedValue] = useState<number>(0);
  // const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValue((event.target as HTMLInputElement).value);
  //   // if (props.setSelectedValue) {
  //   //   props.setSelectedValue((event.target as HTMLInputElement).value);
  //   // }
  // };
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
      productID: props.productID,
      displayItemID: props.displayItemID.id,
      value: selectedValue,
      withLabel: props.withLabel,
      timestamp: Date.now(),
    });
  }

  useEffect(() => {
    setSelectedValue(props.ratings[props.displayItemID.id] || 0);
  }, [props.ratings, props.displayItemID.id]);

  useEffect(() => {
    // ratingsのstateが更新されるたびに、console.logでratingsの中身を表示
    console.log(props.ratings);
  }, [props.ratings]);

  // useEffect(() => {
  //   if (selectedValue === 0) {
  //     props.setDisabledNext(false);
  //   }
  // }, [props, props.ratings]);

  // RatingのonChangeイベントのハンドラ
  const handleRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    console.log(event);
    setSelectedValue(Number((event.target as HTMLInputElement).value));
    props.setRatings((prevRatings: { [key: number]: number }) => ({
      ...prevRatings,
      [id]: Number((event.target as HTMLInputElement).value),
    }));
  };

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
          <PhoneApp
            productID={props.productID}
            withLabel={props.withLabel}
            taskID={props.displayItemID.id}
          />
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              alignItems: "center",
              zIndex: 20,
            }}
          >
            <p style={{ margin: "0", textAlign: "center" }}>
              全く
              <br />
              正直でない
            </p>
            {valueList.map((m, i) => (
              <Radio
                checked={selectedValue === m}
                // onChange={handleRadioChange}
                onChange={(event) => {
                  handleRatingChange(event, props.displayItemID.id);
                }}
                value={m}
                id={String(i)}
                name="radio-buttons"
                inputProps={{ "aria-label": String(m) }}
                style={{ padding: "0px" }}
              />
            ))}
            {/* <Rating
                  name="customized-10"
                  defaultValue={0}
                  max={10}
                  onChange={(event, value) => {
                    if (value === null) return;
                    handleRatingChange(event, value, item.id);
                  }}
                /> */}
            <p style={{ margin: "0px 8px", textAlign: "center" }}>
              とても
              <br />
              正直である
            </p>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              className=""
              onClick={() => {
                sendDataAndNext();
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
              }}
              disabled={selectedValue === 0}
            >
              回答を送信して次に進む
            </Button>
          </div>
        </div>
      </div>
      {/* ))} */}
    </>
  );
};
export default ProductRating;
