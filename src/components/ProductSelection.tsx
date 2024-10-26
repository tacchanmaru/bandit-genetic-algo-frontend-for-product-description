import * as React from "react";
import { ToggleButton } from "@mui/material";
import PhoneApp from "./PhoneApp";
import { DisplayItemID } from "../App";

type Props = {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  productID: number;
  displayItemIDLists: DisplayItemID[];
  setDisplayItemIDLists: (displayItemIDLists: DisplayItemID[]) => void;
  setDisabledNext: (disabledNext: boolean) => void;
  withBadge: boolean;
  selectedItem: number;
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  taskID: number;
};

const ProductSelection: React.FC<Props> = (props) => {
  React.useEffect(() => {
    if (props.selectedItem !== 0) {
      props.setDisabledNext(false);
    }
  }, [props, props.selectedItem]);

  return (
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
            withBadge={props.withBadge}
            taskID={item.id}
          />
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
            }}
            value="check"
            selected={props.selectedItem === item.id}
            onChange={() => props.setSelectedItem(item.id)}
          >
            {props.selectedItem === item.id ? "選択済み" : "選択する"}
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
  );
};
export default ProductSelection;
