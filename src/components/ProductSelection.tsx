import * as React from "react";
import { ToggleButton } from "@mui/material";
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
  displayItemIDLists: DisplayItemID[];
  // setDisabledNext: (disabledNext: boolean) => void;
  withLabel: boolean;
  selectedItem: number;
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  taskID: number;
  userID: string;
};

const ProductSelection: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);

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
      productID: props.productID,
      value: props.selectedItem,
      withLabel: props.withLabel,
      timestamp: Date.now(),
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
            <PhoneApp
              productID={props.productID}
              withLabel={props.withLabel}
              taskID={item.id}
            />
            <div style={{ height: "200px" }} />
            <ToggleButton
              style={{
                width: "430px",
                margin: "0px 36px",
                textAlign: "center",
                backgroundColor:
                  props.selectedItem === item.id ? "#ff333f" : "white",
                color: props.selectedItem === item.id ? "white" : "#ff333f",
                padding: "11px 15px",
                fontSize: "15px",
                fontWeight: "900",
                position: "fixed",
                bottom: "100px",
                zIndex: 20,
              }}
              value="check"
              selected={props.selectedItem === item.id}
              onChange={() => props.setSelectedItem(item.id)}
            >
              {props.selectedItem === item.id
                ? "選択済み"
                : "こちらの商品を選ぶ"}
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
            width: "932px",
            zIndex: 20,
          }}
          disabled={props.selectedItem === 0}
        >
          回答を送信して次に進む
        </Button>
      </div>
    </div>
  );
};
export default ProductSelection;
